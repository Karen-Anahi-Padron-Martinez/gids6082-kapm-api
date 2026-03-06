import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { pgProvider } from '../../../common/providers/pg.provider';
import { mysqlProvider } from 'src/common/providers/mysql.provider';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, mysqlProvider[0],PrismaService],
  //providers: [TaskService, pgProvider[0], mysqlProvider[0]],
})
export class TaskModule {}
