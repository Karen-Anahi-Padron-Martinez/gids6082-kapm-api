import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  public getTasks(): string {
    return 'Lista de tareas';
  }

  public getTasksById(id: number): string {
    return `Tarea con el id ${id}`;
  }

  public insert(task: any): any {
    return task;
  }

  public update(id: number, task: any): any {
    return {
      id,
      ...task,
      message: 'Tarea actualizada',
    };
  }

  public delete(id: number): string {
    return `Tarea ${id} eliminada`;
  }
}
