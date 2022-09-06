import Sinon, * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carZodSchema } from '../../../interfaces/ICar';
import CarController from '../../../controllers/CarController';
import { carMock, carMockWithId } from '../../mocks/carMocks';
const { expect } = chai;

const makeSut = () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel, carZodSchema)
  const carController = new CarController(carService)
  return {
    carService, carModel, carController
  }
}

const makeParams = () => {
  const req = {} as Request;
  const res = {} as Response;
  res.status = sinon.stub().returns(res)
  res.json = sinon.stub()
  return { req, res }
}

describe('Car Controller', () => {
  beforeEach(() => sinon.restore())

  it('cria um carro com sucesso', async () => {
    const { req, res } = makeParams()
    const { carController, carService } = makeSut()
    req.body = carMock

    sinon.stub(carService, 'create').resolves(carMockWithId)
    await carController.create(req, res)

    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true
    expect((res.json as Sinon.SinonStub).calledWith(carMockWithId)).to.be.true
  });

  it('lista todos os carros com  sucesso', async () => {
    const { req, res } = makeParams()
    const { carController, carService } = makeSut()

    sinon.stub(carService, 'read').resolves([carMockWithId, carMockWithId])
    await carController.read(req, res)

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
    expect((res.json as Sinon.SinonStub).calledWith([carMockWithId, carMockWithId])).to.be.true
  });

  it('lista um carro especifico com sucesso', async () => {
    const { res } = makeParams()
    const { carController, carService } = makeSut()
    const req = { params: { id: 'any_id' } } as  Request & { params: { id: string } }
    sinon.stub(carService, 'readOne').resolves(carMockWithId)
    await carController.readOne(req, res)

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
    expect((res.json as Sinon.SinonStub).calledWith(carMockWithId)).to.be.true
  });

  it('atualiza um  carro com sucesso', async () => {
    const {  res } = makeParams()
    const { carController, carService } = makeSut()
    const req = { body: carMock, params: { id: 'any_id' } } as  Request & { params: { id: string } }
    sinon.stub(carService, 'update').resolves(carMockWithId)
    await carController.update(req, res)

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
    expect((res.json as Sinon.SinonStub).calledWith(carMockWithId)).to.be.true
  });

  it('deleta um  carro com sucesso', async () => {
    const {  res } = makeParams()
    const { carController, carService } = makeSut()
    const req = { params: { id: 'any_id' } } as  Request & { params: { id: string } }
    res.sendStatus = sinon.stub()
    sinon.stub(carService, 'delete').resolves(carMockWithId)
    await carController.delete(req, res)

    expect((res.sendStatus as sinon.SinonStub).calledWith(204)).to.be.true
  });

});