import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import CarModel from '../../../models/CarModel';
import { carMock, carMockWithId } from '../../mocks/carMocks'



describe('Car Model', () => {
  beforeEach(() => sinon.restore())
  it('cria um carro com sucesso', async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId)
    const carModel = new CarModel()
    const result = await carModel.create(carMock)
    expect(result).to.be.deep.equal(carMockWithId)
  })



});