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
  _id: '62cf1fc6498565d94eba52cd',
  model: 'mock_01',
  year: 2022,
  color: 'black',
  buyValue: 25000,
  doorsQty: 4,
  seatsQty: 4,
  status: true
}