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

CREATE TABLE comments (
    id serial PRIMARY KEY,
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE, 
    lang_name TEXT NOT NULL REFERENCES languages ON DELETE CASCADE, 
    comment text, 
    created_at timestamp
);

CREATE TABLE user_language (
    username TEXT NOT NULL PRIMARY KEY REFERENCES users ON DELETE CASCADE, 
    lang_name TEXT NOT NULL REFERENCES languages ON DELETE CASCADE
    
);

CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    lang_name TEXT NOT NULL REFERENCES languages ON DELETE CASCADE,
    resource_name TEXT NOT NULL,
    website VARCHAR NOT NULL, 
    detail TEXT NOT NULL, 
    date_added timestamp 
);

CREATE TABLE liked_vid (
    id SERIAl PRIMARY KEY, 
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE, 
    youtube_url TEXT NOT NULL
);

CREATE TABLE liked_resource (
    username TEXT PRIMARY KEY NOT NULL REFERENCES users ON DELETE CASCADE, 
    resource_id INTEGER NOT NULL  REFERENCES resources ON DELETE CASCADE, 
    rating INTEGER NOT NULL CHECK(rating <= 1.0)
);

INSERT INTO languages (lang_name, lang_code, docs, website, logo_url) VALUES ('golang', 'go', 'docs','golang.com', 'eeeee');  