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
  let addTodoComponent: AddTodoComponent;
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
    addTodoComponent = fixture.componentInstance;
    addTodoComponent.ngOnInit();
    fixture.detectChanges();
    addTodoForm = addTodoComponent.addTodoForm;
    expect(addTodoForm).toBeDefined();
    expect(addTodoForm.controls).toBeDefined();
  });

  it('should create the component', () => {
    expect(addTodoComponent).toBeTruthy();
    expect(addTodoForm).toBeTruthy();
  });

// Confirms that an initial, empty form is *not* valid, so
  // people can't submit an empty form.
  it('form should be invalid when empty', () => {
    expect(addTodoForm.valid).toBeFalsy();
  });


  describe('The owner field', () => {
    let ownerControl: AbstractControl;

    beforeEach(() => {
    ownerControl = addTodoComponent.addTodoForm.controls.owner;
     });

     it('should not allow empty owners', () => {
       ownerControl.setValue('');
       expect(ownerControl.valid).toBeFalsy();
     });

    it('should be fine with "Blake Johnson"', () => {
      ownerControl.setValue('Blake Johnson');
      expect(ownerControl.valid).toBeTruthy();
    });

    it('should fail on single character owners', () => {
      ownerControl.setValue('x');
      expect(ownerControl.valid).toBeFalsy();
      // Annoyingly, Angular uses lowercase 'l' here
      // when it's an upper case 'L' in `Validators.minLength(2)`.
      expect(ownerControl.hasError('minlength')).toBeTruthy();
    });

    // In the real world, you'd want to be pretty careful about
    // setting upper limits on things like name lengths just
    // because there are people with really long names.
    it('should fail on really long owners', () => {
      ownerControl.setValue('x'.repeat(100));
      expect(ownerControl.valid).toBeFalsy();
      // Annoyingly, Angular uses lowercase 'l' here
      // when it's an upper case 'L' in `Validators.maxLength(2)`.
      expect(ownerControl.hasError('maxlength')).toBeTruthy();
    });

    it('should allow digits in the name', () => {
      ownerControl.setValue('Bad2Th3B0ne');
      expect(ownerControl.valid).toBeTruthy();
    });

  });

   describe('The status field', () => {
     let statusControl: AbstractControl;

    beforeEach(() => {
       statusControl = addTodoComponent.addTodoForm.controls.status;
     });

     it('should not allow empty status', () => {
      statusControl.setValue('');
      expect(statusControl.valid).toBeFalsy();
    });

    it('should allow true', () => {
      statusControl.setValue(true);
      expect(statusControl.valid).toBeTruthy();
    });

    it('should allow false', () => {
      statusControl.setValue(false);
      expect(statusControl.valid).toBeTruthy();
    });

    it('should not allow "Supreme Overlord"', () => {
      statusControl.setValue('Supreme Overlord');
      expect(statusControl.valid).toBeFalsy();
    });

   });

   describe('The category field', () => {
    let categoryControl: AbstractControl;

    beforeEach(() => {
    categoryControl = addTodoComponent.addTodoForm.controls.category;
     });

     it('should not allow empty categories', () => {
       categoryControl.setValue('');
       expect(categoryControl.valid).toBeFalsy();
     });

    it('should be fine with "Computer Science"', () => {
      categoryControl.setValue('Computer Science');
      expect(categoryControl.valid).toBeTruthy();
    });

    it('should fail on single character categories', () => {
      categoryControl.setValue('x');
      expect(categoryControl.valid).toBeFalsy();
      // Annoyingly, Angular uses lowercase 'l' here
      // when it's an upper case 'L' in `Validators.minLength(2)`.
      expect(categoryControl.hasError('minlength')).toBeTruthy();
    });

    // In the real world, you'd want to be pretty careful about
    // setting upper limits on things like name lengths just
    // because there are people with really long names.
    it('should fail on really long categories', () => {
      categoryControl.setValue('x'.repeat(100));
      expect(categoryControl.valid).toBeFalsy();
      // Annoyingly, Angular uses lowercase 'l' here
      // when it's an upper case 'L' in `Validators.maxLength(2)`.
      expect(categoryControl.hasError('maxlength')).toBeTruthy();
    });

    it('should allow digits in the category', () => {
      categoryControl.setValue('Csci 3601');
      expect(categoryControl.valid).toBeTruthy();
    });

  });

  describe('The body field', () => {
    let bodyControl: AbstractControl;

    beforeEach(() => {
    bodyControl = addTodoComponent.addTodoForm.controls.body;
     });

     it('should not allow empty bodies', () => {
       bodyControl.setValue('');
       expect(bodyControl.valid).toBeFalsy();
     });

    it('should be fine with "Hello I am Blake Johnson and this is the body of my todo card profile."', () => {
      bodyControl.setValue('Hello I am Blake Johnson and this is the body of my todo card profile.');
      expect(bodyControl.valid).toBeTruthy();
    });

    it('should fail on single character bodies', () => {
      bodyControl.setValue('x');
      expect(bodyControl.valid).toBeFalsy();
      // Annoyingly, Angular uses lowercase 'l' here
      // when it's an upper case 'L' in `Validators.minLength(2)`.
      expect(bodyControl.hasError('minlength')).toBeTruthy();
    });

    // In the real world, you'd want to be pretty careful about
    // setting upper limits on things like name lengths just
    // because there are people with really long names.
    it('should fail on really long bodies', () => {
      bodyControl.setValue('x'.repeat(300));
      expect(bodyControl.valid).toBeFalsy();
      // Annoyingly, Angular uses lowercase 'l' here
      // when it's an upper case 'L' in `Validators.maxLength(2)`.
      expect(bodyControl.hasError('maxlength')).toBeTruthy();
    });

    it('should allow digits in the body', () => {
      bodyControl.setValue('Hello, I am Blake Johnson and I am taking Csci 3601.');
      expect(bodyControl.valid).toBeTruthy();
    });

  });

});
