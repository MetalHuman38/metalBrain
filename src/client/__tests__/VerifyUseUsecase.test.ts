import { UserRepository } from "../services/react-query/userApiRepo/UserRepository";
import { AxiosConfig } from "../../client/axios/AxiosConfig";

jest.mock("../axios/AxiosConfig");

describe("UserRepository - Login Use Case", () => {
  const userRepository = new UserRepository();

  it("should successfully verify in a user", async () => {
    const verifyUser = { id: 1, role: "superadmin", token: "some-jwt-token" };
    const mockPost = AxiosConfig.post as jest.Mock;
    // Simulate a successful login response
    mockPost.mockResolvedValueOnce({
      data: verifyUser,
    });

    const result = await userRepository.verifyUser("some-jwt-token");

    // Expect the login to return user data (e.g., a JWT token)
    expect(result).toEqual(verifyUser);
    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPost).toHaveBeenCalledWith("/verify", {
      token: "some-jwt-token",
    });
  });

  it("should throw an error if unable to verify user", async () => {
    const mockPost = AxiosConfig.post as jest.Mock;

    // Simulate a 401 Unauthorized response for invalid credentials
    mockPost.mockRejectedValueOnce({
      response: { status: 500 },
    });

    expect.assertions(2);

    // Try to login with invalid credentials
    await userRepository.verifyUser("test@example.com").catch((error) => {
      // Expect an error message related to invalid credentials
      expect(error.message).toBe("Unable to verify user! Something went wrong");
      expect(mockPost).toHaveBeenCalledWith("/verify", {
        token: "some-jwt-token",
      });
    });
  });
});
