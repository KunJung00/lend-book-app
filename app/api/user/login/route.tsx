export const runtime = "edge";
import pool from "@/app/database/mysql";
import bcrypt from "bcryptjs";
import { FieldPacket, RowDataPacket } from "mysql2/promise";
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
    const connection = await pool.getConnection();

    const query = "SELECT * FROM Users WHERE username = ?";
    const [result]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
      query,
      [username]
    );
    connection.release();
    if (!result) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const isMatch = await bcrypt.compare(password, result[0].password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    return NextResponse.json({
      message: "Login successful",
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
