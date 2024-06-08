import { connectDatabase, getConnection } from "@/app/db/connect";
import { User } from "@/app/entities/User";
import { NextResponse } from "next/server";
import {getRepository} from "typeorm"

export async function GET(
    request: Request,
    {params}:{params:{id:number}}

){
    try{
        await connectDatabase();
        const connection = getConnection();
        const userRepository = getRepository(User);

        const user = await userRepository.findOneBy({
            id:params.id
        });
        
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404});
        }
        return NextResponse.json(user);
    }catch(error:any){
        console.log("Error fetching user: ",error);
        return NextResponse.json(
            {message:error.message},
            {status:500}
        );
    }
}

export async function DELETE(
    request: Request,
    {params}:{params:{id:number}}
){  
    const id = params.id
    console.log('deleting ',id);
    try{
        await connectDatabase();
        const connection = getConnection();
        const userRepository = getRepository(User);

        const user = await userRepository.findOneBy({
            id:id
        });
        
        if(!user){
            return NextResponse.json({message:"User not found"},{status:404});
        }
        await userRepository.delete(id);


        return NextResponse.json(
            {Message:"User deleted successfully"},
            {status:200}
        );
    }catch(error:any){
        console.log("Error deleting user: ",error);
        return NextResponse.json(
            {message:error.message},
            {status:500}
        );
    }
}


export async function PUT(
    request: Request,
    {params}:{params:{id:number}}
){  
    try{

        const {name,email} = await request.json();
        const id = params.id
        await connectDatabase();
        const connection = getConnection();
        const userRepository = getRepository(User);

        const userToUpdate = await userRepository.findOneBy({
            id:id
        });
        
        if(!userToUpdate){
            return NextResponse.json({message:"User not found"},{status:404});
        }

        userToUpdate.name = name;
        userToUpdate.email = email;
        const updatedUser = await userRepository.save(userToUpdate)

        return NextResponse.json(updatedUser);
    }catch(error:any){
        console.log("Error Updating user: ",error);
        return NextResponse.json(
            {message:error.message},
            {status:500}
        );
    }
}