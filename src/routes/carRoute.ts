import { Router } from 'express';
import CarController from '../controllers/CarController';
import CarService from '../services/CarService';
import CarModel from '../models/CarModel';
import { carZodSchema } from '../interfaces/ICar';

const carModel = new CarModel();
const carService = new CarService(carModel, carZodSchema);
const carController = new CarController(carService);

const carRouter = Router();
carRouter.post('/cars', (req, res) => carController.create(req, res));

export default carRouter;