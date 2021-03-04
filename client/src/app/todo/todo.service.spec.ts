
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';

describe('TodoService', () => {

   // A small collection of test todos
   const testTodos: Todo[] = [
     {
      _id: '1234',
      owner: 'Iris',
      status: true,
      body: 'test todo-body number one-x',
      category: 'test-todo-1',
     },
     {
      _id: '12345',
      owner: 'Ava',
      status: false,
      body: 'test todo-body number two-y',
      category: 'test-todo-2',
     },
     {
      _id: '123456',
      owner: 'Allie',
      status: true,
      body: 'test todo-body number three-z',
      category: 'test-todo-3',
     },
    ];
  let todoService: TodoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    todoService = new TodoService(httpClient);
  });

  describe('getTodos()', () => {

    it('calls `api/todos` when `getTodos()` is called with no parameters', () => {
      todoService.getTodos().subscribe(
        todos => expect(todos).toBe(testTodos)
      );

  // Specify that (exactly) one request will be made to the specified URL with the role parameter.
  const req = httpTestingController.expectOne(
    (request) => request.url.startsWith(todoService.todoUrl)
  );

  //Check that the request made to that URL was a GET request.
  expect(req.request.method).toEqual('GET');

  req.flush(testTodos);

    });

  });

  describe('filterTodos()', () => {
    it('filters by owner', () => {
      const ownerName = 'i';
      const filteredTodos = todoService.filterTodos(testTodos, { owner: ownerName });
      // There should be two owners with an 'i' in their
      // owner: Iris and Allie.
      expect(filteredTodos.length).toBe(2);
      // Every returned owner's name should contain an 'i'.
      filteredTodos.forEach(todo => {
        expect(todo.owner.indexOf(ownerName)).toBeGreaterThanOrEqual(0);
      });
    });

    it('filters by category', () => {
      const todoCategory = 'test-todo-1';
      const filteredTodos = todoService.filterTodos(testTodos, { category: todoCategory });
      // There should be just one todo that has test-todo1 as their category.
      expect(filteredTodos.length).toBe(1);
      // Every returned todo's category should contain 'test-todo1'.
      filteredTodos.forEach(todo => {
        expect(todo.category.indexOf(todoCategory)).toBeGreaterThanOrEqual(0);
      });
    });

    it('filters by body', () => {
      const todoBody = 'x';
      const filteredTodos = todoService.filterTodos(testTodos, { body: todoBody });
      // There should be one todo with an 'x' in its
      // body: 'test todo number one-x'.
      expect(filteredTodos.length).toBe(1);
      // Every returned owner's name should contain an 'i'.
      filteredTodos.forEach(todo => {
        expect(todo.body.indexOf(todoBody)).toBeGreaterThanOrEqual(0);
      });
    });

  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });
});
