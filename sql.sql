CREATE TABLE usuario (
   nome VARCHAR(100) not null,
   senha VARCHAR(100) not null,
   email VARCHAR(100) not null,
   created_on TIMESTAMP NOT NULL,
   PRIMARY KEY (email)
);

CREATE TABLE team (
    id SERIAL not null,
    nome VARCHAR(100) not null,
    descricao VARCHAR(100) not null,
    responsavel VARCHAR(100) not null,
    PRIMARY KEY (id)
);

CREATE TABLE usuario_team (
    user_email VARCHAR NOT NULL,
    team_id INT NOT NULL,
    created_on TIMESTAMP NOT NULL,
    PRIMARY KEY (user_email, team_id),
    FOREIGN KEY (team_id)
        REFERENCES team (id),
    FOREIGN KEY (user_email)
        REFERENCES usuario (email)
);