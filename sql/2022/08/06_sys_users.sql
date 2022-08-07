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