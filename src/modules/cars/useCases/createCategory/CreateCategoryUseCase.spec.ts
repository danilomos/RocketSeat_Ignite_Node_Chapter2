import { AppError } from "@errors/AppError";
import { CategoryRepositoyInMemory } from "@modules/cars/repositories/in-memory/CreateRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoryRepositoyInMemory: CategoryRepositoyInMemory;

describe("Create Category", () => {
    beforeEach(() => {
        categoryRepositoyInMemory = new CategoryRepositoyInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoryRepositoyInMemory,
        );
    });

    it("should be able to create a new category", async () => {
        const category = {
            name: "Catregory Teste",
            description: "Category description Test",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoryRepositoyInMemory.findByName(
            category.name,
        );

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new category with name exists", async () => {
        expect(async () => {
            const category = {
                name: "Catregory Teste",
                description: "Category description Test",
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
