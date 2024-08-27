// import the Request and Response classes
export const runtime = "edge";
import pool from '@/app/database/mysql';
import { NextResponse } from "next/server";

// define and export the GET handler function

export async function GET() {
 try{
  const connection = await pool.getConnection();
  const [rows] = await connection.execute("SELECT * FROM Users");
  connection.release();
  return NextResponse.json(rows)
 }
 catch (error){
  return NextResponse.json({
    error: error
  },{status:500});
 }
}
