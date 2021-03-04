import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockTodoService } from 'src/testing/todo.service.mock';
import { TodoService } from '../todo/todo.service';
import { AddTodoComponent } from './add-todo.component';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let addTodoForm: FormGroup;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [ AddTodoComponent ],
      providers: [{ provide: TodoService, useValue: new MockTodoService() }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    addTodoForm = component.addTodoForm;
    expect(addTodoForm).toBeDefined();
    expect(addTodoForm.controls).toBeDefined();
  });

  it('should create the component', () => {
    expect(AddTodoComponent).toBeTruthy();
  });

  describe('The owner field', () => {
    let ownerControl: AbstractControl;

    // beforeEach(() => {
    // ownerControl = AddTodoComponent.addTodoForm.controls.owner;
    // });

    // it('should not allow empty names', () => {
    //   ownerControl.setValue('');
    //   expect(ownerControl.valid).toBeFalsy();
    // });

    // it('')

  });

  // describe('The status field', () => {
  //   let statusControl: AbstractControl;

  //   beforeEach(() => {
  //     statusControl = AddTodoComponent.component.controls.status;
  //   });
  // });



  //it('should create', () => {
   // expect(component).toBeTruthy();
  //});

});
