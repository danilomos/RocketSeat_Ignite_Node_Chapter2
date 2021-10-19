import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationReposity: ISpecificationRepository,
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists =
            this.specificationReposity.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error("Specification Already Exists");
        }

        await this.specificationReposity.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
