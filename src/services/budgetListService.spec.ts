import { TestBed } from '@angular/core/testing';
import { BudgetListService } from './budgetListService';

describe('BudgetListService', () => {
  let service: BudgetListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetListService);
  });

  it('should add a budget if all the camps are correct', () => {
    service.addBudget({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      budgetServices: [{ title: 'Generic Service' }],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(1);
  });

  // name usecases
  it('should NOT add a budget if name camp is empty', () => {
    service.addBudget({
      name: '',
      email: 'john.doe@example.com',
      phone: '123456789',
      budgetServices: [{ title: 'Generic Service' }],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(0);
    expect(service.errorStatus()).toEqual(['name', 'empty']);
  });

  it('should NOT add a budget if name camp is not a string', () => {
    service.addBudget({
      // @ts-expect-error - Testing invalid type
      name: 123,
      email: 'john.doe@example.com',
      phone: '123456789',
      budgetServices: [{ title: 'Generic Service' }],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(0);
    expect(service.errorStatus()).toEqual(['name', 'notString']);
  });

  it('should NOT add a budget if name includes numbers', () => {
    service.addBudget({
      name: 'John99',
      email: 'john.doe@example.com',
      phone: '123456789',
      budgetServices: [{ title: 'Generic Service' }],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(0);
    expect(service.errorStatus()).toEqual(['name', 'notLettersOnly']);
  });

  it('should NOT add a budget if name is too short', () => {
    service.addBudget({
      name: 'J',
      email: 'john.doe@example.com',
      phone: '123456789',
      budgetServices: [{ title: 'Generic Service' }],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(0);
    expect(service.errorStatus()).toEqual(['name', 'notEnoughChars']);
  });

  // email usecases
  it('should NOT add a budget if email camp is empty', () => {
    service.addBudget({
      name: 'John Doe',
      email: '',
      phone: '123456789',
      budgetServices: [{ title: 'Generic Service' }],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(0);
    expect(service.errorStatus()).toEqual(['email', 'empty']);
  });

  it('should NOT add a budget if email camp is not a string', () => {
    service.addBudget({
      // @ts-expect-error - Testing invalid type
      email: 123,
      name: 'John Doe',
      phone: '123456789',
      budgetServices: [{ title: 'Generic Service' }],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(0);
    expect(service.errorStatus()).toEqual(['email', 'notString']);
  });

  it('should NOT add a budget if email does not include @', () => {
    service.addBudget({
      name: 'John Doe',
      email: 'john.doe.example.com',
      phone: '123456789',
      budgetServices: [{ title: 'Generic Service' }],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(0);
    expect(service.errorStatus()).toEqual(['email', 'notArroba']);
  });

  it('should NOT add a budget if email does not include . after @', () => {
    service.addBudget({
      name: 'John Doe',
      email: 'john.doe@examplecom',
      phone: '123456789',
      budgetServices: [{ title: 'Generic Service' }],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(0);
    expect(service.errorStatus()).toEqual(['email', 'notDot']);
  });

  // phone usecases
  it('should NOT add a budget if phone camp is empty', () => {
    service.addBudget({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '',
      budgetServices: [{ title: 'Generic Service' }],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(0);
    expect(service.errorStatus()).toEqual(['phone', 'empty']);
  });

  it('should NOT add a budget if phone camp is not a string', () => {
    service.addBudget({
      // @ts-expect-error - Testing invalid type
      phone: 123,
      name: 'John Doe',
      email: 'john.doe@example.com',
      budgetServices: [{ title: 'Generic Service' }],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(0);
    expect(service.errorStatus()).toEqual(['phone', 'notString']);
  });

  it('should NOT add a budget if phone contains chars that are not numbers', () => {
    service.addBudget({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: 'abc',
      budgetServices: [{ title: 'Generic Service' }],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(0);
    expect(service.errorStatus()).toEqual(['phone', 'notNumbersOnly']);
  });

  it('should NOT add a budget if phone is too short', () => {
    service.addBudget({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '12345',
      budgetServices: [{ title: 'Generic Service' }],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(0);
    expect(service.errorStatus()).toEqual(['phone', 'notEnoughChars']);
  });

  it('should NOT add a budget if phone is too long', () => {
    service.addBudget({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '12345678901',
      budgetServices: [{ title: 'Generic Service' }],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(0);
    expect(service.errorStatus()).toEqual(['phone', 'moreThanAcceptedChars']);
  });

  // check services usecases
  it('should NOT add a budget if services camp is empty', () => {
    service.addBudget({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      budgetServices: [],
      total: 0,
    });
    expect(service.listOfBudgets().length).toBe(0);
    expect(service.errorStatus()).toEqual(['services', 'empty']);
  });
});
