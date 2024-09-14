import axios from "axios";
import { UserRepository } from "../services/react-query/userApiRepo/UserRepository";
import { AxiosConfig, baseURL } from "../../client/axios/AxiosConfig";

jest.mock("../../client/axios/AxiosConfig");
jest.mock("axios", () => {
  const axiosInstance = {
    post: jest.fn(),
    defaults: {
      headers: {
        common: {},
      },
    },
  };
  return {
    create: jest.fn(() => axiosInstance),
    isAxiosError: jest.fn(),
  };
});

describe("UserRepository - Login Use Case", () => {
  const userRepository = new UserRepository();
  beforeEach(() => {
    Object.defineProperty(window, "sessionStorage", {
      value: {
        getItem: jest.fn(() => "token"),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully log in a user", async () => {
    const loggedInUser = {
      email: "rest@example.com",
      password: "password",
      token: "token",
      refreshtoken: "refreshtoken",
    };
    const mockPost = AxiosConfig.post as jest.Mock;
    mockPost.mockResolvedValueOnce({
      data: loggedInUser,
    });
    // Mock a successful login response

    const result = await userRepository.loginUser(
      "rest@example.com",
      "password"
    );

    expect(AxiosConfig.post).toHaveBeenCalledWith(`${baseURL}`);

    // Expect session storage to be updated with the new token
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      "token",
      loggedInUser.token
    );
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      "refreshtoken",
      loggedInUser.refreshtoken
    );

    // Ensure the login returns user data
    expect(result).toEqual(loggedInUser);

    // Verify the post request was made with the correct parameters
    expect(AxiosConfig.post).toHaveBeenCalledWith(
      "/login",
      { email: "rest@example.com", password: "password" },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  });

  it("should throw an error if login credentials are invalid", async () => {
    const mockIsAxiosError = axios.isAxiosError as unknown as jest.Mock;

    // Mock a 401 Unauthorized response for invalid credentials
    (AxiosConfig.post as jest.Mock).mockRejectedValue({
      response: { status: 401 },
    });

    // Simulate an Axios error
    mockIsAxiosError.mockReturnValue(true);

    expect.assertions(1);

    // Try to log in with invalid credentials
    await userRepository
      .loginUser("test@example.com", "wrong-password")
      .catch((error) => {
        expect(AxiosConfig.post).toHaveBeenCalledWith(`${baseURL}`);
        // Expect an error message related to invalid credentials
        expect(error.message).toBe("Unable to login user");
      });
  });
});
