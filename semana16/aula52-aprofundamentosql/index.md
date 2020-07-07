### Exercício 1

a) Ela 'derrubaria' a coluna salary, apagando-a;

b) Ela trocaria o nome da coluna gender por sex, tendo ela um tamanho máximo de 6 caracteres;

c) Ela faria com a coluna com nome gender possa ter até 255 caracteres.

d) 
```
ALTER TABLE actor 
CHANGE gender gender varchar(100);
```
### Exercício 2

a)
```
UPDATE actor 
SET name = "Moacyr Franco", birth_date = "1936-10-05", gender = "male"
WHERE id = "003";
```
b)
```
SET SQL_SAFE_UPDATES = 0;
UPDATE actor
SET name = "JULIANA PÃES"
WHERE name = "Juliana Paes";
SET SQL_SAFE_UPDATES = 1;

SET SQL_SAFE_UPDATES = 0;
UPDATE actor
SET name = "Juliana Paes"
WHERE name = "JULIANA PÃES";
SET SQL_SAFE_UPDATES = 1;
```
c)
```
UPDATE actor
SET name = "Paola Oliveira", birth_date = "1982-04-14", salary = 800000, gender = "female"
WHERE id = "005";
```
d) 
```
UPDATE actor
SET name = "Debora Nascimento"
WHERE id = "100";
```
Não deu erro, simplesmente ele acusa que deu certo, mas não foi criado nenhum item com o id definido acima.

### Exercício 3

a) A atriz Fernanda Montenegro já tinha sido alterado, no item a do exercício 2, ela tinha id = 003.
```
SET SQL_SAFE_UPDATES = 0;
DELETE 
FROM actor
WHERE name = "Tony Ramos";
SET SQL_SAFE_UPDATES = 1;
```
b)
```
SET SQL_SAFE_UPDATES = 0;
DELETE 
FROM actor
WHERE gender = "male" AND salary > 1000000;
SET SQL_SAFE_UPDATES = 1;
```
### Exercício 4

a)
```
SELECT MAX(salary) 
FROM actor;
```
b) 
```
SELECT MIN(salary) 
FROM actor
WHERE gender = 'female';
```
c)
```
SELECT COUNT(*)
FROM actor
WHERE gender = 'female';
```
d)
```
SELECT SUM(salary)
FROM actor;
```
### Exercício 5

a) Ele mostra a quantidade de atores para cada gênero.

b) 
```
SELECT id, name 
FROM actor
ORDER BY name DESC;
```
c)
```
SELECT *
FROM actor
ORDER BY salary;
```
d)
```
SELECT *
FROM actor
ORDER BY salary DESC
LIMIT 3;
```
e)
```
SELECT gender, AVG(salary)
FROM actor
GROUP BY gender;
```

### Exercício 6

a)
```
ALTER TABLE movie
ADD playing_limit_date date;
```
b) 
```
ALTER TABLE movie
CHANGE rating rating float;
```
c)
```
UPDATE movie
SET playing_limit_date = "2020-10-10"
WHERE id = "001";
```
d)
```
DELETE
FROM movie
WHERE id = '004';

UPDATE movie
SET synopsis = 'Ahhhh'
WHERE id = '004';
```
Ao reproduzir o código acima, não é acusado nenhum erro, mas é informado que nenhuma linha foi alterada.

### Exercício 7

a) 
```
SELECT COUNT(*)
FROM movie
WHERE rating > 7.5;
```
b)
```
SELECT AVG(rating)
FROM movie;
```
c)
```
SELECT COUNT(*)
FROM movie
WHERE playing_limit_date > CURDATE();
````
d)
````
SELECT COUNT(*)
FROM movie
WHERE release_date > CURDATE();
```
e)
```
SELECT MAX(rating)
FROM movie;
```
f)
```
SELECT MIN(rating)
FROM movie;
```

### Exercício 8

a)
```
SELECT *
FROM movie
ORDER BY title;
```
b)
```
SELECT *
FROM movie
ORDER BY title DESC
LIMIT 5;
```
c)
```
SELECT *
FROM movie
WHERE release_date < CURDATE()
ORDER BY release_date DESC
LIMIT 3;
```
d)
```
SELECT *
FROM movie
ORDER BY rating DESC
LIMIT 3;
```