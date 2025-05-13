import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sunilmore',
      database: 'postgres',
      entities: [User], // Or use `entities: [__dirname + '/**/*.entity{.ts,.js}']`
      synchronize: true, // Don't use `true` in production
      autoLoadEntities: true, // Optional, auto-loads entities defined with `TypeOrmModule.forFeature`
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   host: 'localhost',
    //   port: 27017,
    //   database: 'nestjstest',
    //   entities: [User],
    //   synchronize: true, // Set to false in production!
    // }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
