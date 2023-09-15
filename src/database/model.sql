create database kinopoisk;

create table users(
    id serial not null primary key,
    username varchar(32) not null,
    fullname text not null,
    password text not null,
    balance int not null default 0,
    created_at timestamp not null default current_timestamp,
    is_admin boolean default false
);

create table films(
    id serial not null primary key,
    name text not null,
    description text not null,
    year int not null,
    photo text not null,
    price text not null,
    video_url text not null,
    release timestamp not null 
);