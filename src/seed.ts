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
            image: "https://freepngimg.com/download/gmail/66572-google-icons-computer-logo-email-gmail.png",
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
            image: "https://cdn.worldvectorlogo.com/logos/webhooks.svg",
        },
    });
}

main();