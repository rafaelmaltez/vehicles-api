import { Request, Response } from 'express';
import { Iservice } from '../interfaces/IService';

export default abstract class Controller<T> {
  constructor(private service: Iservice<T>) {}

  public async create(req: Request & { body: T }, res: Response) {
    const result = await this.service.create(req.body);
    return res.status(201).json(result);
  }
}
