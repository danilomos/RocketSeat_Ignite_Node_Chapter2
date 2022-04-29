import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationReposity: ISpecificationRepository,
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists =
            await this.specificationReposity.findByName(name);

        if (specificationAlreadyExists) {
            throw new AppError("Specification Already Exists");
        }

        await this.specificationReposity.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
