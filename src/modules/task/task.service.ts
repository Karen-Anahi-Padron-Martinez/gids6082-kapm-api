import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../auth/dto/create-task.dto';

@Injectable()
export class TaskService {

  constructor(
    @Inject('MYSQL_CONNECTION') private db:any
  ){}

  private tasks: any[] = [];

  public getTasks(): Promise<any> {
    const query ='SELECT * FROM tasks';
    const [result]:any = await this.db.query(query);

    return result;
  }

  public getTasksById(id: number): any {
    const query ='SELECT * FROM tasks WHERE id='${''
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
