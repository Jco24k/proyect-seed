import dotenv from 'dotenv';
dotenv.config();

import './config/joi.validation';
import { AppDataSource } from './database/database';
import { ReadStructure } from './services/read-structure';



const main = async()=>{
    try{
        await AppDataSource.initialize();
        console.log("Database connected")
        await ReadStructure();
        console.log("Successful Registration...!");
    }catch(error){
        console.log(error);
        process.exit(0)
    }
}

main();