CREATE TABLE `projetos_detalhes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`descricao` text NOT NULL,
	`localizacao` varchar(255) NOT NULL,
	`preco` varchar(50),
	`metragem` int,
	`pavimentos` int,
	`quartos` int,
	`banheiros` int,
	`vagas` int,
	`progresso` int NOT NULL DEFAULT 0,
	`previsaoConclusao` varchar(100),
	`diferenciais` text,
	`imagensPrincipais` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projetos_detalhes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reformas_detalhes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`descricao` text NOT NULL,
	`localizacao` varchar(255) NOT NULL,
	`preco` varchar(50),
	`metragem` int,
	`tipo_reforma` varchar(100),
	`progresso` int NOT NULL DEFAULT 0,
	`previsaoConclusao` varchar(100),
	`diferenciais` text,
	`imagensPrincipais` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reformas_detalhes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `empreendimentos` ADD `metragem` int;--> statement-breakpoint
ALTER TABLE `empreendimentos` ADD `pavimentos` int;--> statement-breakpoint
ALTER TABLE `empreendimentos` ADD `quartos` int;--> statement-breakpoint
ALTER TABLE `empreendimentos` ADD `banheiros` int;--> statement-breakpoint
ALTER TABLE `empreendimentos` ADD `vagas` int;