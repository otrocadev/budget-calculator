import { Injectable, signal } from '@angular/core';
import {
  isEmailValid,
  isNameValid,
  isPhoneValid,
} from '../utils/validtionChecks';
import type { ErrorType } from '../types/validationTypes';

export type BudgetInfo = {
  name: string;
  email: string;
  phone: string;
  budgetServices: BudgetServicesList;
  total: number;
};

type BudgetServicesList = {
  services: BudgetService[];
};

type BudgetService = {
  title: string;
  secondaryServices?: BudgetSecondaryService[];
};

type BudgetSecondaryService = {
  title: string;
  amount: number;
};

@Injectable({ providedIn: 'root' })
export class BudgetListService {
  private _listOfBudgets = signal<BudgetInfo[]>([]);
  private _errorStatus = signal<[string, ErrorType]>(['valid', 'valid']);

  public listOfBudgets = this._listOfBudgets.asReadonly();
  public errorStatus = this._errorStatus.asReadonly();

  private checkName(name: string) {
    if (isNameValid(name) !== 'valid') {
      this._errorStatus.set(['name', isNameValid(name)]);
    }
  }

  private checkEmail(email: string) {
    if (isEmailValid(email) !== 'valid') {
      this._errorStatus.set(['email', isEmailValid(email)]);
    }
  }

  private checkPhone(phone: string) {
    if (isPhoneValid(phone) !== 'valid') {
      this._errorStatus.set(['phone', isPhoneValid(phone)]);
    }
  }

  private checkServices(budgetServices: BudgetServicesList) {
    if (budgetServices.services.length === 0) {
      this._errorStatus.set(['services', 'empty']);
    }
  }

  public addBudget(budget: BudgetInfo) {
    this._errorStatus.set(['valid', 'valid']);
    this.checkName(budget.name);
    if (this.errorStatus()[1] !== 'valid') {
      return;
    }
    this.checkEmail(budget.email);
    if (this.errorStatus()[1] !== 'valid') {
      return;
    }
    this.checkPhone(budget.phone);
    if (this.errorStatus()[1] !== 'valid') {
      return;
    }
    this.checkServices(budget.budgetServices);
    if (this.errorStatus()[1] !== 'valid') {
      return;
    }
    this._listOfBudgets.update((budgets) => [...budgets, budget]);
  }
}
