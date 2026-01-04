import express from "express";
import { PrismaClient } from "./generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import dotenv from "dotenv";
dotenv.config();

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});

const app = express();
app.use(express.json())
const prisma = new PrismaClient({adapter});

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    console.log(process.env.DATABASE_URL);
    console.log(body)
    try{
        await prisma.$transaction(async (tx) => {
            const zapRun = await tx.zapRun.create({
                data: {
                    zapId: zapId,
                    metadata: body
                }
            })
            await tx.zapRunOutbox.create({
                data:{
                    zapRunId: zapRun.id
                }
            })
        });
        res.json({message: "webhook received"})
    }
    catch (error){
        console.log(error);
        res.json(error).status(500)
    }
});

app.listen(3001)