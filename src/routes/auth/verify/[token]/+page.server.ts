import { TokenType } from '@prisma/client'
import type { PageServerLoad } from './$types'
import db from '$lib/server/prisma'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, locals }) => {
  const token = await db.token.findUnique({
    where: { id: params.token },
  })

  const currentDate = new Date()
  if (
    !token ||
    !token.valid ||
    token.type !== TokenType.VERIFICATION ||
    currentDate > token.expiresAt
  ) {
    throw error(404, 'Invalid verification token.')
  }

  await db.user.update({
    data: {
      emailVerified: currentDate,
      tokens: {
        update: {
          data: { valid: false },
          where: { id: params.token },
        },
      },
    },
    where: { id: token.userId },
  })

  return {
    session: await locals.getSession(),
    token: params.token,
  }
}
