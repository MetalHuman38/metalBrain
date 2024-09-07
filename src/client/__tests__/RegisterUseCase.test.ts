// ** Jest will automatically pick up this file and run the tests ** //
import { UserRepository } from "../services/react-query/userApiRepo/UserRepository";
import { AxiosConfig } from "../../client/axios/AxiosConfig";

jest.mock("../axios/AxiosConfig");

describe("UserRepository", () => {
  const userRepository = new UserRepository();

  it("should successfully register a user", async () => {
    const newUser = { email: "rest@example.com", password: "password" };
    const mockPost = AxiosConfig.post as jest.Mock;
    mockPost.mockResolvedValueOnce({
      data: newUser,
    });

    const result = await userRepository.registerUser({
      new_user: "test",
      username: "test",
      email: "rest@example.com",
      password: "password",
      created_at: new Date(),
    });
    expect(result).toEqual(newUser);
  });

  it("should throw an error if the email is already in use ", async () => {
    const newUser = { email: "test@example.com", password: "password" };
    const mockPost = AxiosConfig.post as jest.Mock;
    mockPost.mockRejectedValueOnce({
      data: newUser,
      response: { status: 409 },
    });

    expect.assertions(1);

    await userRepository
      .registerUser({
        new_user: "test",
        username: "test",
        email: "test@example.com",
        password: "password",
        created_at: new Date(),
      })
      .catch((error) => {
        expect(error.message).toBe(`Email ${newUser.email} is already in use.`);
      });
  });
});
