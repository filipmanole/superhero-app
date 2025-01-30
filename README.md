# The Superhero App

This is an application build using SST framework and it leverages AWS services.

## Backend

The API is built with NestJS framework and deployed in a Lambda function following the [official documentation](https://docs.nestjs.com/faq/serverless). It uses DynamoDB to store the items, with a TTL of 30 minutes.

## Frontend

The UI is build with React, Tailwind, JollyUI components and deployed in an S3 bucket with a CloudFront distribution.

# Start development

To work with this repo, you need to have a default AWS account set.

Install dependencies:

```sh
bun install
```

Start dev mode:

```sh
bun sst dev
```

Test the API:

```sh
bun run --filter @superhero/api test:e2e
```

All this app is one command away to deploy it:

```sh
bun sst deploy --stage $ENVIRONMENT
```

# You can collaborate

At this point the application requiers the API KEY of the backend to fetch superheroes and create them. It would be amazing to have an authentication system for that, and each user can have its own superheros.

We can use [OpenAuth.js](https://openauth.js.org/) to easily create an authentication server on a lambda function with SST.

Steps to follow:

1. Add a new infrastructure module and a new package called auth. This [example](https://github.com/openauthjs/openauth/tree/master/examples/issuer/lambda) can be followed to set the authentication server.
2. Use this [example](https://github.com/openauthjs/openauth/tree/master/examples/client/react) for react to integrate with the deployed auth server.
3. After a user can authenticate, its generated token needs to be sent instead the `x-api-key` in the client.
4. Server must be configured to validate the user token.
5. Redesign superhero entity to store superheroes per user. One possible approach would be to store the userID in the primary key, and in the global secondary id. This way each user will have its own superheroes.
6. Adjust endpoints to use the userID in the DynamoDB requests.

# If I had more time...

- Debug for class validation in NestJS. The global pipe is not working, resulting in all requests parameters are not validated.
  [Reference doc](https://docs.nestjs.com/techniques/validation)
- Add more e2e tests for parameters check, after validation is working

# API endpoints details

## GET /status

This should return 'ok' if server is working

### Example

```http
GET /status HTTP/1.1
Host: <host>
x-api-key: <api-key>
```

## POST /superheroes

Creates a superhero

### input JSON body parameters:

```json
{
  "name": "string",
  "superpower": "string",
  "humilityScore": "number"
}
```

### response:

```json
{
  "superheroId": "string",
  "name": "string",
  "superpower": "string",
  "humilityScore": "number",
  "createdAt": "string", // ISO Date
  "updatedAt": "string" //ISO Date
}
```

### example

```http
POST /superheroes HTTP/1.1
Host: <host>
x-api-key: <api-key>
Content-Type: application/json

{
    "name": "testname",
    "superpower": "superfast",
    "humilityScore": 8
}
```

## GET /superheroes

Paginated response to list superheroes

### input query params:

```json
{
  "limit": "string", // default 10 items
  "startKey": "string | undefined", // undefined - first page is fetched
  "ascending": "boolean" // sort by humilityScore
}
```

### response:

```json
{
  "nodes": [
    {
      "superheroId": "string",
      "name": "string",
      "superpower": "string",
      "humilityScore": "number",
      "createdAt": "string", // ISO Date
      "updatedAt": "string" //ISO Date
    }
  ],
  "lastKey": "string"
}
```

### example

```http
GET /superheroes?limit=10&ascending=true HTTP/1.1
Host: <host>
x-api-key: <api-key>
```
