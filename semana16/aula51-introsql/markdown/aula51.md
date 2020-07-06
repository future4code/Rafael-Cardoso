### Exercício 1

a) O comando CREATE TABLE cria uma tabela. No caso de id, name e gender estão usando varchar que é uma string determinando o máximo de 
caracteres, o que para os primeiros é 255 que é um padrão utilizado e para gender foi determinado 6 porque ele só pode ser MALE ou 
FEMALE. Para birth_date foi utilizado date que mostra uma data no formato YYYY-MM-DD.

b) Ao utilizar SHOW DATABASES aparece as databases, no caso information_schema e julian_rafael_cardoso_db e ao usar SHOW TABLES aparece
as tabelas, no caso actor.

c) Ao usar DESCRIBE actor, mostra a estrutura da tabela, os nomes dos campos, como id e name, os tipos dados, como varchar e float, se 
podem ser NULL e no campo id mostra que é PRIMARY KEY. Ao usar SHOW actor deu erro.

```
USE julian_rafael_cardoso_db;

CREATE TABLE actor(
	id varchar(255) PRIMARY KEY,
  name varchar(255) NOT NULL,
  salary float NOT NULL,
  birth_date date NOT NULL,
  gender varchar(6) NOT NULL
);

SHOW DATABASES;

SHOW TABLES;

DESCRIBE actor;

SHOW actor;
```
### Exercício 2

```
INSERT INTO actor (id, name, salary, birth_date, gender)
VALUES("001", "Tony Ramos", 400000, "1948-08-25", "male");
```

a) 
```
INSERT INTO actor (id, name, salary, birth_date, gender)
VALUES("002", "Gloria Pires", 1200000, "1963-08-23", "female");
```
b) Erro código: 1062. Entrada duplicada '002' para a chave primária, que ocorre porque tentou criar um item na actor com um id já existente.

c) 
```
INSERT INTO actor (id, name, salary)
VALUES("003", "Fernanda Montenegro", 300000, "1929-10-19", "female");
```
Erro código: 1136. Quantidade na coluna não equivale ao valor na linha 1. Ocorre porque a quantidade de nomes de colunas e de valores não bate.
```
INSERT INTO actor (id, name, salary, birth_date, gender)
VALUES("003", "Fernanda Montenegro", 300000, "1929-10-19", "female");
```
d) 
```
INSERT INTO actor (id, salary, birth_date, gender)
VALUES("004", 400000, "1949-04-18", "male");
```
Erro código: 1364. Campo 'name' não tem um valor padrão. Ocorre porque foi definido que o campo 'name' não pode ser nulo nem tem um valor default.
```
INSERT INTO actor (id, name, salary, birth_date, gender)
VALUES("004", "Antonio Fagundes", 400000, "1949-04-18", "male");
```
e)
```
INSERT INTO actor (id, name, salary, birth_date, gender)
VALUES("005", "Juliana Paes", 719333.33, 1979-03-26, "female");
```
Erro código: 1292. Valor incorreto para date: '1950' na coluna 'birth_date'.
```
INSERT INTO actor (id, name, salary, birth_date, gender)
VALUES("005", "Juliana Paes", 719333.33, "1979-03-26", "female");
```
f)
```
INSERT INTO actor (id, name, salary, birth_date, gender)
VALUES("006", "Rodrigo Lombardi", 300000, "1976-10-15", "male");

INSERT INTO actor (id, name, salary, birth_date, gender)
VALUES ("007", "Juliana Baroni", 200000, "1978-04-17", "female");
```
### Exercício 3

a)
```
SELECT * 
FROM actor
WHERE gender = "female";
```
b)
```
SELECT salary
FROM actor
WHERE name = 'Tony Ramos';
```
c)
```
SELECT *
FROM actor
WHERE gender = "invalid";
```
Retorna nada por não haver ninguém com gender 'invalid', mas não dá erro.

d)
```
SELECT id, name, salary
FROM actor
WHERE salary <= 500000;
```
e)
```
SELECT id, nome 
FROM actor 
WHERE id = "002";
```
Erro código: 1054. Coluna desconhecida 'nome' na 'lista de campos'.
```
SELECT id, name 
FROM actor
WHERE id = "002";
```
### Exercício 4

a) Para retornar todoas os campos de todos os atores que se encaixem nas condições, que nesse caso, em que os nomes comecem com A OU J e tenham
salário superior a 300000.

b)
```
SELECT *
FROM actor
WHERE name NOT LIKE "A%" AND salary > 350000;
```
c)
```
SELECT *
FROM actor
WHERE name LIKE "%G%" OR name LIKE "%g%";
```
d)
```
SELECT *
FROM actor
WHERE (name LIKE "%a%" OR name LIKE "%A%" OR name LIKE "%g%" OR name LIKE "%G%") AND (salary BETWEEN 350000 AND 900000);
```
### Exercício 5

a)
```
CREATE TABLE movie (
	id varchar(255) PRIMARY KEY,
  title varchar(255) NOT NULL UNIQUE,
  synopsis text NOT NULL,
  release_date date NOT NULL,
  rating INT NOT NULL
);
```
b)
```
INSERT INTO movie (id, title, synopsis, release_date, rating)
VALUES ("001", "Se Eu Fosse Você", "Cláudio e Helena são casados há muitos anos e enfrentam a rotina do casamento. Um dia eles são atingidos por um fenômeno inexplicável e trocam de corpos.", "2006-01-06", 7);
```
c)
```
INSERT INTO movie (id, title, synopsis, release_date, rating)
VALUES ('002', 'Doce de mãe', 'Dona Picucha, uma animada senhora de 85 anos, sempre causa grandes confusões. A vida dela e dos seus quatro filhos sofre uma reviravolta depois que Zaida, empregada e amiga de Dona Picucha, anuncia que vai se casar e não poderá mais morar com ela.', '2012-12-27', 10);
```
d)
```
INSERT INTO movie (id, title, synopsis, release_date, rating)
VALUES ('003', 'Dona Flor e Seus Dois Maridos', 'Dona Flor é uma sedutora professora de culinária casada com Vadinho, que só quer saber de farras e jogatina nas boates. A vida de abusos acaba por acarretar sua morte precoce.', '2017-11-02', 8);
```
e)
```
INSERT INTO movie (id, title, synopsis, release_date, rating)
VALUES ('004', 'Deus é brasileiro', 'Cansado da humanidade, Deus resolve tirar férias para descansar e procura alguém no Brasil capaz de substituí-lo. O borracheiro e pescador Taoca e a solitária Madá deverão guiá-lo até Quincas das Mulas, candidato de Deus a santo.', '2003-01-31', 9);
```
### Exercício 6

a)
```
SELECT id, title, rating
FROM movie
WHERE id = '002';
```
b)
```
SELECT *
FROM movie
WHERE title = 'Deus é brasileiro';
```
c)
```
SELECT id, title, synopsis
FROM movie
WHERE rating >= 7;
```

### Exercício 7

a)
```
SELECT *
FROM movie
WHERE title LIKE "%vida%";
```

b)
```
SELECT *
FROM movie
WHERE title LIKE "%senhora%" OR synopsis LIKE "%senhora%";
```
c)
```
SELECT *
FROM movie
WHERE release_date < '2020-07-06';
```
d)
```
SELECT *
FROM movie
WHERE release_date < '2020-07-06' AND (title LIKE "%prof%" OR synopsis LIKE "%prof%") AND rating > 7;
```