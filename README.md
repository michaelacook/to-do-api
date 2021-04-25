# To Do API

![GitHub](https://img.shields.io/github/license/michaelacook/to-do-api)
![GitHub package.json version](https://img.shields.io/github/package-json/v/michaelacook/to-do-api)
![GitHub last commit](https://img.shields.io/github/last-commit/michaelacook/to-do-api)

A REST API for a to do list application. The motivation for this project was practical - I need a to do app that I will actually use, so I decided to make one myself to get practice with database programming and writing server tests. A future project will create a React client to consume the API.

## Technologies

- Node
- Express
- Sequelize
- PostgreSQL
- SuperTest

## Architecture 
I have attempted to keep the organization of the codebase as simple as possible while also allowing for extensibility and modularity. The project uses a loose implementation of the MVC pattern. Models represent database tables, while services perform routine CRUD operations on models and return promises that resolve with the requested data or reject with an error. Actions perform routines using services. Controller callbacks are passed to route handlers. Middleware closures run on route handlers prior to controllers.

## Authentication and Authorization 
The project uses the HTTP Basic Authentication protocol. Protected routes run authentication middleware to authenticate the client with the server, and send 401 Unauthorized responses when email and password are not present or incorrect. Most routes run authorization middleware that checks permissions and sends a 401 Unauthorized response if the client attempts to request a resource that does not belong to them. Authorization is not required for POST requests and other requests where the resource is fetched using the client's id passed from authentication middleware to the controller.

## Testing 
This project uses integration tests to test server responses rather than unit tests. I felt this was more appropriate given that all the business logic of the application involves services querying models, so unit tests would require significant mocking of models, and separate integration tests for endpoints. Passing integration tests would indicate that both services and the controllers calling them are functioning correctly, making unit tests unnecessary.

## License

MIT

## Endpoints
