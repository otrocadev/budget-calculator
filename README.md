# Budget calculator
## 🎯 Objectives

The objective in this repo is to manage different states and manage the interactions between components. The application consists of a budget generator, that the user can manage to have a budget on some services that desires to hire. The app has to include a calculator that adds app all the articles selected, and a list to managge the budgets that have been asked.

## Requeriments

### Level 1
- [X] The user has 3 cards, with services to choose from and a display of the total amount, for now the services availabe are Seo (300€), Ads (400€) and Web (500€).
- [X] The web can have parameters like number of pages and number of languages.
- [X] These parameters must have an info button for the user to have feedback in case that it does not now what some parameter may mean.
## Level 2
- [X] A from that asks for the user details to store the budgets must be added
- [X] These budgets must display in a list
- [X] Filters to order for the data of creation, amount and name must be available for the user
- [X] A search functionality to filter the resuls.
## Level 3
- [ ] Manage the parameters from the url of the site to be able to pass a created budget to someone else

## 🖥️ Preview of the project

https://github.com/user-attachments/assets/02006557-2139-4bde-9fe2-d6c05be211fc

## 🛠️ Stack used
- 🚀 **Angular**
- 🎨 **CSS vanilla**


## Development server

To start a local development server, run:

```bash
ng serve
```
For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## 🏗️ Things to improve 
- [ ] Better mobile compatibility.
- [ ] Better UI, such as the listed budget cards, addapting better depending on the lenght of the information
- [ ] Feature: Being able to delete the current budgets from the UI
