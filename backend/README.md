# SERVER (firebase DB)

```shell
Server:

localhost:8000
```

## Endpoints

### FIRESTORE (json)

#### CALENDARS

- GET all calendars from the database: `/firestore/calendars` ✅

- GET all calendars for by UID: `/firestore/calendars/user` ✅

- GET calendar by id: `/firestore/calendars/:calendarId`✅

- POST (add) calendar: `/firestore/calendars` ✅

This saves to: 'all calendars' / { uid } / 'user calendars' / { calendar id }

- PUT (update) calendar: `/firestore/calendars/:calendarId`

- DELETE calendar: `/firestore/calendars/:calendarId`

### STORAGE (image/sound files)

#### ALL

- GET list of all files (returns a namelist): `/storage/files/`

#### IMAGES

- GET image by name: `/storage/images/:imageName`

- POST (add) image: `/storage/images/` ✅

- DELETE: `/storage/images/:imageName`

#### SOUNDS - MUSIC

- GET music by name: `/storage/sounds/music/:musicName`

- POST (add) music: `/storage/sounds/music` ✅

- DELETE: `/storage/sounds/music/:musicName`

#### SOUNDS - SOUND-FX

- GET soundFx by name: `/storage/sounds/soundFx/:soundFxName`

- POST (add) soundFx: `/storage/sounds/soundFx` ✅

- DELETE: `/storage/sounds/soundFx/:soundFxName`

### AUTH

- POST (create a user): `/auth/signup` ✅

  - name
  - email
  - password

- GET user data: `/auth/users/:uid`
