import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../app/todo/todo';
import { TodoService } from '../app/todo/todo.service';

/**
 * A "mock" version of the `TodoService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockTodoService extends TodoService {
  static testTodos: Todo[] = [
    {
      _id: 'chris_id',
      owner: 'chris',
      status: true,
      body: 'string',
      category: 'test todos',
    },
    {
      _id: 'pat_id',
      owner: 'pat',
      status: false,
      body: 'string',
      category: 'test todos',
    },
    {
      _id: 'jamie_id',
      owner: 'jamie',
      status: true,
      body: 'string',
      category: 'test todos',
    },
  ];

  constructor() {
    super(null);
  }

  getTodos(): Observable<Todo[]> {
    return of(MockTodoService.testTodos);
  }

}
