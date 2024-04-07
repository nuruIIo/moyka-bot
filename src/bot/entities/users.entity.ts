import { Column, Model, DataType, Table } from 'sequelize-typescript';

interface IUserCreationAttr {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string | undefined;
  phone_number: string;
  status: boolean;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({ 
    type: DataType.BIGINT,
    unique: true 
  })
  user_id: number;

  @Column(DataType.STRING)
  username: string;

  @Column(DataType.STRING)
  first_name: string;

  @Column(DataType.STRING)
  last_name: string | undefined;

  @Column(DataType.STRING)
  phone_number: string;

  @Column(DataType.BOOLEAN)
  status: boolean;
}
