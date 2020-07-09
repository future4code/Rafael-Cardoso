### Exercício 1

a) Chave estrangeira é quando é usada uma coluna da tabela pai como chave em uma tabela filho.

b)
```
CREATE TABLE rating (
  id VARCHAR(255) PRIMARY KEY,
  comment TEXT NOT NULL,
  rate FLOAT NOT NULL,
  movie_id VARCHAR(255),
  FOREIGN KEY (movie_id) REFERENCES movie(id)
);

INSERT INTO rating
VALUE("001", "Bom", 7, "001");

INSERT INTO rating
VALUE("002", "Muito bom", 10, "002");

INSERT INTO rating
VALUE("003", "Bom", 8, "003");

INSERT INTO rating
VALUE("004", "Excelente", 9, "005");

INSERT INTO rating
VALUE("005", "Muito excelente", 10, "006");
```
c) Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails. Não é possível pelas restrições da foreign key.

d) 
```
ALTER TABLE movie DROP COLUMN rating;
```
e) 
```
DELETE
FROM movie
WHERE id = '005';
```
Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails. Não é possível apagar ou atualizar de uma tabela pai pelas restrições da foreign key.

### Exercício 2

a)
```
CREATE TABLE movieCast (
  movie_id VARCHAR(255),
  actor_id VARCHAR(255),
  FOREIGN KEY (movie_id) REFERENCES movie(id),
  FOREIGN KEY (actor_id) REFERENCES actor(id)
);
```
b)
```
INSERT INTO movieCast
VALUE("001", "002");

INSERT INTO movieCast
VALUE("001", "004");

INSERT INTO movieCast
VALUE("002", "004");

INSERT INTO movieCast
VALUE("002", "005");

INSERT INTO movieCast
VALUE("003", "005");

INSERT INTO movieCast
VALUE("005", "005");

INSERT INTO movieCast
VALUE("006", "006");
```
c) 
```
INSERT INTO movieCast
VALUE("009", "009");
```
Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails. Não é possível apagar ou atualizar de uma tabela pai pelas restrições da foreign key.

d)
```
DELETE FROM actor
WHERE id = '002';
```
Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails. Não é possível apagar ou atualizar de uma tabela pai pelas restrições da foreign key.

### Exercício 3

a) Ela junta as duas tabelas citadas, usando o ON para passar a condicional. 
```
SELECT * FROM movie
JOIN rating
ON movie.id = rating.movie_id;
```
b) 
```
SELECT movie.id as movie_id, movie.title as name, rating.rate as rating  FROM movie
JOIN rating
ON movie.id = rating.movie_id;
```

### Exercício 4

a) 
```
SELECT movie.id as movie_id, movie.title as name, rating.rate as rating, rating.comment FROM movie
LEFT JOIN rating
ON movie.id = rating.movie_id;
```
b)
```
SELECT movie.id as movie_id, movie.title as movie_title, movieCast.actor_id FROM movieCast
RIGHT JOIN movie
ON movie.id = movieCast.movie_id;
```
c)
```
SELECT AVG(rating.rate), movie.id as movie_id, movie.title FROM movie
LEFT JOIN rating
ON movie.id = rating.movie_id
GROUP BY movie.id;
```

### Exercício 5

a) Necessita de dois JOIN por ter para primeiro unir movie e movieCast, e depois unir o resultado anterior com actor

b)
```
SELECT movie.id as movie_id, movie.title, actor.id as actor_id, actor.name as actor_name FROM movie
LEFT JOIN movieCast ON movie.id = movieCast.movie_id
JOIN actor ON actor.id = movieCast.actor_id;
```
d)
```
SELECT movie.id as movie_id, movie.title, actor.id as actor_id, actor.name, rating.rate as rating, rating.comment FROM movie
LEFT JOIN rating ON movie.id = rating.movie_id
LEFT JOIN movieCast ON movie.id = movieCast.movie_id
JOIN actor ON actor.id = movieCast.actor_id;
```

### Exercício 6

```
CREATE TABLE oscar(
	id varchar(255) PRIMARY KEY,
  name enum("Filme", "Diretor", "Ator")
);

INSERT INTO oscar
VALUE("001", "Filme"), ("002", "Diretor"), ("003", "Ator");

CREATE TABLE movieAward (
  movie_id VARCHAR(255),
  oscar_id VARCHAR(255),
  FOREIGN KEY (movie_id) REFERENCES movie(id),
  FOREIGN KEY (oscar_id) REFERENCES oscar(id)
);

INSERT INTO movieAward 
VALUE("001", "001"), ("001", "003"), ("002", "001"), ("002", "002"), ("003", "003"), ("003", "002"), ("005", "001"), ("006", "003"), ("006", "002");

SELECT movie.id as movie_id, movie.title, oscar.name as oscar FROM movie
LEFT JOIN movieAward ON movie.id = movieAward.movie_id
JOIN oscar ON oscar.id = movieAward.oscar_id;
```
