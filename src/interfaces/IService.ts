export interface Iservice<T> {
  create(obj:T): Promise<T>
  read(): Promise<T[]>
  readOne(_id: string): Promise<T | null>
  delete(_id: string): Promise<T | null>
}