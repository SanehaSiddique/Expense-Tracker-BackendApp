const controller = require('../controller/expenseController.js');

const route = async (choice) => {
    switch (choice) {
        case 'Add a New Expense':
            await controller.addExpense();
            break;
        case 'View All Expenses':
            await controller.viewExpenses();
            break;
        case 'Update an Expense':
            await controller.updateExpense();
            break;
        case 'Delete an Expense':
            await controller.deleteExpense();
            break;
        case 'View Summary':
            await controller.viewSummary();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit(0);
    }
}

module.exports = route;