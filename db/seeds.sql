/*
INSERT INTO burgers (name) VALUES ('Meeses');
INSERT INTO burgers (name) VALUES ('Bobbi');
INSERT INTO burgers (name, devoured) VALUES ('Sylvester', true);
INSERT INTO burgers (name, devoured) VALUES ('Marilyn Manson', true);
INSERT INTO burgers (name, devoured) VALUES ('Joe Biden', true);
INSERT INTO burgers (name) VALUES ('Owens');


CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
*/

INSERT INTO burgers (name) VALUES ('Just Meat');
INSERT INTO burgers (name) VALUES ('Cheese Burger');
INSERT INTO burgers (name) VALUES ('The Works');