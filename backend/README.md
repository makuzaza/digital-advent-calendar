# Backend

```shell
server:

`localhost:8000`
```

## Endpoints

### Firestore

- GET all calendars:

`/caas/calendars`

- GET calendar by id:

`/caas/calendars/:uid`

- POST (add) calendar

`/caas/calendars`

- PUT (update) calendar

`/caas/calendars/:uid`

- DELETE calendar

`/caas/calendars/:uid`

### Auth

- Create a user
  - email
  - password

`/auth/signup`

- Get user data

`/auth/users/:uid`
