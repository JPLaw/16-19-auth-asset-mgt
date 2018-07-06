[![Build Status](https://travis-ci.org/JPLaw/16-19-auth-asset-mgt.svg?branch=master)](https://travis-ci.org/JPLaw/16-19-auth-asset-mgt) Lab 17: Bearer Authorization
======

## Submission Instructions
* Continue from lab 16
* Submit on canvas a question and observation, how long you spent, and a link to your pull request

## Feature Tasks  
### Basic Auth Middleware
Create middleware for parsing a Basic Authentication header, it should add an Account to the request object. 

### Bearer Auth middleware 
Create middleware for parsing a Bearer Authorization header, it should add an Account to the request object.

### Access controlled resource 
Create a model with at least four properties that belongs to an account. The model should require an account id associated to an account.

### Server Endpoints
* `GET /login` (Auth Route)
  * Create a login route that uses the basic authentication middleware to log in a user.
* `POST /<resource-name>` 
  * pass a bearer authentication token in the request to authorize the creation of the resource
  * pass data as stringifed JSON in the body of a **POST** request to create a new resource
  * on success respond with a 200 status code and an authentication token
  * on failure due to a bad request send a 400 status code
  * on failure due to bad token or lack of token respond with a 401 status code
* `GET /<resource-name>/:id` 
  * pass a bearer authentication token in the request to authorize the creation of the resource
  * on success respond with a 200 status code and a resource
  * on failure due to a bad id send a 404 status code
  * on failure due to bad token or lack of token respond with a 401 status code

## Tests
* Write 200, 400, and 401 OR 404 tests for `/login` (Auth router)
* Write 200, 400, and 401 OR 404 tests for `POST /<resource-name>`
* Write 200, 400, and 401 OR 404 tests for `GET /<resource-name>/:id`

## Documentation
In the README.md write documention for starting your server and making requests to each endpoint it provides. The documentation should describe how the server would respond to valid and invalid requests.

## Stretch Goal
Refactor the error-middleware to include JsonWebToken errors and remove the need for the extra jsonWebToken.verify catch in lecture code
