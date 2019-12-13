

select * from eventDetails;

use cuthere;

create table if not exists cuthere.users
(
	`userID` int not null,
    `userName` varchar(70) not null,
    `password_` varchar(50) not null,
    `password` varchar(50) not null,
	`userEmail` varchar(75) not null
) 
engine=innodb;


select * from organizers inner join eventDetails on eventDetails.organizerID = organizers.organizerID where eventDetails.organizerID = 123456