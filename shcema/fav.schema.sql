CREATE TABLE
    IF NOT EXISTS fav(
        id SERIAL PRIMARY KEY,
        weather varchar(200) NOT NULL,
        visibility varchar(200) NOT NULL,
        owner varchar(200) NOT NULL,
        comment varchar(1000),
        date DATE NOT NULL DEFAULT CURRENT_DATE,
    );