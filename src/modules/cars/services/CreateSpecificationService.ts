import { ISpecificationRepository } from '../repositories/ISpecificationsRepository';

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationService {
    constructor(private specificationReposity: ISpecificationRepository) {}

    execute({ name, description }: IRequest): void {
        const specificationAlreadyExists =
            this.specificationReposity.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error('Specification Already Exists');
        }

        this.specificationReposity.create({ name, description });
    }
}

export { CreateSpecificationService };
