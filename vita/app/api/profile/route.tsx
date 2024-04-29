import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { user} from "@/db/schema/schema"; 
import { medicalProfile } from "@/db/schema/schema"; 

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json("Unauthorized", {status: 401});
    }

    const detail = await db.select()
      .from(user)
      .where(eq(user.idUser, session.user?.id)) 
      .limit(1)

    const res = detail.length > 0 ? detail[0] : null
  
    return NextResponse.json(res, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error retrieving userDetail", {status: 400})
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json("Unauthorized", {status: 401});
    }
    
    const {  name, email, phoneNumber, emergencyName,
      emergencyPhone, policyUser, insuranceCompany, bloodType } = await request.json();

      if (!name || !email || !phoneNumber || !emergencyName || !emergencyPhone ||  !policyUser || !insuranceCompany || !bloodType ) {
        return NextResponse.json("name, email, phoneNumber, emergencyName, emergencyPhone, policyUser, insuranceCompany and  bloodType are required", { status: 400 });
      }
      
      const res = await db.update(user)
        .set({
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          
        })
        .where(eq(user.idUser, session.user?.id));

        const res2 = await db.update(medicalProfile)
        .set({
          emergencyName:emergencyName,
          emergencyPhone:emergencyPhone,
          policyUser: policyUser,
          insuranceCompany:insuranceCompany,
          bloodType:bloodType
        })
        .where(eq(medicalProfile.idUser, session.user?.id));

 
        return NextResponse.json("Profile was edited successfully", { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json("Error retrieving medicalProfile", {status: 400})
  }
}