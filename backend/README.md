# SERVER (firebase DB)

```shell
Server:

localhost:8000
```

## Endpoints

### FIRESTORE (json)

#### CALENDARS

- GET all calendars in database: `/firestore/calendars` ✅

- GET all calendars by uid: `/firestore/calendars/user` ✅

- GET calendar by id: `/firestore/calendars/:calendarId` ✅

- POST (add) calendar: `/firestore/calendars` ✅

This saves to: 'all calendars' / { uid } / 'user calendars' / { calendar id }

- DELETE calendar by id: `/firestore/calendars/:calendarId` ✅

- PUT (update) calendar: `/firestore/calendars/:calendarId` - extra feature

### STORAGE (image/sound files)

#### ALL

- GET a list of all the files (returns a namelist): `/storage/files/` ✅

- GET a list of all the user's files by uid: `/storage/files/:uid` ✅

#### IMAGES

##### Profile picture

- GET profile picture by name: `/storage/profile_pictures/:profile_picture` ✅

- POST (add) profile picture: `/storage/profile_pictures/` ✅

- DELETE: `/storage/profile_pictures/:profile_picture` ✅

##### Other images

- GET image by name: `/storage/images/:imageName` ✅

- POST (add) image: `/storage/images/` ✅

- DELETE: `/storage/images/:imageName` ✅

#### SOUNDS - MUSIC

- GET music by name: `/storage/sounds/music/:musicName` ✅

- POST (add) music: `/storage/sounds/music` ✅

- DELETE: `/storage/sounds/music/:musicName` ✅

#### SOUNDS - SOUND-FX

- GET soundFx by name: `/storage/sounds/soundFx/:soundFxName` ✅

- POST (add) soundFx: `/storage/sounds/soundFx` ✅

- DELETE: `/storage/sounds/soundFx/:soundFxName` ✅

### AUTH

- POST (create a user): `/auth/signup` ✅

  - name
  - email
  - password

- GET user data: `/auth/users/:uid` ✅
