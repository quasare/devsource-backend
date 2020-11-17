CREATE TABLE users (
    username text PRIMARY KEY,
    password text NOT NULL,
    first_name text NOT NULL, 
    last_name text NOT NULL, 
    email VARCHAR NOT NULL UNIQUE,
    photo_url text,
    is_admin boolean NOT NULL DEFAULT FALSE
);

CREATE TABLE languages (
    lang_name text PRIMARY KEY, 
    lang_code text NOT NULL, 
    docs text NOT NULL, 
    website VARCHAR NOT NULL UNIQUE,
    logo_url text
);

CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    lang TEXT NOT NULL REFERENCES languages ON DELETE CASCADE,
    resource_name TEXT NOT NULL,
    website VARCHAR NOT NULL, 
    detail TEXT NOT NULL, 
    date_added timestamp 
);

CREATE TABLE comments (
    id serial PRIMARY KEY,
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE, 
    lang_name TEXT REFERENCES languages ON DELETE CASCADE, 
    resource_id INTEGER REFERENCES resources ON DELETE CASCADE, 
    comment_text text, 
    created_at timestamp
);

CREATE TABLE user_language (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL  REFERENCES users ON DELETE CASCADE, 
    lang_name TEXT NOT NULL REFERENCES languages ON DELETE CASCADE
);



CREATE TABLE liked_vid (
    id SERIAl PRIMARY KEY, 
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE, 
    youtube_url TEXT NOT NULL
);

CREATE TABLE liked_resource (
    id SERIAl PRIMARY KEY,
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE, 
    resource_id INTEGER NOT NULL  REFERENCES resources ON DELETE CASCADE, 
    rating INTEGER NOT NULL CHECK(rating >= 0)
);

INSERT INTO languages (lang_name, lang_code, docs, website, logo_url) 
    VALUES ('golang', 'go', 'java docs','golang.com', 'eeeee');  
INSERT INTO languages (lang_name, lang_code, docs, website, logo_url) 
    VALUES ('java', 'java', 'java docs','java.com', 'eeeee');  
INSERT INTO languages (lang_name, lang_code, docs, website, logo_url) 
    VALUES ('c++', 'cpp', 'C+= docs','cpp.com', 'eeeee');      

INSERT INTO users (username, password, first_name, last_name, email, is_admin) 
    VALUES ('test1', 'password', 'test', 'user', 'test@test.com', TRUE);

INSERT INTO users (username, password, first_name, last_name, email, is_admin) 
    VALUES ('test2', 'password', 'test', 'user', 'test2@test.com', TRUE);

INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('java', 'java spring 2', 'javaspring.com 2', 'framework', current_timestamp); 
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('golang', 'gopher', 'gopher.com', 'lang', current_timestamp);       

INSERT INTO comments (username, lang_name, comment_text, created_at) 
        VALUES ('test1', 'golang', 'first comment', current_timestamp); 
INSERT INTO comments (username, lang_name, comment_text, created_at) 
        VALUES ('test1', 'golang', 'second comment', current_timestamp); 

INSERT INTO liked_vid (username, youtube_url) VALUES ('test1', 'wewe@oyy.com') ;
INSERT INTO liked_resource (username, resource_id, rating) VALUES ('test1', 1, 
2);
INSERT INTO user_language (username, lang_name) VALUES ('test1', 'golang');
