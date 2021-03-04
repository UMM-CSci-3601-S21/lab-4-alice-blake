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
      owner: 'Chris',
      status: true,
      body: 'string',
      category: 'test todos',
    },
    {
      _id: 'pat_id',
      owner: 'Pat',
      status: false,
      body: 'string',
      category: 'test todos',
    },
    {
      _id: 'jamie_id',
      owner: 'Jamie',
      status: true,
      body: 'string',
      category: 'test todos',
    },
  ];

  constructor() {
    super(null);
  }

  getTodos(filters: {owner?: string; status?: boolean; category?: string; body?: string}): Observable<Todo[]> {
    return of(MockTodoService.testTodos);
  }

  getTodosById(id: string): Observable<Todo> {
    // If the specified ID is for the first test todo,
    // return that todo, otherwise return `null` so
    // we can test illegal user requests.
    if (id === MockTodoService.testTodos[0]._id) {
      return of (MockTodoService.testTodos[0]);
    } else {
      return of (null);
    }
  }

}
