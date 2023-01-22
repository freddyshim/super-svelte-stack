import SvelteKitAuth, { DefaultSession } from '@auth/sveltekit'
import type { User as PrismaUser } from 'prisma/prisma-client'

declare module '@auth/core/types' {
  interface Session {
    user: {
      verified: boolean
    } & DefaultSession['user']
  }
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Error {}
  // interface Locals {}
  // interface PageData {}
  // interface Platform {}
}

declare global {
  var prisma: PrismaClient
}
