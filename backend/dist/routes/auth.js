"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
const firebaseAdmin_1 = require("../db/firebaseAdmin");
exports.Router = express_1.default.Router();
// create a new user
exports.Router.post("/signup", async (req, res) => {
    const { email, password, displayName, photoURL } = req.body;
    // Build user payload and only include photoURL when provided
    const user = {
        email,
        password,
        emailVerified: false,
        displayName,
        disabled: false,
    };
    if (photoURL) {
        user.photoURL = photoURL;
    }
    firebaseAdmin_1.auth
        .createUser(user)
        .then((userRecord) => {
        // User created successfully
        res.status(200).json({
            message: "User created successfully",
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
                emailVerified: userRecord.emailVerified,
                displayName: userRecord.displayName,
                photoURL: userRecord.photoURL,
                disabled: userRecord.disabled,
            },
        });
    })
        .catch((error) => {
        res
            .status(500)
            .json({ message: "Error creating new user", error: error });
    });
});
// get a user
exports.Router.get("/users/:uid", async (req, res) => {
    const uid = req.params.uid;
    firebaseAdmin_1.auth
        .getUser(uid)
        .then((userRecord) => {
        // User found
        res.status(200).json({
            message: "Successfully fetched user data:",
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
                emailVerified: userRecord.emailVerified,
                displayName: userRecord.displayName,
                photoURL: userRecord.photoURL,
                disabled: userRecord.disabled,
            },
        });
    })
        .catch((error) => {
        console.log("Error fetching user data:", error);
    });
});
// get list of users
exports.Router.get("/users", async (req, res) => {
    firebaseAdmin_1.auth
        .listUsers()
        .then((listUsersResult) => {
        res.status(200).json({
            message: "Successfully fetched list of users",
            users: listUsersResult.users,
        });
    })
        .catch((error) => {
        console.log("Error fetching list of users:", error);
    });
});
//# sourceMappingURL=auth.js.map