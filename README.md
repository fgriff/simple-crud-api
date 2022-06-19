# simple-crud-api

## Start the app
1. git clone
2. cd simple-crud-api
3. npm i
4. git checkout develop
5. `npm run start:dev` старт development mode  
   `npm run start:prod` старт production mode  
   `npm run test` запуск тестов  
   `npm run start:multi` запуск кластера  

## Endpoints
`GET` `localhost:5000/api/users` - получить всех пользователей (пустой массив, если их нет)  
`GET` `localhost:5000/api/users/CORRECT_ID` - получить пользователя по id  
`POST` `localhost:5000/api/users` - создать нового пользователя  
`PUT` `localhost:5000/api/users/CORRECT_ID` - обновить существующего пользователя по id  
`DELETE` `localhost:5000/api/users/CORRECT_ID` - удалить пользователя по id (не возвращается тело ответа)  

### Перед запуском тестов необходимо завершить предыдущий процесс (start:dev, start:prod), т.к., иначе, порт будет занят
