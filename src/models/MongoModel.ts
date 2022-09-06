import { isValidObjectId, Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  private _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error('InvalidMongoId');
    const result = await this._model.findOne({ _id });
    if (!result) throw new Error('EntityNotFound');
    return result;
  }

  public async delete(_id: string): Promise<T | null> {
    return this._model.findOneAndDelete({ _id });
  }
}

export default MongoModel;