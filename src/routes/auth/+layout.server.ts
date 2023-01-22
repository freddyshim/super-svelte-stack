import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.getSession()

  if (!!event.url.pathname.match(/^\/auth\/verify.*$/) || !session) {
    return { session }
  }

  throw redirect(303, '/home')
}
