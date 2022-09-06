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
carRouter.get('/cars', (req, res) => carController.read(req, res));
carRouter.get('/cars/:id', (req, res) => carController.readOne(req, res));
carRouter.put('/cars/:id', (req, res) => carController.update(req, res));
carRouter.delete('/cars/:id', (req, res) => carController.delete(req, res));

export default carRouter;