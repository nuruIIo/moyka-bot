import { Column, Model, DataType, Table } from 'sequelize-typescript';

interface IWorkerCreationAttr {
  worker_id: number;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  status: boolean;
}

@Table({ tableName: 'workers' })
export class Worker extends Model<Worker, IWorkerCreationAttr> {
  @Column({
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ unique: true })
  worker_id: number;

  @Column(DataType.STRING)
  username: string;

  @Column(DataType.STRING)
  first_name: string;

  @Column(DataType.STRING)
  last_name: string;

  @Column(DataType.STRING)
  phone_number: string;

  @Column(DataType.BOOLEAN)
  status: boolean;
}
