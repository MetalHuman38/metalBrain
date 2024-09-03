import express from "express";
import {
  RegisterUser,
  LoginUser,
  RefreshToken,
} from "../../controller/user/authenticator.js";
import {
  LoginUserUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
} from "../../userrepo/userUseCases.js";
import { SequelizeUserRepo } from "../../userrepo/sequelizeUserRepo.js";
import { BcryptPasswordHandler } from "../../../services/bcryptPasswordHandler.js";
import { JwtTokenService } from "../../../services/jwtTokenService.js";

const router = express.Router();

// ** Initialize dependencies ** //
const userRepository = new SequelizeUserRepo();
const passwordHasher = new BcryptPasswordHandler();
const jwtHandler = new JwtTokenService();

// ** use case instances ** //
const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  passwordHasher,
  jwtHandler,
);

// ** login user use case ** //
const loginUserUseCase = new LoginUserUseCase(
  userRepository,
  jwtHandler,
  passwordHasher,
);

// ** refresh token use case ** //
const refreshTokenUseCase = new RefreshTokenUseCase(userRepository, jwtHandler);

// ** controller instances ** //
const registerController = new RegisterUser(registerUserUseCase);
const loginController = new LoginUser(loginUserUseCase);
const refreshTokenController = new RefreshToken(refreshTokenUseCase);

console.log("Register Use cases:", registerUserUseCase);
console.log("Login Use cases:", loginUserUseCase);

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

export default router;
