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
            name: "Gemini",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/960px-Google_Gemini_icon_2025.svg.png",
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