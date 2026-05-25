import connectDB from "@/config/db";
import ProjectModel from "@/models/ProjectModel";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await connectDB();
    try{
         const projects = await ProjectModel.find({})
         console.log("Projects retrieved successfully:", projects);
         return NextResponse.json({projects})
    }
    catch(error: unknown){
        //this is to see k error Error object ka hi hai k nhi
        if(error instanceof Error){
              return NextResponse.json({message: error.message})
        }
        else{
            console.log("Unknown error type")
        }  
    }   
}