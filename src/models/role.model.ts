import { Table, Column, Model, PrimaryKey, DataType, BelongsToMany } from 'sequelize-typescript';
import { User } from './user.model';
import { RoleUser } from './role-user.model';

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

  @BelongsToMany(() => User, () => RoleUser)
  users: User[];
}