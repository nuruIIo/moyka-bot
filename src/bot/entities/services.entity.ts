import { Column, Model, DataType, Table } from 'sequelize-typescript';

interface IServiceCreationAttr {
  id: number;
  name: string;
}

@Table({ tableName: 'services' })
export class Service extends Model<Service, IServiceCreationAttr> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column(DataType.STRING)
  name: string;
}
