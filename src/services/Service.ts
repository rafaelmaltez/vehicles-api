import { ZodSchema } from 'zod';
import { IModel } from '../interfaces/IModel';
import { Iservice } from '../interfaces/IService';

abstract class Service<T> implements Iservice<T> {
  constructor(
    private _model: IModel<T>,
    private _schema: ZodSchema<T>,
  ) {}
  create(obj: T): Promise<T> {
    const result = this._schema.safeParse(obj);
    if (!result.success) throw result.error;
    return this._model.create(obj);
  }
  read(): Promise<T[]> {
    return this._model.read();
  }
  readOne(_id: string): Promise<T | null> {
    return this._model.readOne(_id);
  }
  delete(_id: string): Promise<T | null> {
    return this._model.delete(_id);
  }
}

export default Service;
