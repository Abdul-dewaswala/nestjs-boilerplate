import { Table, Column, Model, PrimaryKey, DataType, BelongsToMany } from 'sequelize-typescript';
import { Role } from './role.model';
import { RoleUser } from './role-user.model';

@Table({
  tableName: 'users',
})
export class User extends Model {
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
  auth0Id: string; // Auth0 user ID

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  onboardingCompleted: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  resetPasswordToken: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  resetPasswordExpires: Date;

  @BelongsToMany(() => Role, () => RoleUser)
  roles: Role[];
}