import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { username, email, password } = body

  if (!username || !email || !password) {
    return new NextResponse("Email and password are required", { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  const usernameTaken = await prisma.user.findUnique({
    where: {
      username: username
    }
  })

  if (user) {
    return new NextResponse("Email already exists", { status: 400 })
  }

  if (usernameTaken) {
    return new NextResponse("Username is already taken", { status: 400 })
  }

  const hashedPassword = await hash(password, 10)
  console.log({ email, password })

  const createdUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  })

  return new NextResponse(JSON.stringify(createdUser))
}
