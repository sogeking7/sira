import { getJwtSecretKey } from "@/lib/auth";
import { jwtVerify } from "jose";

export async function POST(request: Request) {
  const body = await request.json();

  const token = body.token;

  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    const data = {
      id: payload.id,
      phone: payload.phone,
    };

    return Response.json(data);
  
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Invalid token" },
      {
        status: 401,
      },
    );
  }
}
