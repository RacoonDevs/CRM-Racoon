CREATE TABLE `sys_users` (
`id` int(11) NOT NULL AUTO_INCREMENT,
  `status` tinyint(1) NOT NULL,
  `user_name` varchar(70) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `name` varchar(70) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` int(11) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
)


--INSERT DEFAULT USER

INSERT INTO sys_users (status, user_name, email, password, name, created_by) values (1, "RacoonDevs", "racoon@racoon.mx", "$2y$10$263xVqxSqcn5jEbmepYuZejQERFWe.QLozzpho26olgWSdzX3ziq.", "RacoonDevs" ,1);