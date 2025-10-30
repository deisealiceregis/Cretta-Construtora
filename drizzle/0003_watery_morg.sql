CREATE TABLE `imagens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projetoId` int NOT NULL,
	`tipo` enum('construcao','projeto','reforma') NOT NULL,
	`url` varchar(500) NOT NULL,
	`titulo` varchar(255),
	`ordem` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `imagens_id` PRIMARY KEY(`id`)
);
