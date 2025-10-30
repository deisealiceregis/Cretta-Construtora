CREATE TABLE `construcoes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`descricao` text NOT NULL,
	`cliente` varchar(255) NOT NULL,
	`localizacao` varchar(255) NOT NULL,
	`pavimentos` int,
	`apartamentos` int,
	`area` int,
	`fotoUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `construcoes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projetos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`descricao` text NOT NULL,
	`cliente` varchar(255) NOT NULL,
	`localizacao` varchar(255) NOT NULL,
	`pavimentos` int,
	`apartamentos` int,
	`area` int,
	`fotoUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projetos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reformas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`descricao` text NOT NULL,
	`cliente` varchar(255) NOT NULL,
	`localizacao` varchar(255) NOT NULL,
	`area` int,
	`fotoUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reformas_id` PRIMARY KEY(`id`)
);
