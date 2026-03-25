import {Controller,Get,Post,Put,Delete,Param,Body,ParseIntPipe,HttpStatus,HttpException,UseGuards,Req,} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('api/task')
@UseGuards(AuthGuard)
@ApiTags("Task")
export class TaskController {
  constructor(private taskSvc: TaskService) {}

  @Get()
  public async getTasks(@Req() req: any): Promise<Task[]> {
    const userId = req.user.sub; 
    return this.taskSvc.getTasks(userId);
  }

  @Get(':id')
  public async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any
  ): Promise<Task> {
    const result = await this.taskSvc.getTasksById(id, req.user.sub);

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
  public async insertTask(@Body() task: CreateTaskDto, @Req() req: any): Promise<Task> {
    const taskData = { ...task, user_id: req.user.sub };
    const result = await this.taskSvc.insert(taskData);

    if (!result) {
      throw new HttpException(
        'Tarea no registrada',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }

  @Put(':id')
  public async updateTask(
    @Param('id', ParseIntPipe) id: number, 
    @Body() task: UpdateTaskDto,
    @Req() req: any
  ): Promise<Task> {
    return this.taskSvc.update(id, req.user.sub, task);
  }

  @Delete(':id')
  public async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any
  ): Promise<boolean> {
    try {
      await this.taskSvc.delete(id, req.user.sub);
      return true;
    } catch (error) {
      throw new HttpException("Task not found or unauthorized", HttpStatus.NOT_FOUND);
    }
  }
}