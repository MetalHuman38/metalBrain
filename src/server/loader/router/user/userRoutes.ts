import express from "express";
import {
  RegisterUser,
  LoginUser,
  RefreshToken,
  LogoutUser,
  VerifyUser,
  GetCurrentUser,
} from "../../controller/user/authenticator.js";
import {
  LoginUserUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
  LogoutUserUseCase,
  VerifyUserUseCase,
  GetCurrentUserUseCase,
} from "../../userrepo/userUseCases.js";
import { SequelizeUserRepo } from "../../userrepo/sequelizeUserRepo.js";
import { BcryptPasswordHandler } from "../../../services/bcryptPasswordHandler.js";
import { JwtTokenService } from "../../../services/jwtTokenService.js";
import { UnauthorizedError } from "../../utils/app-errors.js";

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

// ** get current user use case ** //
const getCurrentUserUseCase = new GetCurrentUserUseCase(userRepository);

// ** controller instances ** //
const registerController = new RegisterUser(registerUserUseCase);
const loginController = new LoginUser(loginUserUseCase);
const refreshTokenController = new RefreshToken(refreshTokenUseCase);
const logoutController = new LogoutUser(logoutUserUseCase);
const getCurrentUserController = new GetCurrentUser(
  getCurrentUserUseCase,
  verifyUserUseCase
);
const verifyUserController = new VerifyUser(verifyUserUseCase);

// ** user registration route ** //
router.post("/register", async (req, res) => {
  await registerController.registerUser(req, res);
});

// ** user login route ** //
router.post("/login", async (req, res) => {
  await loginController.loginUser(req, res);
});

// ** refresh token route ** //
router.get("/refreshToken", async (req, res) => {
  await refreshTokenController.refreshToken(req, res);
});

// ** logout user route ** //
router.post("/logout", async (req, res) => {
  await logoutController.logoutUser(req, res);
});

// ** verify user route ** //
router.get("/verify", async (req, res) => {
  await verifyUserController.verifyUser(req, res);
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "No token found" });
    }
    const decodedToken = await verifyUserUseCase.VerifyUser(token);
    const id = decodedToken.id;
    const role = decodedToken.role;
    const user = await getCurrentUserUseCase.GetCurrentUser(decodedToken.id);
    console.log("User from verify user route", user);
    if (!id || !role) {
      throw new UnauthorizedError();
      return;
    }
    res.status(200).json({
      message: "User verified successfully from verified Route",
      user: user,
    });
  } catch (error: any) {
    console.log(error);
  }
});

// ** get current user route ** //
router.get("/currentUser", async (req, res) => {
  await getCurrentUserController.getCurrentUser(req, res);
  try {
    const refreshtoken = req.cookies.refreshtoken;
    if (!refreshtoken) {
      res.status(401).json({ message: "No token found" });
    }
    const decodedToken = await verifyUserUseCase.VerifyUser(refreshtoken);
    const id = decodedToken.id;
    const role = decodedToken.role;
    const user = await getCurrentUserUseCase.GetCurrentUser(decodedToken.id);
    console.log("User from get current user route", user);
    if (!id || !role) {
      res.status(401).json({ message: "Unauthorized from the backend" });
      return;
    }

    res.status(200).json({
      message: "User verified successfully from Route controller",
      id: id,
      role: role,
      user: user,
    });
  } catch (error: any) {
    console.log(error);
  }
});

export default router;
