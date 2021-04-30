# To Do API

![GitHub](https://img.shields.io/github/license/michaelacook/to-do-api)
![GitHub package.json version](https://img.shields.io/github/package-json/v/michaelacook/to-do-api)
![GitHub last commit](https://img.shields.io/github/last-commit/michaelacook/to-do-api)

A REST API for a to do list application. The motivation for this project was practical - I need a to do app that I will actually use, so I decided to make one myself to get practice with database programming and writing server tests. A future project will create a React client to consume the API.

## Running Locally 

`git clone https://github.com/michaelacook/to-do-api.git`

`cd /path/to/project && npm install`

`npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all`

`npm start`

## Stack 
The API runs on Node.js and Express.js, and a PostgreSQL database. SQLite is used in development.

## About
At a high level, the application allows users to create categories, or folders, which contain lists. Lists contain list items. CRUD operations can be performed on categories, lists, and list items. It's pretty basic.

### Architecture

I have attempted to keep the organization of the codebase as simple as possible while also allowing for extensibility and modularity. The project uses a loose implementation of the MVC pattern. Models represent database tables, while services perform routine CRUD operations on models and return promises that resolve with the requested data or reject with an error. Actions perform routines using services. Controller callbacks are passed to route handlers. Middleware closures run on route handlers prior to controllers.

### Authentication and Authorization

The project uses the HTTP Basic Authentication protocol. Protected routes run authentication middleware to authenticate the client with the server, and send 401 Unauthorized responses when email and password are not present or incorrect. Most routes run authorization middleware that checks permissions and sends a 401 Unauthorized response if the client attempts to request a resource that does not belong to them. Authorization is not required where the resource is fetched using the client's id passed from authentication middleware to the controller.

### Testing

This project uses integration tests to test server responses rather than unit tests. I felt this was more appropriate given that all the business logic of the application involves services querying models, so unit tests would require significant mocking of models, and separate integration tests for endpoints. Passing integration tests would indicate that both services and the controllers calling them are functioning correctly, making unit tests unnecessary.

## Endpoints

#### `/users/:id`

- Method
  - GET
- Authentication
  - Basic Auth
- URL Params
  - Required
    - `id=[number]` user primary key
- Error Responses
  - 401 Unauthorized
    - Results from not sending Basic Auth credentials or attempting to access another user
  - 404 Not Found
    - Results from attempting to access a non-existent user
- Successful Response
  - `200 OK`
  - Content:
  ```
  {
    "id": int,
    "email": string",
    "password": string",
    "firstName": string",
    "lastName": string",
    "createdAt": string",
    "updatedAt": string"
  }
  ```

#### `/users`

- Method
  - POST
- Authentication
  - None
- Data Params
  - Required
    - `email=[string]`
    - `password=[string]`
  * Optional
    - `firstName=[string]`
    - `lastName=[string]`
- Error Responses
  - 400 Bad Request
    - Results from not sending the required data params
- Successful Response
  - `200 OK`
  * Content:
  ```
  {
    "id": int,
    "email": string",
    "password": string",
    "firstName": string",
    "lastName": string",
    "createdAt": string",
    "updatedAt": string"
  }
  ```

#### `/users/:id`

- Method
  - PUT
- Authentication
  - Basic Auth
- URL Params
  - Required
    - `id=[number]` user primary key
- Data Params
  - Any
- Error Responses
  - 401 Unauthorized
    - Results from not sending Basic Auth credentials
  - 404 Not Found
    - Results from attempting to update a non-existent user
- Successful Response
  - `200 OK`
  - Content:
  ```
  {
    "id": int,
    "email": string",
    "password": string",
    "firstName": string",
    "lastName": string",
    "createdAt": string",
    "updatedAt": string"
  }
  ```

#### `/users/:id`

- Method
  - DELETE
- Authentication
  - Basic Auth
- URL Params
  - Required
    - `id=[number]` user primary key
- Error Responses
  - 401 Unauthorized
    - Results from not sending Basic Auth credentials
  - 404 Not Found
    - Results from attempting to update a non-existent user
- Successful Response
  - `204 No Content`


#### `/categories`
- Method
  - GET
- Authentication
  - Basic Auth
- Error Responses
  - 401 Unauthorized
    - Results from not sending Basic Auth credentials
- Success Response
  - `200 OK` 
  - Content: 
  ```
  [
    {
      "id",
      "userId": int,
      "title": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "Lists": [
        {
          "id": int,
          "categoryId": int,
          "title": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "ListItems": [
            {
              "id": int,
              "listId": int,
              "content": "string",
              "comments": "string",
              "complete": boolean, 
              "createdAt": "string",
              "updatedAt": "string
            }
          ]
        }
      ],
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
  ```

#### `/categories/:id`
- Method
  - GET 
- Authentication 
  - Basic Auth 
- URL Params 
  - Required 
    - `id=[number]` category primary key
- Error Responses 
  - 401 Unauthorized 
    - Results from not sending Basic Auth credentials
    - Also results form requesting another user's data
  - 404 Not Found 
- Success Response
  - `200 OK` 
  - Content:
  ```
  {
    "id": int, 
    "userId": int, 
    "title": string, 
    "createdAt": string, 
    "updatedAt": string, 
    "Lists": array
  }
  ```

#### `/categories`
- Method 
  - POST 
- Authentication 
  - Basic Auth 
- Data Params 
  - Required 
    - `userId=[number]` - user primary key 
    - `title=[string]`
- Error Responses 
  - 401 Unauthorized 
    - Results from not sending Basic Auth credentials 
  - 400 Bad Request 
    - Results from not sending required data params 
- Success Response 
  - `201 Created` 
  - Content: 
  ```
  {
    "id": int, 
    "userId": int, 
    "title": string, 
    "createdAt": string, 
    "updatedAt": string
  }
  ```

#### `/categories/:id`
- Method 
  - PUT 
- Authentication 
  - Basic Auth
- URL Params 
  - Required 
    - `id=[number]` category primary key
- Data Params 
  - Required 
    - `title=[string]`
    - Currently only the title can be updated
- Error Responses 
  - 400 Bad Request 
    - Results from not sending a `title` value 
  - 401 Unauthorized 
    - Results from not sending Basic Auth credentials 
    - Also results from attempting to update another user's data 
  - 404 Not Found
- Success Response
  - `200 OK`
  - Content:
  ```
  {
    "id": int, 
    "userId": int, 
    "title": string, 
    "createdAt": string, 
    "updatedAt": string, 
    "Lists": array
  }
  ```

#### `/categories/:id`
- Method 
  - DELETE 
- Authentication 
  - Basic Auth 
- URL Params 
  - Required 
    - `id=[number]` - category primary key 
- Error Responses 
  - 401 Unauthorized 
    - Results from not sending Basic Auth credentials 
    - Also results from attempting to delete another user's data 
  - 404 Not Found 
- Success Response 
  - `204 No Content`


#### `/lists/:id`
- Method 
  - GET 
- Authentication 
  - Basic Auth 
- URL Params 
  - Required 
    - `id=[number]` list primary key 
- Error Responses 
  - 401 Unauthorized 
    - Results from not sending Basic Auth credentials 
    - Also results from attempting to access another user's data 
  - 404 Not Found 
- Success Response 
  - `200 OK`
  - Content 
  ``` 
  {
    "id": int, 
    "categoryId": int,
    "title": string, 
    "createdAt": string, 
    "updatedAt": string,
    "ListItems": array
  }
  ```

#### `/lists`
- Method 
  - POST 
- Authentication 
  - Basic Auth 
- Data Params 
  - Required 
    - `categoryId=[number]` associated category
    - `title=[string]`
- Error Responses 
  - 400 Bad Request
    - Results from not sending required data params 
  - 401 Unauthorized 
    - Results from not sending Basic Auth credentials 
    - Also results from attempting to access another user's data 
- Success Response 
  - `201 Created` 
  - Content: 
  ```
  {
    "id": int, 
    "categoryId": int,
    "title": string, 
    "createdAt": string, 
    "updatedAt": string
  }
  ```

#### `/lists/:id`
- Method 
  - PUT 
- Authentication 
  - Basic Auth 
- URL Params 
  - Required 
    - `id=[number]` list primary key
- Data Params 
  - Required 
    - `title=[string]`
    - Currently only list title can be updated 
- Error Responses 
  - 400 Bad Request 
    - Results from not sending required data params 
    - 401 Unauthorized 
      - Results from not sending Basic Auth credentials 
      - Also results from attempting to update another user's data 
- Success Response 
  - `200 OK` 
  - Content: 
  ``` 
  {
    "id": int, 
    "categoryId": int,
    "title": string, 
    "createdAt": string, 
    "updatedAt": string,
    "ListItems": array
  }
  ```

#### `/lists/:id`
- Method 
  - DELETE
- Authentication 
  - Basic Auth 
- URL Params 
  - Required 
    - `id=[number]` list primary key
- Error Responses
  - 401 Unauthorized 
    - Results from not sending Basic Auth credentials 
    - Also results from attempting to update another user's data 
  - 404 Not Found 
- Success Response 
  - `204 No Content`


#### `/list-items/:id`
- Method 
  - GET 
- Authentication 
  - Basic Auth 
- URL Params 
  - Required 
    - `id=[number]` list item primary key
- Error Responses 
  - 401 Unauthorized 
    - Results from not sending Basic Auth credential s
    - Also results from attempting to access another user's data 
  - 404 Not Foun d
- Success Response 
  - `200 OK` 
  - Content: 
  ```
  {
    "id": int, 
    "listId": int,
    "content": string, 
    "comments": string,
    "complete": bool,
    "createdAt": string,
    "updatedAt": string
  }
  ```

#### `/list-items`
- Method 
  - POST 
- Authentication 
  - Basic Auth 
- Data Params 
  - Required 
    - `listId=[number]` primary key for associated list 
    - `content=[string]` to-do content
  - Optional 
    - `comments=[string]`
    - `complete=[boolean]`
- Error Responses 
  - 400 Bad Request 
    - Results from not sending the required data params 
  - 401 Unauthorized 
    - Results from not sending Basic Auth credentials 
- Success Response 
  - `201 Created`
  - Content: 
  ```
  {
    "id": int, 
    "listId": int,
    "content": string, 
    "comments": string,
    "complete": bool,
    "createdAt": string,
    "updatedAt": string
  }
  ```

#### `/list-items/:id`
- Method 
  - PUT 
- Authentication 
  - Basic Auth 
- URL Params 
  - Required
    - `id=[number]` list item primary key
- Data Params 
  - Required 
    - Any
    - Sending a PUT request with no data params results in a 400 Bad Request
- Error Responses 
  - 400 Bad Request 
  - 401 Unauthorized 
    - Results from not sending Basic Auth credentials 
    - Also results from attempting to update another user's data 
  - 404 Not Found 
- Success Response 
  - `200 OK` 
  - Content:
  ```
  {
    "id": int, 
    "listId": int,
    "content": string, 
    "comments": string,
    "complete": bool,
    "createdAt": string,
    "updatedAt": string
  }
  ```

#### `/list-items/:id`
- Method 
  - DELETE 
- Authentication 
  - Basic Auth 
- URL Params 
  - Required 
    - `id=[number]` list item primary key
- Error Responses 
  - 401 Unauthorized
    - Results from not sending Basic Auth credentials 
    - Also results from attempting to delete another user's data 
  - 404 Not Found 
- Success Response 
  - `204 No Content`

## License

MIT
