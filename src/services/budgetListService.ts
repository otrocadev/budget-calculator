import { Injectable, signal } from '@angular/core';
import {
  isEmailValid,
  isNameValid,
  isPhoneValid,
} from '../utils/validtionChecks';

type BudgetInfo = {
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
  secondaryServices: BudgetSecondaryService[] | undefined;
};

type BudgetSecondaryService = {
  title: string;
  amount: number;
};

@Injectable({ providedIn: 'root' })
export class BudgetListService {
  private _listOfBudgets = signal<BudgetInfo[]>([]);
  private _errorStatus = signal<string>('valid');

  public listOfBudgets = this._listOfBudgets.asReadonly();
  public errorStatus = this._errorStatus.asReadonly();

  private checkName(name: string) {
    if (isNameValid(name) !== 'valid') {
      this._errorStatus.set(isNameValid(name));
    }
  }

  private checkEmail(email: string) {
    if (isEmailValid(email) !== 'valid') {
      this._errorStatus.set(isEmailValid(email));
    }
  }

  private checkPhone(phone: string) {
    if (isPhoneValid(phone) !== 'valid') {
      this._errorStatus.set(isPhoneValid(phone));
    }
  }

  public addBudget(budget: BudgetInfo) {
    this._errorStatus.set('valid');
    this.checkName(budget.name);
    if (this.errorStatus() !== 'valid') {
      return;
    }
    this.checkEmail(budget.email);
    if (this.errorStatus() !== 'valid') {
      return;
    }
    this.checkPhone(budget.phone);
    if (this.errorStatus() !== 'valid') {
      return;
    }
    this._listOfBudgets.update((budgets) => [...budgets, budget]);
  }
}
