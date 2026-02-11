import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../auth/dto/create-task.dto';

@Injectable()
export class TaskService {
  private tasks: any[] = [];

  public getTasks(): any[] {
    return this.tasks;
  }

  public getTasksById(id: number): any {
    var task = this.tasks.find((t) => t.id == id);
    return task;
  }

  public insert(task: CreateTaskDto): any {
    var id = this.tasks.length + 1;
    var insertedTask = this.tasks.push({
      ...task,
      id,
    });
    
     return this.tasks[insertedTask-1];
    
  }

  public update(id: number, task: any) {
    const taskUpdate = this.tasks.map((t) => {
      if (t.id == id) {
        
        if(task.name) t.name = task.name;
        if( task.description) t.decription = task.description;
        if (task.priority) t.priority = task.priority;

        return t;
      }

      return t;
    });
    return taskUpdate;
  }

  public delete(id: number): any {
    const array = this.tasks.filter(t => t.id != id);
    this.tasks= array;

    return "Task Deleted";
  }
}
