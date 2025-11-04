import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json())
const prisma = new PrismaClient();

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    console.log(body)

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
});

app.listen(3000)