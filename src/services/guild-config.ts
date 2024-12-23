import { prisma } from "../main.js";

export class GuildConfigService {
    async getOneById(id: string) {
        return await prisma.guildconfig.findFirst({
            where: {
                id
            }
        });
    }

    async existsById(id: string) {
        const result = await prisma.guildconfig.findFirst({
            where: {
                id
            },
            select: {
                id: true
            }
        });

        return result;
    }

    async create(id: string) {
        return await prisma.guildconfig.create({
            data: {
                id,
                basicTicketCount: 0
            }
        });
    }
}