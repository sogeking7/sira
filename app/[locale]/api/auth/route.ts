import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/lib/auth";
import prisma from "@/prisma/prisma";

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

  const Access_Token = await new SignJWT({
    id: user.id,
    phone: user.phone,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecretKey());

  return Response.json({ Access_Token });
}
