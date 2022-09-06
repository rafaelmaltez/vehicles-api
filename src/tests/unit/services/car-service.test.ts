import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarService from '../../../services/CarService';
import CarModel from '../../../models/CarModel';
import { carZodSchema } from '../../../interfaces/ICar';
import { carMock, carMockWithId } from '../../mocks/carMocks';
import { SafeParseReturnType } from 'zod';

const makeSut = () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel, carZodSchema)
  return {
    carService, carModel
  }
}

describe('CarService', () => {
  beforeEach(() => sinon.restore())
  it('cria um carro com sucesso', async () => {
    const { carService, carModel } = makeSut()
    sinon.stub(carModel, 'create').resolves(carMockWithId)
    sinon.stub(carZodSchema, 'safeParse').returns({ success: true, data: carMock})
    const result = await carService.create(carMock)
    expect(result).to.be.deep.equal(carMockWithId)
  })
});