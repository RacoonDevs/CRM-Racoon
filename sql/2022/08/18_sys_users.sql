ALTER TABLE racooncrm.sys_users ADD COLUMN delete_user tinyint(1);
ALTER TABLE racooncrm.sys_user_details ADD COLUMN birthdate DATE;
ALTER TABLE racooncrm.sys_user_details UPDATE COLUMN photo_url varchar(255);