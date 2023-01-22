import { TokenType } from '@prisma/client'
import type { PageServerLoad } from './$types'
import db from '$lib/server/prisma'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, locals }) => {
  const session = await locals.getSession()

  const token = await db.token.findUnique({
    where: { id: params.token },
  })

  const currentDate = new Date()
  if (
    !token ||
    !token.valid ||
    token.type !== TokenType.RESET ||
    currentDate > token.expiresAt
  ) {
    throw error(404, 'Invalid verification token.')
  }

  return {
    session,
    token: token.id,
  }
}
