import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt'
import { getToken } from 'next-auth/jwt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const token = await getToken({ req })
    if (!token) {
        return new NextResponse("Unauthorized", { status: 401 })
    }
    console.log(token)

    
    
}