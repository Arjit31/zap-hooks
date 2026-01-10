import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "./generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});

const app = express();
const corsOptions = {
    credentials: true,
    origin: process.env.FRONTEND_URL,
};

app.use(express.json());
app.use(cors(corsOptions));
const prisma = new PrismaClient({adapter});

app.get("/", (req, res) => {
  console.log("pinged")
  res.status(200).send("OK");
});

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
})

app.listen(3001)