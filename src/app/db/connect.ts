import { Connection,getConnectionManager } from "typeorm";
import {User} from "../entities/User"

let connection:Connection;

export const connectDatabase = async ():Promise<void> => {
    const connectionManager = getConnectionManager();

   
    if (connectionManager.has("default")){
        connection = connectionManager.get("default");
    }else{
        connection = connectionManager.create({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "pass",
            database: "Crud",
            entities: [User],
            synchronize: true,
            logging: true
        });

        await connection.connect();
        console.log("TypeORM connected");
    }
};

export const getConnection = (): Connection => {
    if(!connection){
        throw new Error("Connection is established");
    }
    return connection;
}


