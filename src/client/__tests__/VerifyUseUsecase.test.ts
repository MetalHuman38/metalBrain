import { UserRepository } from "../services/react-query/userApiRepo/UserRepository";
import { AxiosConfig } from "../../client/axios/AxiosConfig";

jest.mock("../axios/AxiosConfig");

describe("UserRepository - Verify User Use Case", () => {
  const userRepository = new UserRepository();

  it("should successfully verify a user", async () => {
    const verifyUser = { id: 1 };
    const mockPost = AxiosConfig.get as jest.Mock;
    // Simulate a successful login response
    mockPost.mockResolvedValueOnce({
      data: verifyUser,
    });

    const result = await userRepository.verifyUser("1");

    // Expect the login to return user data (e.g., a JWT token)
    expect(result).toEqual(verifyUser);
    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPost).toHaveBeenCalledWith("/verify", {
      params: { id: "1" },
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  });

  it("should throw an error if unable to verify user", async () => {
    const mockPost = AxiosConfig.post as jest.Mock;

    // Simulate a 401 Unauthorized response for invalid credentials
    mockPost.mockRejectedValueOnce({
      response: { status: 500 },
    });

    expect.assertions(1);
    await userRepository.verifyUser("").catch((error) => {
      expect(error.message).toBe("Unable to verify user! Something went wrong");
    });
  });
});
