import { getJwtSecretKey } from "@/lib/auth";
import { jwtVerify } from "jose";
import prisma from "@/prisma/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  
  const token = body.token;

  const { payload } = await jwtVerify(token, getJwtSecretKey());
  
  if (!payload.id) {
    return Response.json({id: null, phone: null});
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: payload.id
      }
    });
    
    if (!user) { 
      return Response.json({id: null, phone: null});
    }
    return Response.json({id: payload.id, phone: payload.phone});
  } catch (error) {
    return Response.json({message: error}, {status: 500});
  }
  
}