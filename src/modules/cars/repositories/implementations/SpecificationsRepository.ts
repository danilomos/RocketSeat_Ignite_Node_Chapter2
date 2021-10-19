import { Specification } from "../../entities/specification";
import {
    ICreateSpecificationDTO,
    ISpecificationRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        await this.specifications.push(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.specifications.find(
            specification => specification.name === name,
        );
        return specification;
    }
}

export { SpecificationsRepository };
