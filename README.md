# Getir Restful Api Challenge
Develop restful api to fetch records within a date range

## Requirements
* The code should be written in Node.js using express framework ✅
* The endpoint should just handle HTTP POST requests. ✅
* The application should be deployed on AWS or Heroku. You don’t need to use any API Gateway, Load Balancers or any other layer than the developed application. ✅
* The up to date repo should be publicly available in Github, Bitbucket or equivalent. ✅

## Deliverables
* Public repo URL: https://github.com/samsoft00/getir-restful-api-challenge.git
* The public endpoint URL (POST): https://tranquil-reaches-53695.herokuapp.com/v1/getir-records

## Local Setup
To setup on local machine, kindly run the following command.

- `git clone https://github.com/samsoft00/getir-restful-api-challenge.git getir-sam-task`
- `cd getir-sam-task`
- `npm i`
- `cp .env.example .env`
- `npm run start:dev`

Note: Before your run `npm run start:dev`, ensure you declare your environment variable in `.env` file.

```
PORT=8000 # port
NODE_ENV= # dev or production
MONGODB_URI = # getir-case-study MongoDb name
MONGODB_NAME = # getir-case-study MongoDb URL
```

## Test
```
npm run test
```
![Getir test](https://github.com/samsoft00/getir-restful-api-challenge/blob/main/img/Screenshot2021-01-18.png)