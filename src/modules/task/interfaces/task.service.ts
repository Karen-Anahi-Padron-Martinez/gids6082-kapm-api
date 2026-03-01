import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(@Inject('MYSQL_CONNECTION') private db: any) {}

  private tasks: any[] = [];

  public async getTasks(): Promise<any> {
    const query = 'SELECT * FROM tasks';
    const [result]: any = await this.db.query(query);

    return result[0];
  }

  public async getTasksById(id: number): Promise<any> {
    const query = `SELECT * FROM tasks WHERE id = ${id}`;

    const [result] = await this.db.query(query);
    return result;
  }

  public async insert(task: CreateTaskDto): Promise<any> {
    const sql = `
  INSERT INTO tasks (name, description, priority, user_id)
  VALUES ('${task.name}','${task.description}',${task.priority},${task.user_id})`;

    const [result]: any = await this.db.query(sql);
    const insertId = result.insertId;

    const row = await this.getTasksById(insertId);

    return row;
  }

  public async update(id: number, taskUpdate): Promise<Task> {
    const task = await this.getTasksById(id);

    task.name = taskUpdate.name ? taskUpdate.name : task.name;
    task.description = taskUpdate.description ?? taskUpdate.description ;
    task.priority = taskUpdate.priority ?? taskUpdate.priority;

    const query =`UPDATE tasks
    SET name = '${ task.name}',
    description = '${ task.description}',
    priority = '${ task.priority}',
    WHERE id = '${ task.id }'
    `

    await this.db.query(query);
    return await this.getTasksById(id);
    

    //convertir el bejto a un set
    //{ name }: 'abc', description: 'abc'}
    //name = '', dscription''
    //const sets = Object.keys(taskUpdate)
    //.map(key =>`${key} = '${taskUpdate[key] }'`).join(',');


    //git commit -a -m "fix:CRUD a base de datos Provider (List, ListById, insert)"


  }

  public async delete(id: number): Promise<boolean> {
  const query = `DELETE FROM tasks WHERE id = ${ id }`;
  const [result]= await this.db.query(query);

  return result.affectedRows > 0;

  
  }

 
}
