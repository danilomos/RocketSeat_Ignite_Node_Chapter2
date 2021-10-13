import { Category } from '../model/category';

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICreateCategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({ name, description }: ICreateCategoryDTO): void;
}

export { ICreateCategoriesRepository, ICreateCategoryDTO };
