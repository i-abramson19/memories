# Memories Social Media Web App

## Introduction

Social media app that allows users to share memories. Built using MongoDB, Express.js, React.js, Redux, and Node.js (MERN stack).

This project was part of a [Youtube](https://www.youtube.com/playlist?list=PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu) tutorial.

### Development setup

* In the root directory, rename .env.example to .env and add your MongoDB CONNECTION_URL.

* In the client directory, rename .env.example to .env and add your REACT_APP_GOOGLE_CLIENT_ID.

* Install dependencies

```
# Backend dependencies
npm install

# Frontend dependencies
cd client
npm install
```

### Run development environment

In the project root directory

```
npm run dev
```

### Production setup

Setup repository

```
git init

git add .

git commit -m "initial commit"

git branch -M main
```

Create a new empty application on heroku and push code.

```
heroku create

git push heroku main:master
```

Set heroku environment variables

```
heroku config:set NODE_ENV=production

heroku config:set CONNECTION_URL=YOUR_MONGO_URL

heroku config:set REACT_APP_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID
```

Open application

```
heroku open
```

### Demo

https://ia-mern-memories.herokuapp.com