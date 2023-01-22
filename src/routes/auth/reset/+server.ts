import type { RequestHandler } from './$types'
import { json, error } from '@sveltejs/kit'
import { Prisma, TokenType } from '@prisma/client'
import mailer, { getResetContent, getVerifyContent } from '$lib/server/mail'
import { SMTP_EMAIL } from '$env/static/private'
import { addMinutes } from 'date-fns'
import db from '$lib/server/prisma'
import { SALT_ROUNDS, TOKEN_EXPIRES_IN } from '$lib/constants'
import { hash } from 'bcryptjs'

////////////////////////////////////////////////////////////////////////////////
// POST
////////////////////////////////////////////////////////////////////////////////
interface PostRequestBody {
  email: string
}

function isPostRequestBody(obj: any): obj is PostRequestBody {
  return obj && obj.email && typeof obj.email === 'string'
}

export const POST: RequestHandler = async (event) => {
  // validate inputs
  const body = await event.request.json()
  if (!isPostRequestBody(body)) {
    throw error(400, 'Missing name, email and/or password.')
  }
  const { email } = body

  const user = await db.user.findFirst({
    where: { email: body.email },
  })

  if (!user) {
    throw error(400, 'This email is not associated with any user.')
  }

  try {
    // create reset token
    const token = await db.token.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        type: TokenType.RESET,
        expiresAt: addMinutes(new Date(), TOKEN_EXPIRES_IN),
      },
    })

    // send email with token to user
    await mailer.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: 'Verify your Email - Super Svelte Stack',
      html: getResetContent(token.id),
    })

    return new Response()
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(e.code, e.message)
    } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
      console.log('unknown error', e.message)
    } else {
      console.log(e)
    }
    throw error(500, 'Unable to reset password at this time. Try again later.')
  }
}

////////////////////////////////////////////////////////////////////////////////
// PATCH
////////////////////////////////////////////////////////////////////////////////
interface PatchRequestBody {
  token: string
  newPassword: string
}

function isPatchRequestBody(obj: any): obj is PatchRequestBody {
  return (
    obj &&
    obj.token &&
    typeof obj.token === 'string' &&
    obj.newPassword &&
    typeof obj.newPassword === 'string'
  )
}

export const PATCH: RequestHandler = async (event) => {
  const body = await event.request.json()
  console.log(body)
  if (!isPatchRequestBody(body)) {
    throw error(400, 'Invalid parameters.')
  }
  const { token, newPassword } = body

  const dbToken = await db.token.findFirst({ where: { id: token } })

  if (
    !dbToken ||
    !dbToken.valid ||
    dbToken.type !== TokenType.RESET ||
    new Date() > dbToken.expiresAt
  ) {
    throw error(404, 'Invalid verification token.')
  }

  try {
    const password = await hash(newPassword, SALT_ROUNDS)
    await db.user.update({ where: { id: dbToken.userId }, data: { password } })
  } catch (e) {
    console.log(e)
    throw error(
      500,
      'Unable to update your password at this time. Try again laster.'
    )
  }

  return new Response()
}
