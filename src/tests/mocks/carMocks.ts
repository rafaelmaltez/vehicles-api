import { ICar} from '../../interfaces/ICar';

export const carMock: ICar = {
  model: 'mock_01',
  year: 2022,
  color: 'black',
  buyValue: 25000,
  doorsQty: 4,
  seatsQty: 4,
  status: true
}

export const carMockWithId: ICar & { _id: string } = {
  _id: 'valid_id',
  model: 'mock_01',
  year: 2022,
  color: 'black',
  buyValue: 25000,
  doorsQty: 4,
  seatsQty: 4,
  status: true
}