import prisma from "@/prisma/prisma";

export async function GET() {
  const users = await prisma.user.findMany({});

  return Response.json(users);
}
