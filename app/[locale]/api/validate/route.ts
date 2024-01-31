import { getJwtSecretKey } from "@/lib/auth";
import { jwtVerify } from "jose";

export async function POST(request: Request) {
  const body = await request.json();

  const token = body.token;

  const { payload } = await jwtVerify(token, getJwtSecretKey());

  const data = {
    id: payload.id,
    phone: payload.phone,
  };

  return Response.json(data);
}
