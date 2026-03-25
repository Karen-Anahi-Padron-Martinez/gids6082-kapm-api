import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';
//import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@Inject('MYSQL_CONNECTION') private db: any,
  private prisma: PrismaService) {}

  private tasks: any[] = [];

  public async getTasks(user_id): Promise<any> {
    const tasks = await this.prisma.task.findMany({
      where: {
        user_id
      }
    });
    return tasks;
  }

  public async getTasksById(id: number,user_id:number): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: {id, user_id}
    });
    return task;
  }

  public async insert(task: CreateTaskDto): Promise<Task> {
    const newTask = await this.prisma.task.create({
      data: task
    });
    return newTask;
  }

  public async update(id: number, user_id:number,taskUpdate:UpdateTaskDto): Promise<Task> {
    const task = await this.prisma.task.update({
      where: { id,user_id},
      data: taskUpdate
    });
    return task;

    //git commit -a -m "fix:CRUD a base de datos Provider (List, ListById, insert)"
  }

  public async delete(id: number,user_id:number): Promise<Task> {
  const task = await this.prisma.task.delete({
    where: { id ,user_id}
  });

  return task;
}
}
