import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });
const carMongooseModel = mongooseCreateModel('Car', carMongooseSchema);

class CarModel extends MongoModel<ICar> {
  constructor(model = carMongooseModel) {
    super(model);
  }
}

export default CarModel;
