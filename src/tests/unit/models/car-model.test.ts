import * as sinon from 'sinon';
import * as Mongoose from 'mongoose';
import chai, { should } from 'chai';
const { expect } = chai;
import chaiAsPromised from 'chai-as-promised'
import { Model } from 'mongoose';
import CarModel from '../../../models/CarModel';
import { carMock, carMockWithId } from '../../mocks/carMocks'

chai.use(chaiAsPromised)


describe('Car Model', () => {
  beforeEach(() => sinon.restore())
  it('cria um carro com sucesso', async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId)
    const carModel = new CarModel()
    const result = await carModel.create(carMock)
    expect(result).to.be.deep.equal(carMockWithId)
  })

  it('le todos os carros com sucesso', async () => {
    sinon.stub(Model, 'find').resolves([carMockWithId, carMockWithId])
    const carModel = new CarModel()
    const result = await carModel.read()
    expect(result.length).to.be.equal(2)
  })

  it('le um carro especifico com sucesso', async () => {
    sinon.stub(Model, 'findOne').resolves(carMockWithId)
    // sinon.stub(Mongoose, 'isValidObjectId').returns(true)
    const carModel = new CarModel()
    const result = await carModel.readOne('62cf1fc6498565d94eba52cd')
    expect(result).to.be.equal(carMockWithId)
  })

  it('dispara um erro ao ler um carro caso id seja invalido', async () => {
    const carModel = new CarModel()
    const promise = carModel.readOne('invalid_id')
    return expect(promise).to.eventually.be.rejected
  })

  it('dispara um erro ao ler um carro caso nenhum seja encontrado', async () => {
    sinon.stub(Model, 'findOne').resolves(null)
    const carModel = new CarModel()
    const promise = carModel.readOne('62cf1fc6498565d94eba52cd')
    return expect(promise).to.eventually.be.rejected
  })

  it('atualiza um carro com sucesso', async () => {
    sinon.stub(Model, 'findOneAndUpdate').resolves(carMockWithId)
    const carModel = new CarModel()
    const result = await carModel.update('62cf1fc6498565d94eba52cd', carMock)
    expect(result).to.be.deep.equal(carMockWithId)
  })

  it('dispara um erro ao atualizar um carro caso id seja invalido', async () => {
    const carModel = new CarModel()
    const promise = carModel.update('invalid_id', carMock)
    return expect(promise).to.eventually.be.rejected
  })
  it('dispara um erro ao atualizar um carro caso carro nao seja encontrado', async () => {
    sinon.stub(Model,'findOneAndUpdate').resolves(null)
    const carModel = new CarModel()
    const promise = carModel.update('62cf1fc6498565d94eba52cd', carMock)
    return expect(promise).to.eventually.be.rejected
  })

  it('deleta um carro com sucesso', async () => {
    sinon.stub(Model, 'findOneAndDelete').resolves(carMockWithId)
    const carModel = new CarModel()
    const result = await carModel.delete('62cf1fc6498565d94eba52cd')
    expect(result).to.be.deep.equal(carMockWithId)
  })

  it('dispara um erro ao deletar um carro caso id seja invalido', async () => {
    const carModel = new CarModel()
    const promise = carModel.delete('invalid_id')
    return expect(promise).to.eventually.be.rejected
  })

});