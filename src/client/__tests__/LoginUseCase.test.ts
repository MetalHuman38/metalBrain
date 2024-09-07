import { UserRepository } from "../services/react-query/userApiRepo/UserRepository";
import { AxiosConfig } from "../../client/axios/AxiosConfig";

jest.mock("../axios/AxiosConfig");

describe("UserRepository - Login Use Case", () => {
  const userRepository = new UserRepository();

  it("should successfully log in a user", async () => {
    const loggedInUser = { email: "rest@example.com", token: "some-jwt-token" };
    const mockPost = AxiosConfig.post as jest.Mock;
    // Simulate a successful login response
    mockPost.mockResolvedValueOnce({
      data: loggedInUser,
    });

    const result = await userRepository.loginUser(
      "rest@example.com",
      "password"
    );

    // Expect the login to return user data (e.g., a JWT token)
    expect(result).toEqual(loggedInUser);
  });

  it("should throw an error if login credentials are invalid", async () => {
    const mockPost = AxiosConfig.post as jest.Mock;

    // Simulate a 401 Unauthorized response for invalid credentials
    mockPost.mockRejectedValueOnce({
      response: { status: 401 },
    });

    expect.assertions(1);

    // Try to login with invalid credentials
    await userRepository
      .loginUser("test@example.com", "wrong-password")
      .catch((error) => {
        // Expect an error message related to invalid credentials
        expect(error.message).toBe("Invalid email or password.");
      });
  });
});
