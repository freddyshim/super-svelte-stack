import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.getSession()
  if (!session?.user) throw redirect(303, '/auth/login')

  if (session.user.verified) {
    throw redirect(303, '/home')
  }

  return {
    session,
  }
}
