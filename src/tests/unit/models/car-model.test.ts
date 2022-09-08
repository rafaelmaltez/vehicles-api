import * as sinon from 'sinon';
import { Mongoose } from 'mongoose';
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
    sinon.stub(Mongoose.prototype, 'isValidObjectId').returns(true)
    const carModel = new CarModel()
    const result = await carModel.readOne('valid_id')
    expect(result).to.be.equal(carMockWithId)
  })

  it('dispara um erro ao ler um carro caso id seja invalido', async () => {
    sinon.stub(Mongoose.prototype, 'isValidObjectId').returns(false)
    const carModel = new CarModel()
    const promise = carModel.readOne('invalid_id')
    return expect(promise).to.eventually.be.rejectedWith(Error, 'InvalidMongoId')
  })

  it('dispara um erro ao ler um carro caso nenhum seja encontrado', async () => {
    sinon.stub(Mongoose.prototype, 'isValidObjectId').returns(true)
    sinon.stub(Model, 'findOne').resolves(null)
    const carModel = new CarModel()
    const promise = carModel.readOne('valid_non_existent_id')
    return expect(promise).to.eventually.be.rejectedWith(Error, 'EntityNotFound')
  })

  it('atualiza um carro com sucesso', async () => {
    sinon.stub(Mongoose.prototype, 'isValidObjectId').returns(true)
    sinon.stub(Model, 'findOneAndUpdate').resolves(carMockWithId)
    const carModel = new CarModel()
    const result = await carModel.update('valid_id', carMock)
    expect(result).to.be.deep.equal(carMockWithId)
  })

  it('dispara um erro ao atualizar um carro caso id seja invalido', async () => {
    sinon.stub(Mongoose.prototype, 'isValidObjectId').returns(false)
    const carModel = new CarModel()
    const promise = carModel.update('invalid_id', carMock)
    return expect(promise).to.eventually.be.rejectedWith(Error, 'InvalidMongoId')
  })
  it('dispara um erro ao atualizar um carro caso carro nao seja encontrado', async () => {
    sinon.stub(Mongoose.prototype, 'isValidObjectId').returns(true)
    sinon.stub(Model,'findOneAndUpdate').resolves(null)
    const carModel = new CarModel()
    const promise = carModel.update('valid_id', carMock)
    return expect(promise).to.eventually.be.rejectedWith(Error, 'EntityNotFound')
  })

  it('deleta um carro com sucesso', async () => {
    sinon.stub(Mongoose.prototype, 'isValidObjectId').returns(true)
    sinon.stub(Model, 'findOneAndDelete').resolves(carMockWithId)
    const carModel = new CarModel()
    const result = await carModel.delete('valid_id')
    expect(result).to.be.deep.equal(carMockWithId)
  })

  it('dispara um erro ao deletar um carro caso id seja invalido', async () => {
    sinon.stub(Mongoose.prototype, 'isValidObjectId').returns(false)
    const carModel = new CarModel()
    const promise = carModel.delete('invalid_id')
    return expect(promise).to.eventually.be.rejectedWith(Error, 'InvalidMongoId')
  })
  it('dispara um erro ao deletar um carro caso o caro nao exista', async () => {
    sinon.stub(Mongoose.prototype, 'isValidObjectId').returns(true)
    sinon.stub(Model, 'findOneAndDelete').resolves(null)
    const carModel = new CarModel()
    const promise = carModel.delete('invalid_id')
    return expect(promise).to.eventually.be.rejectedWith(Error, 'EntityNotFound')
  })

});