import express from "express";
import {
  RegisterUser,
  LoginUser,
  RefreshToken,
  LogoutUser,
  VerifyUser,
} from "../../controller/user/authenticator.js";
import {
  LoginUserUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
  LogoutUserUseCase,
  VerifyUserUseCase,
} from "../../userrepo/userUseCases.js";
import { SequelizeUserRepo } from "../../userrepo/sequelizeUserRepo.js";
import { BcryptPasswordHandler } from "../../../services/bcryptPasswordHandler.js";
import { JwtTokenService } from "../../../services/jwtTokenService.js";

const router = express.Router();

// ** Initialize dependencies ** //
const userRepository = new SequelizeUserRepo();
const passwordHasher = new BcryptPasswordHandler();
const jwtHandler = new JwtTokenService();

// ** register user use case ** //
const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  passwordHasher,
  jwtHandler
);

// ** login user use case ** //
const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  jwtHandler,
  passwordHasher
);
// ** logout user use case ** //
const logoutUserUseCase = new LogoutUserUseCase(userRepository);
// ** refresh token use case ** //
const refreshTokenUseCase = new RefreshTokenUseCase(userRepository, jwtHandler);
// ** verify user use case ** //
const verifyUserUseCase = new VerifyUserUseCase(userRepository, jwtHandler);

// ** controller instances ** //
const registerController = new RegisterUser(registerUserUseCase);
const loginController = new LoginUser(loginUserUseCase);
const refreshTokenController = new RefreshToken(refreshTokenUseCase);
const logoutController = new LogoutUser(logoutUserUseCase);
const verifyUserController = new VerifyUser(verifyUserUseCase);

console.log("Register Use cases:", registerUserUseCase);
console.log("Login Use cases:", loginUserUseCase);
console.log("Refresh Token Use cases:", refreshTokenUseCase);
console.log("Logout Use cases:", logoutUserUseCase);
console.log("Verify User Use cases:", verifyUserUseCase);

// ** user registration route ** //
router.post("/register", async (req, res) => {
  await registerController.registerUser(req, res);
});

// ** user login route ** //
router.post("/login", async (req, res) => {
  await loginController.loginUser(req, res);
});

// ** refresh token route ** //
router.post("/refresh-token", async (req, res) => {
  await refreshTokenController.refreshToken(req, res);
});

// ** logout user route ** //
router.post("/logout", async (req, res) => {
  await logoutController.logoutUser(req, res);
});

// ** verify user route ** //
router.get("/verify", async (req, res) => {
  await verifyUserController.verifyUser(req, res);
});

export default router;
