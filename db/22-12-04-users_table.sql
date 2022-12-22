-- Create a new database CRM RACOON_V1

CREATE DATABASE IF NOT EXISTS crm_racoon_db;

-- SELECT DB
USE crm_racoon_db;

-- CREATE COMPANY TABLE from crm_racoon_db
CREATE TABLE `racoondb`.`team` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `code` VARCHAR(10) NOT NULL,
  `logoURL` VARCHAR(191) NULL,
  `ts` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE`(`id` ASC) VISIBLE);

-- CREATE USER TABLE from crm_racoon_db
CREATE TABLE `racoondb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(191) NOT NULL,
  `firstName` VARCHAR(191) NOT NULL,
  `lastName` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191)NOT NULL,
  `country` VARCHAR(191) NULL,
  `address` VARCHAR(191) NULL,
  `phone` VARCHAR(191) NULL,
  `gender` TINYINT(10) NULL,
  `bornDate` DATE NULL,
  `photoURL` VARCHAR(191) NULL,
  `bgSelected` TINYINT(10) NULL,
  `status` VARCHAR(4) NOT NULL DEFAULT 'ACT',
  `rol` SMALLINT(5) NOT NULL DEFAULT 0,
  `team_id` INT NOT NULL DEFAULT 1,
  `ts` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE`(`id` ASC) VISIBLE,
  INDEX `id_team_fk_idx`(`team_id` ASC),
  CONSTRAINT `id_team_fk`
    FOREIGN KEY (`team_id`)
    REFERENCES `racoondb`.`team`(`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- CREATE USER_DETAILS TABLE from crm_racoon_db
-- CREATE TABLE `racoondb`.`user_detail` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `address` VARCHAR(191) NULL,
--   `phone` VARCHAR(191) NULL,
--   `photo_url` VARCHAR(191) NULL,
--   `bg_selected` VARCHAR(191) NULL,
--   `user_id` INT NULL,
--   `ts` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`),
--   UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `id_user_fk_idx` (`user_id` ASC),
  CONSTRAINT `id_user_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `racoondb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

  