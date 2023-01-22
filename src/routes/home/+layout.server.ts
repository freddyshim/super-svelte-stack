import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.getSession()
  if (!session) throw redirect(303, '/auth/login')

  if (!session.user.verified) {
    throw redirect(303, '/auth/verify')
  }

  return {
    session,
  }
}
