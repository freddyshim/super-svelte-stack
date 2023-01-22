import type { RequestHandler } from './$types'
import { json, error } from '@sveltejs/kit'
import { hash } from 'bcryptjs'
import { PrismaClient, Prisma, TokenType } from '@prisma/client'
import mailer, { getVerifyContent } from '$lib/server/mail'
import { SMTP_EMAIL } from '$env/static/private'
import { addMinutes } from 'date-fns'
import db from '$lib/server/prisma'
import { SALT_ROUNDS, TOKEN_EXPIRES_IN } from '$lib/constants'

interface RequestBody {
  name: string
  email: string
  password: string
}

function isRequestBody(obj: any): obj is RequestBody {
  return (
    obj &&
    obj.name &&
    typeof obj.name === 'string' &&
    obj.email &&
    typeof obj.email === 'string' &&
    obj.password &&
    typeof obj.password === 'string'
  )
}

export const POST: RequestHandler = async (event) => {
  // validate inputs
  const body = await event.request.json()
  if (!isRequestBody(body)) {
    throw error(400, 'Missing name, email and/or password.')
  }
  const { name, email, password } = body

  const existingUser = await db.user.findFirst({
    where: { email: body.email },
  })
  if (existingUser) {
    throw error(400, 'A user with this email is already registered.')
  }

  const hashedPassword = await hash(password, SALT_ROUNDS)

  try {
    // create user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    // create verification token
    const token = await db.token.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        type: TokenType.VERIFICATION,
        expiresAt: addMinutes(new Date(), TOKEN_EXPIRES_IN),
      },
    })

    // send email with token to user
    const temp = await mailer.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: 'Verify your Email - Super Svelte Stack',
      html: getVerifyContent(token.id),
    })

    // send user WITHOUT password
    const { password, ...noPwUser } = user
    return json(noPwUser)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e.code, e.message)
    } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
      console.log('unknown error', e.message)
    } else {
      console.log(e)
    }
    throw error(500, 'Unable to create user.')
  }
}
