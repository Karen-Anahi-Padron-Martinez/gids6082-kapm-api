import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
//import { pgProvider } from '../../../common/providers/pg.provider';
import { mysqlProvider } from 'src/common/providers/mysql.provider';
import { PrismaService } from 'src/prisma.service';
import { UtilService } from 'src/common/services/util.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      JwtModule.register({
        secret: 'mi_secreto_jwt',
        signOptions: { expiresIn: '1h' },
      }),
    ],
  controllers: [TaskController],
  providers: [TaskService, mysqlProvider[0],PrismaService,UtilService],
  //providers: [TaskService, pgProvider[0], mysqlProvider[0]],
})
export class TaskModule {}
