import { prisma } from "../main.js";

export class TicketPanelService {
    async create(name: string, guildId: string) {
        return await prisma.ticketpanel.create({
            data: {
                name,
                guildconfig: {
                    connect: { id: guildId }
                }
            }
        })
    }

    async getAllByGuildId(guildId: string) {
        return await prisma.ticketpanel.findMany({
            where: {
                guildId
            }
        })
    }

    async existsInGuildById(id: number, guildId: string) {
        const data = await prisma.ticketpanel.findFirst({
            where: {
                id,
                guildId
            },
            select: {
                id: true
            }
        });

        return !!data;
    }

    async deleteById(id: number) {
        await prisma.ticketpanel.delete({
            where: {
                id
            }
        });
    }

    async updateName(id: number, newName: string) {
        return await prisma.ticketpanel.update({
            where: {
                id
            },
            data: {
                name: newName
            }
        });
    }
}