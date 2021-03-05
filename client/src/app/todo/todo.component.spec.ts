import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { TodoComponent } from './todo.component';
import { TodoService } from './todo.service';
import { MockTodoService } from 'src/testing/todo.service.mock';
import { Todo } from './todo';
import { Observable } from 'rxjs';


const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('TodoComponent', () => {

  let todoList: TodoComponent;
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [ TodoComponent ],
      providers: [{ provide: TodoService, useValue: new MockTodoService()}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    todoList = fixture.componentInstance;
    fixture.detectChanges();
  });

// and now a series of 'it' tests that test owner, body, status, category filters
// using the mock todo server
  it('contains all the todos', () => {
    expect(todoList.serverFilteredTodos.length).toBe(3);
  });

  it('contains a todo owner \'Chris\'', () => {
    expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Chris')).toBe(true);
  });

  it('contain a todo owner \'Pat\'', () => {
    expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Pat')).toBe(true);
  });

  it('doesn\'t contain a todo owner \'Darth Vader\'', () => {
    expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Darth Vader')).toBe(false);
  });

  it('has two todos that are true', () => {
    expect(todoList.serverFilteredTodos.filter((todo: Todo) => todo.status === true).length).toBe(2);
  });

  it('contain a 3 todos that have \'string\' for the body', () => {
    expect(todoList.serverFilteredTodos.filter((todo: Todo) => todo.body === 'string').length).toBe(3);
  });

  it('should not contain a todo with \'x\' for the body', () => {
    expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.body === 'x')).toBe(false);
  });

  it('contain a 3 todos that have \'test todos\' for the category', () => {
    expect(todoList.serverFilteredTodos.filter((todo: Todo) => todo.category === 'test todos').length).toBe(3);
  });
});
// end of 'it' tests

describe('Misbehaving Todo List', () => {
  let todoList: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  let todoServiceStub: {
    getTodos: () => Observable<Todo[]>;
    getTodosFiltered: () => Observable<Todo[]>;
  };

  beforeEach(() => {
    // stub TodoService for test purposes
    todoServiceStub = {
      getTodos: () => new Observable(observer => {
        observer.error('Error-prone observable');
      }),
      getTodosFiltered: () => new Observable(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [TodoComponent],
      providers: [{ provide: TodoService, useValue: todoServiceStub }]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoComponent);
      todoList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

it('generates an error if we don\'t set up a TodoService', () => {
  expect(todoList.serverFilteredTodos).toBeUndefined();
});

});
