CREATE TABLE `depoimentos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`cargo` varchar(255) NOT NULL,
	`empresa` varchar(255) NOT NULL,
	`texto` text NOT NULL,
	`avaliacao` int NOT NULL,
	`fotoUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `depoimentos_id` PRIMARY KEY(`id`)
);
