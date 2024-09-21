import express from "express";
import {
  RegisterUser,
  LoginUser,
  RefreshToken,
  LogoutUser,
  VerifyUser,
  GetCurrentUser,
  GetAllUsers,
  SearchUsers,
  GetAllUserCount,
} from "../../controller/user/authenticator.js";
import {
  LoginUserUseCase,
  RefreshTokenUseCase,
  RegisterUserUseCase,
  LogoutUserUseCase,
  VerifyUserUseCase,
  GetCurrentUserUseCase,
  GetAllUsersUseCase,
  SearchUsersUseCase,
  GetAllUsersCountUseCase,
} from "../../userrepo/userUseCases.js";
import { SequelizeUserRepo } from "../../userrepo/sequelizeUserRepo.js";
import { BcryptPasswordHandler } from "../../../services/bcryptPasswordHandler.js";
import { JwtTokenService } from "../../../services/jwtTokenService.js";
import {
  InternalServerError,
  UnauthorizedError,
} from "../../utils/app-errors.js";

const router = express.Router();

// ** Initialize dependencies ** //
const userRepository = new SequelizeUserRepo();
const passwordHasher = new BcryptPasswordHandler();
const jwtHandler = new JwtTokenService();

// ****************************************************************************************** //
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
const logoutUserUseCase = new LogoutUserUseCase(userRepository, jwtHandler);
// ** refresh token use case ** //
const refreshTokenUseCase = new RefreshTokenUseCase(userRepository, jwtHandler);
// ** verify user use case ** //
const verifyUserUseCase = new VerifyUserUseCase(userRepository, jwtHandler);

// ** get current user use case ** //
const getCurrentUserUseCase = new GetCurrentUserUseCase(userRepository);

// ** get all users use case ** //
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

// ** search users use case ** //
const searchUsersUseCase = new SearchUsersUseCase(userRepository);

// ** get all users count use case ** //
const getAllUsersCountUseCase = new GetAllUsersCountUseCase(userRepository);

// ****************************************************************************************** //
// ** controller instances ** //
const registerController = new RegisterUser(registerUserUseCase);
const loginController = new LoginUser(loginUserUseCase);
const refreshTokenController = new RefreshToken(refreshTokenUseCase);
const logoutController = new LogoutUser(logoutUserUseCase);
const getCurrentUserController = new GetCurrentUser(getCurrentUserUseCase);
const verifyUserController = new VerifyUser(verifyUserUseCase);
const getAllUsersController = new GetAllUsers(getAllUsersUseCase);
const searchUsersController = new SearchUsers(searchUsersUseCase);
const getAllUsersCountController = new GetAllUserCount(getAllUsersCountUseCase);

// ****************************************************************************************** //
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
  try {
    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error: any) {
    console.log(error);
  }
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
    });
  } catch (error: any) {
    console.log(error);
  }
});

// ** get current user route ** //
router.get("/currentUser", async (req, res) => {
  await getCurrentUserController.getCurrentUser(req, res);
  try {
    const id = parseInt(req.query.id as string, 10);
    const user = await getCurrentUserUseCase.GetCurrentUser(id);
    if (!user) {
      res.status(401).json({ message: "Unauthorized from the backend" });
      throw new InternalServerError();
    }
    res.status(200).json({
      message: "User fetched successfully",
      id: user.id,
      user,
    });
  } catch (error: any) {
    console.log(error);
  }
});

// ** get all users route ** //
router.get("/allUsers", async (req, res) => {
  await getAllUsersController.getAllUsers(req, res);
});

// ** search users route ** //
router.post("/searchUsers", async (req, res) => {
  await searchUsersController.searchUsers(req, res);
});

// ** get all users count route ** //
router.get("/allUsersCount", async (req, res) => {
  await getAllUsersCountController.getAllUserCount(req, res);
});

export default router;
