CREATE TABLE `racooncrm`.`sys_user_details` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `photo_url` VARCHAR(120) NULL,
  `addres` VARCHAR(120) NULL,
  `phone` VARCHAR(15) NULL,
  `created_at` TIMESTAMP ,
  `created_by` INT(11) NOT NULL,
  `updated_at` DATETIME NULL,
  `updated_by` INT(11) NULL,
  `id_user` INT(11) NOT NULL,
  CONSTRAINT `sys_user_details_id_pkey` PRIMARY KEY (`id`),
  CONSTRAINT `sys_user_details_id_user_fkey`
    FOREIGN KEY (`id_user`)
    REFERENCES `racooncrm`.`sys_users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `sys_user_details_created_by_fkey`
    FOREIGN KEY (`created_by`)
    REFERENCES `racooncrm`.`sys_users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `sys_user_details_updated_by_fkey`
    FOREIGN KEY (`updated_by`)
    REFERENCES `racooncrm`.`sys_users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    );