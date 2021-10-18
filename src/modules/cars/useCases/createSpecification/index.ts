import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationReposity = new SpecificationsRepository();

const createSpeficiationUseCase = new CreateSpecificationUseCase(
    specificationReposity,
);

const createSpecificationController = new CreateSpecificationController(
    createSpeficiationUseCase,
);

export { createSpecificationController };
