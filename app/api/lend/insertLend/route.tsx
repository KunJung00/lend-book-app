
import pool from "@/app/database/mysql";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { uid, bid } = body;
    console.log(uid +"  "+bid);
    

    if (!uid || !bid) {
      return NextResponse.json(
        { message: "data Empty" },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();

    const query = "INSERT INTO Borrowbook(uid, bid) VALUES (?, ?)";
    const [result] = await connection.execute(query, [uid, bid]);

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
