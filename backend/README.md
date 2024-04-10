# Backend

```shell
server:

`localhost:8000`
```

## Endpoints

### FIRESTORE (calendars json)

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

### STORAGE (image/sound files)

#### ALL

- GET list of all files (returns a namelist)

`/storage/files/`

#### IMAGES

- GET image by name

`/storage/images/:imageName`

- GET all images

`/storage/images/`

- POST (add) image

`/storage/images/`

#### SOUNDS - MUSIC

- GET music by name

`/storage/sounds/music/:musicName`

- GET all music

`/storage/sounds/music`

- POST (add) music

`/storage/sounds/music`

#### SOUNDS - SOUND-FX

- GET soundFx by name

`/storage/sounds/soundfx/:soundFxName`

- GET all soundFx

`/storage/sounds/soundfx`

- POST (add) soundFx

`/storage/sounds/soundfx`

### AUTH

- POST (create a user)
  - email
  - password

`/auth/signup`

- GET user data

`/auth/users/:uid`
