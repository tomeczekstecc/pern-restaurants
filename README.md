# SOURCE

https://youtu.be/7qAXvOFhlDc
https://youtu.be/NjYsXuSBZ5U


## postgresql cheat sheet

```sql
CREATE TABLE products (
  id INT,
  name VARCHAR(50),
  price INT,
  on_sale boolean
);
```

```sql
CREATE TABLE restaurants (
  id INT,
  name VARCHAR(50),
  location VARCHAR(50),
  price_range INT
);
```

```sql
INSERT INTO restaurants(id, name, location,price_range) values(123,'mcdonalds', 'New York',3);
```

```sql
CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL
);
```

```sql
INSERT INTO restaurants(name, location,price_range)
  values('mcdonalds', 'New York',3),('wendys2', 'Gdańsk',2);
```

```sql
CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range >=1 and price_range<=5)
);
```

```sql
CREATE TABLE restaurants (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range >=1 and price_range<=5)
);
```

```sql
UPDATE restaurants SET name = 'red lobster', price_range = 2 WHERE id = 15;
```

```sql
DELETE FROM restaurants WHERE id = 8 returning *;
```

```sql
CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  name varchar(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT NOT NULL check(rating >=1 and rating<=5)
);
```

```sql
INSERT INTO reviews (restaurant_id, name, review, rating)
VALUES (3,'carl',  'restaurant is great', 4);
```

```sql
SELECT location, count(*)
FROM  restaurants
GROUP BY location;
```

```sql
SELECT restaurants.name, restaurant_id, count(restaurant_id)
FROM  reviews
LEFT JOIN restaurants ON restaurants.id = restaurant_id
GROUP BY restaurant_id, restaurants.name;
```

```sql
SELECT restaurants.name, restaurant_id, trunc(avg(rating),4) as avg_rating, count(restaurant_id) as nr_of_ratings
FROM  reviews
JOIN restaurants ON restaurants.id = restaurant_id
GROUP BY restaurant_id, restaurants.name;
```

```sql
SELECT *
FROM  reviews
INNER JOIN restaurants ON restaurants.id = restaurant_id;
```

```sql
select r.*, trunc(avg(rating),2) as rating_avg, count(v.id) as ratings_nr
from restaurants r
left join reviews v on v.restaurant_id = r.id
group by r.id;
```