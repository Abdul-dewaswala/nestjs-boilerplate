import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findOrCreate(auth0Id: string, email: string): Promise<User> {
    let user = await this.userModel.findOne({ where: { auth0Id } });

    if (!user) {
      user = await this.userModel.create({ auth0Id, email });
    }

    return user;
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async updateOnboardingStatus(id: string, status: boolean): Promise<[number, User[]]> {
    return this.userModel.update({ onboardingCompleted: status }, { where: { id } });
  }
}