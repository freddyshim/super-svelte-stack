import { signIn } from '@auth/sveltekit/client'

export const loginWithCredentials = async (
  email: string,
  password: string,
  callbackUrl: string = '/home'
) => {
  await signIn('credentials', {
    email,
    password,
    callbackUrl,
  })
}

export const loginWithGoogle = async () => {
  await signIn('google', { callbackUrl: '/home' })
}
