CREATE TABLE `settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`primaryColor` varchar(7) NOT NULL DEFAULT '#2D5F4F',
	`secondaryColor` varchar(7) NOT NULL DEFAULT '#000000',
	`accentColor` varchar(7) NOT NULL DEFAULT '#4CAF50',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `construcoes` ADD `status` enum('planejamento','em_andamento','concluida') DEFAULT 'em_andamento' NOT NULL;--> statement-breakpoint
ALTER TABLE `construcoes` ADD `progresso` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `projetos` ADD `status` enum('planejamento','em_andamento','concluida') DEFAULT 'em_andamento' NOT NULL;--> statement-breakpoint
ALTER TABLE `projetos` ADD `progresso` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `reformas` ADD `status` enum('planejamento','em_andamento','concluida') DEFAULT 'em_andamento' NOT NULL;--> statement-breakpoint
ALTER TABLE `reformas` ADD `progresso` int DEFAULT 0 NOT NULL;