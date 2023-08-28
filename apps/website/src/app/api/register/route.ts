import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { username: displayName, email, password } = body

  if (!displayName || !email || !password) {
    return new NextResponse("Email and password are required", { status: 400 })
  }

  const user = await (prisma as any).user.findUnique({
    where: {
      email: email
    }
  })

  const username = (displayName as string).toLowerCase().split(" ").join("-")
  const usernameTaken = await (prisma as any).user.findUnique({
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

  const createdUser = await (prisma as any).user.create({
    data: {
      displayName: displayName,
      username: username,
      email,
      password: hashedPassword
    }
  })

  return new NextResponse(JSON.stringify(createdUser))
}
