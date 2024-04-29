# nestjs-basic-auth

This project is to example how basic autentication and a simple role-less authorization works using the enterprise-graded backend framework, Nest.js.

I'm using JWT to generate the access and refresh tokens. For the database side I've chosen MongoDB for it's simplicity and for faster development with being able to quickly define a schema and connect to the database and start working with it.

The approach implemented in this project is an access token is used to access the protected resources, whenever an access token is expired, the refresh token will be come in handy to refresh the access token. An access token expiration is 1 day from it's issue date, and a refresh token's expiration date is 180 days from issue date.

In order to keep the access token fresh, when ever a user is logged in, the tokens are checked and validated, and refreshed in database level, and then returned to the user as a JSON response and an http-cookie is set for both tokens.

The operation of accessing the refresh token endpoint to refresh the access token in my eyes, is the frontend's job, getting a 403 basically and pointing a post for the refresh endpoint, if it's a successful request then a retry will occure to the protected resource with the new access token.


> For any improvements suggestions please open an issue!