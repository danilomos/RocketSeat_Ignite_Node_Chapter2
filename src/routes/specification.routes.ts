import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationRoutes = Router();

const specificationReposity = new SpecificationsRepository();

specificationRoutes.post('/', (request, response) => {
    const { name, description } = request.body;

    const createSpecificationService = new CreateSpecificationService(
        specificationReposity,
    );

    createSpecificationService.execute({ name, description });

    return response.sendStatus(201);
});

export { specificationRoutes };
