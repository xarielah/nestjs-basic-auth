# nestjs-basic-auth

This project is to example how basic autentication and a simple role-less authorization works using the enterprise-graded backend framework, Nest.js.

### Tech Stack

1. Utilizing the usage of JSON Web Tokens to generate the access and refresh tokens and encoding within them a useful payload.
2. Database used for this project is MongoDB. I picked this one for it's simplicity and ability to quickly define a schema, export a model and connect to the database to start working with it.
3. Nest.js for it's modularity, and many many out-of-the-box tools offered, as well as writing in TypeScript.

### Approach

The approach implemented in this project is an access token is used to access the protected resources, whenever an access token is expired, the refresh token will be come in handy to refresh the access token. An access token expiration is 1 day from it's issue date, and a refresh token's expiration date is 180 days from issue date.

#### Order of things

In order to keep the access token fresh, when ever a user is logged in, the tokens are checked and validated, and refreshed in database level, and then returned to the user as a JSON response and an http-cookie is set for both tokens.

#### Continuesly refreshing the access token

The operation of accessing the refresh token endpoint to refresh the access token in my eyes is the frontend's responsibility. for setting the correct interceptors when getting a 403, reaching to the refresh endpoint and retry the protected resource if token was refreshed.

### How to test this project?

#### Environment Variables
Firstly set the project's ```.env``` file. Then, set a ```MONGO_URI``` and ```JWT_SECRET``` values, that's it.
after running locally you can test the server on port 3000, using Postman.

#### Register

> POST Endpoint: /auth/register

Expected body of:
```
username: string between x and y.
password: string between x and y.
email: string formatted as <email prefix>@<email host>
```

For successful operations, the http status will be ```201 Created```, if user exists, or bad input inserted the response will be ```400 Bad Request```, for any other issue, expected status code will be ```Internal Server Error 500```.

#### Login

> POST Endpoint: /auth/login

Expected body of:
```
username: string.
password: string.
```

For successful operations, the http status will be ```200 OK```, if user credentials are bad, or bad input inserted the response will be ```400 Bad Request```, for any other issue, expected status code will be ```Internal Server Error 500```.

#### Logout

> DELETE Endpoint: /auth/logout

For successful operation, response expected is ```200 OK```, no bad request for this one, only ```Internal Server Error 500``` if some server-side or database issue occured.

#### Refresh

> POST Endpoint: /auth/refresh

For successful operations, the http status will be ```200 OK```, if user token is bad ```401 Unauthorized``` will be returned with a new http-cookie set for the access token. For any other issue, expected status code will be ```Internal Server Error 500```.

> For any improvements suggestions please open an issue!