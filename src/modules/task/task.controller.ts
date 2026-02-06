import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('api/task')
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  @Get()
  public getTasks(): string {
    return this.taskSvc.getTasks();
  }

  @Get(':id')
  public getTaskById(@Param('id') id: string) {
    return this.taskSvc.getTasksById(parseInt(id));
  }

  @Post()
  public insertTask(@Body() task: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.taskSvc.insert(task);
  }

  @Put(':id')
  public updateTask(@Param('id') id: string, @Body() task: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.taskSvc.update(parseInt(id), task);
  }

  @Delete(':id')
  public deleteTask(@Param('id') id: string) {
    return this.taskSvc.delete(parseInt(id));
  }
}
