import { signIn } from '@auth/sveltekit/client'

export const loginWithCredentials = async (email: string, password: string) => {
  await signIn('credentials', {
    email,
    password,
    callbackUrl: '/auth/login',
  })
}

export const loginWithGoogle = async () => {
  await signIn('google', { callbackUrl: '/home' })
}
