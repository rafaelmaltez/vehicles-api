import sinon from 'sinon';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const { expect } = chai;
import { SafeParseError } from 'zod';
import CarService from '../../../services/CarService';
import CarModel from '../../../models/CarModel';
import { carZodSchema } from '../../../interfaces/ICar';
import { carMock, carMockWithId } from '../../mocks/carMocks';

chai.use(chaiAsPromised)

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
  it('dispara um erro caso valores invalidos sejam passados', async () => {
    const { carService } = makeSut()
    sinon.stub(carZodSchema, 'safeParse').returns({ success: false,} as SafeParseError<any>)
    const promise = carService.create(carMock)
    return expect(promise).to.eventually.be.rejected
  })

  it('lista todos os carros com sucesso', async () => {
    const { carService, carModel } = makeSut()
    sinon.stub(carModel, 'read').resolves([carMockWithId, carMockWithId])
    const result = await carService.read()
    expect(result.length).to.be.equal(2)
  })

  it('lista um carro especifico com sucesso', async () => {
    const { carService, carModel } = makeSut()
    sinon.stub(carModel, 'readOne').resolves(carMockWithId)
    const result = await carService.readOne('62cf1fc6498565d94eba52cd')
    expect(result).to.be.deep.equal(carMockWithId)
  })
  it('atualiza um carro especifico com sucesso', async () => {
    const { carService, carModel } = makeSut()
    sinon.stub(carModel, 'update').resolves(carMockWithId)
    const result = await carService.update('62cf1fc6498565d94eba52cd', carMock)
    expect(result).to.be.deep.equal(carMockWithId)
  })

  it('dispara um erro ao atualizar caso valores invalidos sejam passados', async () => {
    const { carService } = makeSut()
    sinon.stub(carZodSchema, 'safeParse').returns({ success: false,} as SafeParseError<any>)
    const promise = carService.update('62cf1fc6498565d94eba52cd', carMock)
    return expect(promise).to.eventually.be.rejected
  })
  it('deleta um carro especifico com sucesso', async () => {
    const { carService, carModel } = makeSut()
    sinon.stub(carModel, 'delete').resolves(carMockWithId)
    const result = await carService.delete('62cf1fc6498565d94eba52cd')
    expect(result).to.be.deep.equal(carMockWithId)
  })
});