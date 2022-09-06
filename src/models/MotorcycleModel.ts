import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const motorcycleMongooseSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  engineCapacity: Number,
}, { versionKey: false });

const motorcycleMongooseModel = mongooseCreateModel(
  'Motorcycle',
  motorcycleMongooseSchema,
);

export default class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = motorcycleMongooseModel) {
    super(model);
  }
}