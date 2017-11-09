create schema `node_demo` default character set utf8 collate utf8_unicode_ci;

use `node_demo`;

create table `user` (
	`user_id` int not null auto_increment,
    `username` varchar(50),
    `password` varchar(128),
	`created` timestamp not null,
	`last_login` datetime default null,
	`failed_count` int(11) not null default '0',
	`active` tinyint(4) not null default '0',
    primary key (`user_id`)
);

drop table `user`;
truncate table `user`;

insert into `user` (
	`username`,
    `password`,
    `created`,
    `active`
) 
values 
	('larry', 'pass123!', curdate(), 1),
	('curly', 'pass123!', curdate(), 1),
	('moe', 'pass123!', curdate(), 0);

select * from `user`;
