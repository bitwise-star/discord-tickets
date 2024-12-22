-- CreateTable
CREATE TABLE `GuildConfig` (
    `id` VARCHAR(191) NOT NULL,
    `basicTicketCount` INTEGER NOT NULL,

    UNIQUE INDEX `GuildConfig_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketPanel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `guildId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TicketCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticketCount` INTEGER NOT NULL DEFAULT 0,
    `panelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ticketNumber` INTEGER NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NULL,
    `status` ENUM('OPEN', 'CLOSED') NOT NULL DEFAULT 'OPEN',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TicketPanel` ADD CONSTRAINT `TicketPanel_guildId_fkey` FOREIGN KEY (`guildId`) REFERENCES `GuildConfig`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TicketCategory` ADD CONSTRAINT `TicketCategory_panelId_fkey` FOREIGN KEY (`panelId`) REFERENCES `TicketPanel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `TicketCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
