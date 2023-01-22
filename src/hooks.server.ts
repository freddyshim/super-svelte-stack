import { SvelteKitAuth } from '@auth/sveltekit'
import CredentialsProvider from '@auth/core/providers/credentials'
import GoogleProvider from '@auth/core/providers/google'
import {
  AUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '$env/static/private'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import type { Adapter } from '@auth/core/adapters'
import { compare } from 'bcryptjs'

const prisma = new PrismaClient()

export const handle = SvelteKitAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    // @ts-ignore https://github.com/nextauthjs/next-auth/issues/6174
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Email',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null
        }
        try {
          const user = await prisma.user.findUniqueOrThrow({
            where: { email: credentials.email },
          })

          // user has not signed up with credentials
          if (!user.password) throw new Error('Invalid credentials')

          // check password
          const valid = await compare(credentials.password, user.password)

          // success
          if (valid) {
            return { ...user, password: null }
          }
        } catch (err) {
          throw new Error('Invalid credentials')
        }

        return null
      },
    }),
    // @ts-ignore https://github.com/nextauthjs/next-auth/issues/6174
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      const email = session.user?.email as string
      const user = await prisma.user.findUnique({
        select: { emailVerified: true },
        where: { email },
      })
      return { ...session, user: { verified: !!user?.emailVerified } }
    },
  },
  events: {
    //linkAccount: async ({ user }) => {
    // Verify email used with OAuth providers
    // Make sure you use ONLY trusted OAuth providers
    //try {
    //  const linkedUser = await prisma.user.findUniqueOrThrow({
    //    select: {
    //      emailVerified: true,
    //    },
    //    where: {
    //      id: user.id,
    //    },
    //  })
    //  if (!linkedUser.emailVerified) {
    //    await prisma.user.update({
    //      data: {
    //        emailVerified: new Date(),
    //      },
    //      where: {
    //        id: user.id,
    //      },
    //    })
    //  }
    //} catch (err: unknown) {
    //  // if this code is reached then something went horribly wrong
    //  // a) user's id should ALWAYS be unique
    //  // b) user should ALWAYS exist if 'linkAccount' event is triggered
    //  let msg = ''
    //  if (typeof err === 'string') {
    //    msg = err
    //  } else if (err instanceof Error) {
    //    msg = err.message
    //  }
    //  throw new Error(`Error linking account to user: ${msg}`)
    //}
    //},
  },
})
