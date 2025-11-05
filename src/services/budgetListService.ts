import { Injectable, signal } from '@angular/core';
import {
  isEmailValid,
  isNameValid,
  isPhoneValid,
} from '../utils/validtionChecks';
import type { ErrorType } from '../types/validationTypes';
import type { FormInputType } from '../types/validationTypes';
import type { BudgetInfo, BudgetService } from '../types/budgetTypes';
import { budgetMocks } from '../config/mocks/budgetMocks';

@Injectable({ providedIn: 'root' })
export class BudgetListService {
  private _listOfBudgets = signal<BudgetInfo[]>(budgetMocks);
  private _errorStatus = signal<
    [FormInputType | 'services' | 'valid', ErrorType]
  >(['valid', 'valid']);

  private _backupListOfBudgets = signal<BudgetInfo[] | undefined>(undefined);

  public listOfBudgets = this._listOfBudgets.asReadonly();
  public errorStatus = this._errorStatus.asReadonly();

  private checkServices(budgetServices: BudgetService[]) {
    if (budgetServices.length === 0) {
      this._errorStatus.set(['services', 'empty']);
    }
  }

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

  public addBudget(budget: BudgetInfo) {
    this._errorStatus.set(['valid', 'valid']);
    this.checkServices(budget.budgetServices);
    if (this.errorStatus()[1] !== 'valid') {
      return;
    }
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
    this._listOfBudgets.update((budgets) => [...budgets, budget]);
  }

  public orderList(option: string) {
    if (option === 'name-asc') {
      this.orderByName(true);
    } else if (option === 'name-desc') {
      this.orderByName(false);
    } else if (option === 'total-asc') {
      this.orderByTotal(true);
    } else if (option === 'total-desc') {
      this.orderByTotal(false);
    } else if (option === 'date-asc') {
      this.orderByDate(true);
    } else if (option === 'date-desc') {
      this.orderByDate(false);
    }
  }

  private orderByTotal(asc: boolean) {
    if (asc) {
      this._listOfBudgets.update((budgets) =>
        [...budgets].sort((a, b) => a.total - b.total)
      );
    }
    if (!asc) {
      this._listOfBudgets.update((budgets) =>
        [...budgets].sort((a, b) => b.total - a.total)
      );
    }
  }

  private orderByName(asc: boolean) {
    if (asc) {
      this._listOfBudgets.update((budgets) =>
        [...budgets].sort((a, b) => a.name.localeCompare(b.name))
      );
    }
    if (!asc) {
      this._listOfBudgets.update((budgets) =>
        [...budgets].sort((a, b) => b.name.localeCompare(a.name))
      );
    }
  }

  private orderByDate(asc: boolean) {
    if (asc) {
      this._listOfBudgets.update((budgets) =>
        [...budgets].sort((a, b) => a.date.localeCompare(b.date))
      );
    }
    if (!asc) {
      this._listOfBudgets.update((budgets) =>
        [...budgets].sort((a, b) => b.date.localeCompare(a.date))
      );
    }
  }

  public searchByName(name: string) {
    if (this._backupListOfBudgets() === undefined) {
      this._backupListOfBudgets.set(this._listOfBudgets());
    }
    this._listOfBudgets.set(this._backupListOfBudgets() || []);

    this._listOfBudgets.update((budgets) =>
      budgets.filter((budget) =>
        budget.name.toLowerCase().includes(name.toLowerCase())
      )
    );
  }
}
