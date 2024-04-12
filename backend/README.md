# SERVER (firebase DB)

```shell
Server:

localhost:8000
```

## Endpoints

### FIRESTORE (json)

#### CALENDARS

- GET all calendars: `/firestore/calendars`

- GET calendar by id: `/firestore/calendars/:uid`

- POST (add) calendar: `/firestore/calendars`

- PUT (update) calendar: `/firestore/calendars/:uid`

- DELETE calendar: `/firestore/calendars/:uid`

### STORAGE (image/sound files)

#### ALL

- GET list of all files (returns a namelist): `/storage/files/`

#### IMAGES

- GET image by name: `/storage/images/:imageName`

- POST (add) image: `/storage/images/`

- DELETE: `/storage/images/:imageName`

#### SOUNDS - MUSIC

- GET music by name: `/storage/sounds/music/:musicName`

- POST (add) music: `/storage/sounds/music`

- DELETE: `/storage/sounds/music/:musicName`

#### SOUNDS - SOUND-FX

- GET soundFx by name: `/storage/sounds/soundfx/:soundFxName`

- POST (add) soundFx: `/storage/sounds/soundfx`

- DELETE: `/storage/sounds/soundfx/:soundFxName`

### AUTH

- POST (create a user): `/auth/signup`

  - email
  - password

- GET user data: `/auth/users/:uid`
