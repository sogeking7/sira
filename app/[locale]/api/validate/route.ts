import { getJwtSecretKey } from "@/lib/auth";
import { jwtVerify } from "jose";

export async function POST(request: Request) {
  const body = await request.json();
  
  const token = body.token;

  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return Response.json({id: payload.id, phone: payload.phone});
  } catch (error) {
    return Response.json({id: null, phone: null});
  }
  
}