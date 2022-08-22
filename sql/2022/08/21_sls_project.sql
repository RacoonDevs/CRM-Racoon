CREATE TABLE `racooncrm`.`sls_project` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `icono_url` VARCHAR(150) NULL,
  `descripcion` VARCHAR(15) NULL,
  `status` VARCHAR(15) NULL,
  `start_date` datetime,
  `end_date` datetime,
  `created_at` TIMESTAMP ,
  `created_by` INT(11) NOT NULL,
  `updated_at` DATETIME NULL,
  `updated_by` INT(11) NULL,
  CONSTRAINT `sls_project_id_pkey` PRIMARY KEY (`id`),
  CONSTRAINT `sls_project_created_by_fkey`
    FOREIGN KEY (`created_by`)
    REFERENCES `racooncrm`.`sys_users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `sls_project_updated_by_fkey`
    FOREIGN KEY (`updated_by`)
    REFERENCES `racooncrm`.`sys_users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE racooncrm.sls_project ADD COLUMN delete_project tinyint(1);