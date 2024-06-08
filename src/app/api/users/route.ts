import { connectDatabase, getConnection } from "@/app/db/connect";
import { User } from "@/app/entities/User";
import { NextResponse } from "next/server";
import { getRepository } from "typeorm";

export async function GET(){
    try{
        await connectDatabase();
        const connection = getConnection();
        const userRepository = getRepository(User);

        const users = await userRepository.find();
        return NextResponse.json(users);
    }catch(error){
        console.log("Error fetching user: ",error);
        return NextResponse.json(
            {message:error},
            {status:500}
        );
    }
}

export async function POST(
    request: Request
){  
    try{
        const {name,email} = await request.json();

        await connectDatabase();
        const connection = getConnection();
        const userRepository = getRepository(User);

        // const newUser = userRepository.create({name:name,email:email});
        const newUser = userRepository.create({name,email});
        const savedUser = await userRepository.save(newUser)

        return NextResponse.json(savedUser);
    }catch(error){
        console.log("Error Updating user: ",error);
        return NextResponse.json(
            {message:error},
            {status:500}
        );
    }
}