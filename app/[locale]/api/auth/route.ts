import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/lib/auth";
import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  let user = await prisma.user.findFirst({
    where: {
      phone: body.phone,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        phone: body.phone,
      },
    });
  }

  const token = await new SignJWT({
    id: user.id,
    phone: user.phone,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") 
    .sign(getJwtSecretKey());

  const response = NextResponse.json(
    { Access_Token: token },
    { status: 200, headers: { "content-type": "application/json" } }
  )

  response.cookies.set({
    name: "token",
    value: token,
    path: "/",
  });
  
  return response
}