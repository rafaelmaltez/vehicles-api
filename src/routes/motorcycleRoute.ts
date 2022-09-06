import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import MotorcycleService from '../services/MotorcycleService';
import MotorcycleModel from '../models/MotorcycleModel';
import { motorcycleZodSchema } from '../interfaces/IMotorcycle';

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(
  motorcycleModel,
  motorcycleZodSchema,
);
const motorcycleController = new MotorcycleController(motorcycleService);

const motorcycleRouter = Router();
const path = '/motorcycles/:id';

motorcycleRouter
  .post('/motorcycles', (req, res) => motorcycleController.create(req, res));
motorcycleRouter
  .get('/motorcycles', (req, res) => motorcycleController.read(req, res));
motorcycleRouter
  .get(path, (req, res) => motorcycleController
    .readOne(req, res));
motorcycleRouter
  .put(path, (req, res) => motorcycleController.update(req, res));
motorcycleRouter
  .delete(path, (req, res) => motorcycleController
    .delete(req, res));

export default motorcycleRouter;
