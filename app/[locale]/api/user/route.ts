import prisma from "@/prisma/prisma";

export async function GET(request: Request) {
  const users = await prisma.user.findMany();

  return Response.json({ users });
}

export async function POST(request: Request) {
  const body = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      phone: body.phone,
    },
  });

  if (user) {
    return Response.json({ user: user });
  }

  const newUser = await prisma.user.create({
    data: {
      phone: body.phone,
    },
  });

  return Response.json({ user: newUser });
}
