# SOURCE

https://youtu.be/7qAXvOFhlDc
https://youtu.be/NjYsXuSBZ5U


## postgresql cheet sheet

```sql
CREATE TABLE products (
  id INT,
  name VARCHAR(50),
  price INT,
  on_sale boolean
);
```

CREATE TABLE restaurants (
  id INT,
  name VARCHAR(50),
  location VARCHAR(50),
  price_range INT
);

INSERT INTO restaurants(id, name, location,price_range) values(123,'mcdonalds', 'New York',3);

CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL
);


INSERT INTO restaurants(name, location,price_range) values('mcdonalds', 'New York',3),('wendys2', 'Gdańsk',2);

CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range >=1 and price_range<=5)
);

CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range >=1 and price_range<=5)
);

UPDATE restaurants SET name = 'red lobster', price_range = 2 WHERE id = 15;

DELETE FROM restaurants WHERE id = 8 returning *;