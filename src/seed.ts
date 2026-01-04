import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.availableAction.create({
        data: {
            name: "Email",
            image: "https://media.istockphoto.com/id/1125279178/vector/mail-line-icon.jpg?s=612x612&w=0&k=20&c=NASq4hMg0b6UP9V0ru4kxL2-J114O3TaakI467Pzjzw=",
        },
    });
    await prisma.availableAction.create({
        data: {
            name: "Solana",
            image: "https://images.ctfassets.net/jg6lo9a2ukvr/7LFvam4zz8s3y7acW0L59P/1d95950167b950076a3fe8e6ce970e4e/Blog_Header_SOL__1_.png?fm=webp",
        },
    });
    await prisma.availableTrigger.create({
        data: {
            name: "Webhook",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVQtyw3YP4pW8owoHsGyCI2o8POL2m7Hf9NA&s",
        },
    });
}

main();