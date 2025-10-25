import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import databaseConfig from './config/database.config';
import auth0Config from './config/auth0.config';
import { User } from './models/user.model';
import { Role } from './models/role.model';
import { FrontModule } from './front/front.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, auth0Config],
      envFilePath: '.env',
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        models: [User, Role], // Add your models here
        autoLoadModels: true,
        synchronize: false, // Use migrations for schema management
      }),
      inject: [ConfigService],
    }),
    FrontModule,
    AdminModule,
  ],
})
export class AppModule {}
