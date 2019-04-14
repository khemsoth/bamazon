create database bamazon;

create table products (
	item_id int not null auto_increment, 
    product_name varchar(50) not null, 
    department_name varchar(20) not null,
    price int not null, 
    stock_quantity int not null,
    primary key(item_id)
    );
    
select * from products;

insert into products(product_name, department_name, price, stock_quantity)
values('Racing Helmet', 'Racing Accessories', 150, 4);

insert into products(product_name, department_name, price, stock_quantity)
values('Racing Gloves', 'Racing Accessories', 40, 10),
('Nvidia GeForce 1080Ti', 'Computer Parts', 500, 2),
('Cooling Fan', 'Computer Parts', 40, 10),
('16GB Ram', 'Computer Parts', 150, 5),
('Jack Stand', 'Garage Accessories', 25, 20),
('Air Compressor', 'Garage Accessories', 200, 3),
('Garage Door Opener', 'Garage Accessories', 10, 30);


