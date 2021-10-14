import { Category } from '../../model/category';
import { ICreateCategoriesRepository } from '../../repositories/ICreateCategoriesReposity';

class ListCategoriesUseCase {
    constructor(private categoriesRepository: ICreateCategoriesRepository) {}

    execute(): Category[] {
        const categories = this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase };
