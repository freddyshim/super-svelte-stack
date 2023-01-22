import type { RequestHandler } from './$types'
import { error } from '@sveltejs/kit'
import { Prisma, TokenType } from '@prisma/client'
import mailer, { getVerifyContent } from '$lib/server/mail'
import { SMTP_EMAIL } from '$env/static/private'
import { addMinutes } from 'date-fns'
import db from '$lib/server/prisma'
import { TOKEN_EXPIRES_IN } from '$lib/constants'

export const POST: RequestHandler = async (event) => {
  // validate session
  const session = await event.locals.getSession()
  if (!session) {
    throw error(401, 'Unauthorized')
  }

  if (!session.user?.email) {
    throw error(403, 'Invalid session')
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!user) {
    throw error(400, 'Invalid session')
  }

  try {
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
    await mailer.sendMail({
      from: SMTP_EMAIL,
      to: session.user.email,
      subject: 'Verify your Email - Super Svelte Stack',
      html: getVerifyContent(token.id),
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
    throw error(500, 'Unable to send verification mail.')
  }
}
