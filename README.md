project-root/
│
├── backend/
│ ├── db/ # Database related files
│ ├── middleware/ # Middleware functions
│ ├── routes/ # Express routes
│ ├── serviceAccountKey.json # Firebase service account key
│ ├── index.ts # Main backend file
│ ├── nodemon.json # Nodemon configuration
│ ├── package-lock.json # npm package lock file
│ ├── package.json # npm package file
│ └── tsconfig.json # TypeScript configuration
│
├── dist/ # Production build files
│
├── frontend/  
│ ├── public/ # Public assets
│ ├── src/ # Source files
│ │ ├── assets/ # Images, icons, etc.
│ │ ├── auth/ # Authentication related files
│ │ ├── components/ # Reusable React components
│ │ ├── hooks/ # Custom React hooks
│ │ ├── routes/ # React Router routes
│ │ ├── store/ # Redux store configuration
│ │ ├── App.tsx # Main App component
│ │ ├── index.tsx # Entry point for React
│ │ └── ... # Other source files
│ ├── package-lock.json # npm package lock file
│ ├── package.json # npm package file
│ ├── README.md # Frontend specific README
│ ├── tsconfig.json # TypeScript configuration
│ └── vite.config.ts # Vite configuration
│
├── uploads/ # Uploaded files
│
├── README.md # Project README
├── tsconfig.json # TypeScript configuration
└── vite-env.d.ts # Vite environment types

**Project YODA: Your Own Digital Advent Calendar**

---

### Project Description

Project YODA is a web application designed to allow users to create and share personalized digital advent calendars. Users can register, design their calendars, and share them with friends and family on social media platforms. This README provides guidance on navigating the project's folder structure and understanding its components.

---

### Folder Structure

```
project-root/
│
├── backend/
│   ├── db/                  # Database related files
│   ├── middleware/          # Middleware functions
│   ├── routes/              # Express routes
│   ├── serviceAccountKey.json  # Firebase service account key
│   ├── index.ts             # Main backend file
│   ├── nodemon.json         # Nodemon configuration
│   ├── package-lock.json    # npm package lock file
│   ├── package.json         # npm package file
│   └── tsconfig.json        # TypeScript configuration
│
├── dist/                     # Production build files
│
├── frontend/
│   ├── public/              # Public assets
│   ├── src/                 # Source files
│   │   ├── assets/          # Images, icons, etc.
│   │   ├── auth/            # Authentication related files
│   │   ├── components/      # Reusable React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── routes/          # React Router routes
│   │   ├── store/           # Redux store configuration
│   │   ├── App.tsx          # Main App component
│   │   ├── index.tsx        # Entry point for React
│   │   └── ...               # Other source files
│   ├── package-lock.json    # npm package lock file
│   ├── package.json         # npm package file
│   ├── README.md            # Frontend specific README
│   ├── tsconfig.json        # TypeScript configuration
│   └── vite.config.ts       # Vite configuration
│
├── uploads/                  # Uploaded files
│
├── README.md                 # Project README
├── tsconfig.json             # TypeScript configuration
└── vite-env.d.ts             # Vite environment types
```

---

### Backend

- **db/**: Contains database-related files.
- **middleware/**: Middleware functions for Express.
- **routes/**: Express routes for handling API requests.
- **serviceAccountKey.json**: Firebase service account key for authentication.
- **index.ts**: Main backend file.
- **nodemon.json**: Nodemon configuration for development.
- **package-lock.json, package.json**: npm package files.
- **tsconfig.json**: TypeScript configuration for backend.

### Frontend

- **public/**: Public assets like images.
- **src/**: Source files for React frontend.
  - **assets/**: Images, icons, etc.
  - **auth/**: Authentication related files.
  - **components/**: Reusable React components.
  - **hooks/**: Custom React hooks.
  - **routes/**: React Router routes.
  - **store/**: Redux store configuration.
  - **App.tsx**: Main App component.
  - **index.tsx**: Entry point for React.
  - And other source files.
- **package-lock.json, package.json**: npm package files.
- **README.md**: Frontend-specific README.
- **tsconfig.json**: TypeScript configuration for frontend.
- **vite.config.ts**: Vite configuration for development.

---

### Usage

1. **Clone the repository**: `git clone <repository-url>`
2. **Install dependencies**:
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
3. **Start development servers**:
   - Backend: `cd backend && npm run dev`
   - Frontend: `cd frontend && npm run dev`
4. **Access the application**:
   - Frontend: Open your browser and go to `http://localhost:3000`

---

### Additional Information

- Ensure you have Node.js and npm installed in your system.
- Backend runs on port `5000` by default, frontend on port `3000`.
- For production deployment, build the frontend using `npm run build` and deploy it along with the backend.
- Make sure to set up environment variables required for Firebase authentication and other configurations.

---

Feel free to explore the folders and files to understand more about the project structure and functionality!
