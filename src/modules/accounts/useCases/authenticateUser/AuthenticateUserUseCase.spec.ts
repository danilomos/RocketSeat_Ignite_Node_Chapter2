import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersReposityInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticationUserUseCase } from "./AuthenticationUserUseCase";

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticationUserUseCase;
let usersReposityInMemory: UsersReposityInMemory;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersReposityInMemory = new UsersReposityInMemory();
        createUserUseCase = new CreateUserUseCase(usersReposityInMemory);
        authenticateUserUseCase = new AuthenticationUserUseCase(
            usersReposityInMemory,
        );
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000001",
            email: "user@test.com",
            password: "1234",
            name: "User Test",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorret password", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "000002",
                email: "user@testerror.com",
                password: "1234",
                name: "User Test Error",
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: "user@test1.com",
                password: "incorrectPassword",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
