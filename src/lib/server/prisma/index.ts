import { NODE_ENV } from '$env/static/private'
import { PrismaClient } from '@prisma/client'

let db: PrismaClient

if (NODE_ENV === 'production') {
  db = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  db = global.prisma
}

export default db
