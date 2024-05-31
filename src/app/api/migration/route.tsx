import { migrate } from "@/src/db/migrate";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

    try {
        await migrate();

        return NextResponse.json({message: "ok"}, {status: 200})
    } catch(error){
        console.log(error)
        return NextResponse.json({message: error}, {status: 400})
    }
}