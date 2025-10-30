CREATE TABLE `empreendimentos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`descricao` text NOT NULL,
	`localizacao` varchar(255) NOT NULL,
	`preco` varchar(50) NOT NULL,
	`unidades` int,
	`area` int,
	`tipo` enum('pronto','construcao','lancamento') NOT NULL,
	`progresso` int NOT NULL DEFAULT 0,
	`previsaoConclusao` varchar(100),
	`dataLancamento` varchar(100),
	`diferenciais` text,
	`imagensPrincipais` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `empreendimentos_id` PRIMARY KEY(`id`)
);
