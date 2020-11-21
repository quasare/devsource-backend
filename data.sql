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
    language_name TEXT NOT NULL REFERENCES languages ON DELETE CASCADE
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
    VALUES ('Golang', 'go', 'https://golang.org/doc/','https://golang.org/', 'null');  
INSERT INTO languages (lang_name, lang_code, docs, website, logo_url) 
    VALUES ('Java', 'java', 'https://docs.oracle.com/en/java/','https://www.java.com/en/', 'null');  
INSERT INTO languages (lang_name, lang_code, docs, website, logo_url) 
    VALUES ('Python', 'py', 'https://docs.python.org/3/','https://www.python.org/', 'null');      
INSERT INTO languages (lang_name, lang_code, docs, website, logo_url) 
    VALUES ('Javascript', 'js', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference','https://developer.mozilla.org/en-US/docs/Web/JavaScript', 'null'); 
INSERT INTO languages (lang_name, lang_code, docs, website, logo_url) 
    VALUES ('C++', 'cpp', 'https://devdocs.io/cpp/','https://www.cplusplus.com/', 'null');    
INSERT INTO languages (lang_name, lang_code, docs, website, logo_url) 
    VALUES ('Swift', 'swift', 'https://swift.org/documentation/','https://developer.apple.com/swift/', 'null');  


INSERT INTO users (username, password, first_name, last_name, email, is_admin) 
    VALUES ('test1', 'password', 'test', 'user', 'test@test.com', TRUE);


INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Golang', 'Gin', 'https://github.com/gin-gonic/gin#gin-web-framework', 'Gin is a web framework written in Go (Golang). It features a martini-like API with performance that is up to 40 times faster thanks to httprouter. If you need performance and good productivity, you will love Gin.', current_timestamp); 
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Golang', 'Beego', 'https://beego.me/', 'An open source framework to build and develop your applications in the Go way', current_timestamp);       
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Golang', 'Hugo', 'https://gohugo.io/', 'Hugo is one of the most popular open-source static site generators. With its amazing speed and flexibility, Hugo makes building websites fun again.', current_timestamp); 
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Java', 'Spring', 'https://spring.io/projects/spring-framework', 'The Spring Framework provides a comprehensive programming and configuration model for modern Java-based enterprise applications - on any kind of deployment platform.', current_timestamp);
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Java', 'Grails', 'https://grails.org/', 'A powerful Groovy-based web application framework for the JVM built on top of Spring Boot', current_timestamp);
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Java', 'GWT', 'http://www.gwtproject.org/overview.html', 'GWT is a development toolkit for building and optimizing complex browser-based applications.', current_timestamp);
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Python', 'Flask', 'https://flask.palletsprojects.com/en/1.1.x/', 'A micro web framework written in Python', current_timestamp);
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Python', 'Django', 'https://www.djangoproject.com/', 'Django makes it easier to build better Web apps more quickly and with less code.', current_timestamp);
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Python', 'TensorFlow', 'https://www.tensorflow.org/', 'An end-to-end open source machine learning platform', current_timestamp);
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Javascript', 'React', 'https://reactjs.org/', 'A JavaScript library for building user interfaces', current_timestamp);
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Javascript', 'Node', 'https://nodejs.org/en/', 'Node.js® is a JavaScript runtime built on Chromes V8 JavaScript engine.', current_timestamp);
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Javascript', 'JQuery', 'https://jquery.com/', 'jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.', current_timestamp);
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('C++', 'Boost', 'https://www.boost.org/', 'Boost provides free peer-reviewed portable C++ source libraries.', current_timestamp);
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('C++', 'ASIO', 'https://think-async.com/Asio/', 'Asio is a cross-platform C++ library for network and low-level I/O programming that provides developers with a consistent asynchronous model using a modern C++ approach.', current_timestamp);
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('C++', 'Eigen', 'http://eigen.tuxfamily.org/index.php?title=Main_Page', 'Eigen is a C++ template library for linear algebra: matrices, vectors, numerical solvers, and related algorithms.', current_timestamp);      
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Swift', 'SwiftyJSON', 'https://github.com/SwiftyJSON/SwiftyJSON', 'SwiftyJSON makes it easy to deal with JSON data in Swift.', current_timestamp);
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Swift', '100 Days of Swift', 'https://www.hackingwithswift.com/100', 'Free collection of videos, tutorials, tests, and more', current_timestamp);
INSERT INTO resources (lang, resource_name, website, detail, date_added) 
      VALUES ('Swift', 'SwiftUI', 'https://developer.apple.com/documentation/swiftui/', 'Declare the user interface and behavior for your app on every platform.', current_timestamp);

INSERT INTO comments (username, lang_name, comment_text, created_at) 
        VALUES ('test1', 'Golang', 'This is great', current_timestamp); 
INSERT INTO comments (username, lang_name, comment_text, created_at) 
        VALUES ('test1', 'Java', 'This is great', current_timestamp); 

-- INSERT INTO liked_vid (username, youtube_url) VALUES ('test1', 'wewe@oyy.com') ;
-- INSERT INTO liked_resource (username, resource_id, rating) VALUES ('test1', 1, 
-- 2);
-- INSERT INTO user_language (username, language_name) VALUES ('test1', 'golang');
