CREATE TABLE `videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`descricao` text,
	`url` varchar(500) NOT NULL,
	`tipo` enum('construcao','projeto','reforma') NOT NULL,
	`projetoId` int NOT NULL,
	`status` enum('planejamento','em_andamento','concluida') NOT NULL DEFAULT 'em_andamento',
	`thumbnail` varchar(500),
	`ordem` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `videos_id` PRIMARY KEY(`id`)
);
