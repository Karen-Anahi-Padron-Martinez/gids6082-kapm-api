import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@Controller('api/task')
@ApiTags("Task")
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  @Get()
  public getTasks(): Promise<Task[]> {
    return this.taskSvc.getTasks();
  }

  @Get(':id')
  public async getTaskById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    console.log(typeof id); // number

    const result = await this.taskSvc.getTasksById(id);

    if (!result) {
      throw new HttpException(
        `Tarea con ID ${id} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Insert a task in the db' })
  public insertTask(@Body() task: CreateTaskDto): Promise<Task>{
    const result = this.taskSvc.insert(task);

    if (result == undefined)
      throw new HttpException(
        'Tarea no registrada',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return result;
  }

  @Put(':id')
  public updateTask(@Param('id', ParseIntPipe) id: number, @Body() task: UpdateTaskDto): Promise<Task>{
    
    return this.taskSvc.update(id, task);
  }

  @Delete(':id')
  public async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    const result = await this.taskSvc.delete(id);

    if (!result)
      throw new HttpException("No se puede eliminar la tarea", HttpStatus.NOT_FOUND)
    
    return result;
  }
}
