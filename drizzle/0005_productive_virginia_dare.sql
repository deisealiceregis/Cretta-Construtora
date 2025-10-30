CREATE TABLE `orcamentos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`telefone` varchar(20) NOT NULL,
	`tipo` enum('construcao','reforma','projeto') NOT NULL,
	`assunto` varchar(255) NOT NULL,
	`descricao` text NOT NULL,
	`localizacao` varchar(255),
	`area` int,
	`orcamento` varchar(50),
	`prazo` varchar(100),
	`status` enum('novo','em_analise','respondido','rejeitado') NOT NULL DEFAULT 'novo',
	`observacoes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orcamentos_id` PRIMARY KEY(`id`)
);
