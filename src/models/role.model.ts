import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  tableName: 'roles',
})
export class Role extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true, // Changed to true
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}