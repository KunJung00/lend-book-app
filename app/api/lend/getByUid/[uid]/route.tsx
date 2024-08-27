// import the Request and Response classes

import pool from "@/app/database/mysql";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { uid: string } }
) {
  try {
    const connection = await pool.getConnection();
    const query =
      "SELECT * FROM Borrowbook,Books WHERE Borrowbook.bid = Books.bid AND uid = ?";
    const [rows] = await connection.execute(query, [params.uid]);

    connection.release();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
