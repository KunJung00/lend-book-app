import pool from "@/app/database/mysql";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username or Email is Empty" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const connection = await pool.getConnection();

    const queryUser = "SELECT * FROM Users WHERE username = ?";

    const [rowUsers] = await connection.execute(queryUser, [username]);
    const users = rowUsers as any[];

    if (users && users.length > 0) {
      return NextResponse.json({
        message: "Username is already",
      });
    }
     const query = "INSERT INTO Users (username, password) VALUES (?, ?)";
     const [result] = await connection.execute(query, [
       username,
       hashedPassword,
     ]);

     connection.release();

     return NextResponse.json({
       message: "success",
       result,
     });
  } catch (error) {
    return NextResponse.json(
      {
        error: error || "Database error",
      },
      { status: 500 }
    );
  }
}
