const inquirer = require('inquirer');
const chalk = require('chalk');
const model = require('../model/expenseModel.js');

const formatCurrency = (amount) => {
    return `${process.env.CURRENCY} ${amount.toLocaleString()}`;
}

const addExpense = async () => {
    const answers = await inquirer.prompt([
        { name: 'title', message: 'Title: ' },
        {
            name: 'amount', message: 'Amount: ', validate: (input) => {
                const num = Number(input);
                if (isNaN(num)) return 'Please enter a valid number';
                if (num <= 0) return 'Amount must be greater than 0';
                return true;
            }
        },
        { name: 'category', message: 'Category (e.g. Food, Transport):' },
        { name: 'date', message: 'Date (YYYY-MM-DD): ', default: new Date().toISOString().split('T')[0] },
        { name: 'notes', message: 'Notes (optional):', default: '' },
    ]);
    answers.amount = parseFloat(answers.amount);
    try {
        const expense = await model.addExpense(answers);
        console.log(chalk.green(`Expense added successfully: ${expense.title} - ${formatCurrency(expense.amount)}`));
    } catch (error) {
        console.error(chalk.red('Error adding expense:', error.message));
    }
}

const viewExpenses = async () => {
    const expenses = await model.getAllExpenses();
    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (expenses.length === 0) {
        console.log(chalk.yellow('No expenses found.'));
        return;
    }
    console.log(chalk.blue('\n=== All Expenses ===\n'));
    console.table(expenses.map(exp => ({
        Title: exp.title,
        Amount: formatCurrency(exp.amount),
        Category: exp.category,
        Date: exp.date,
        Notes: exp.notes || 'N/A'
    })));
}

const updateExpense = async () => {
    const expenses = await model.getAllExpenses();
    if (expenses.length === 0) {
        console.log(chalk.yellow('No expenses to update.'));
        return;
    }
    const { id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Select an expense to update:',
            choices: expenses.map(exp => ({ name: `${exp.title} (${exp.date})`, value: exp.id })),
        }
    ]);
    const expense = expenses.find(exp => exp.id === id);
    const updates = await inquirer.prompt([
        { name: 'title', message: 'New Title:', default: expense.title },
        {
            name: 'amount', message: 'New Amount:', default: expense.amount, validate: (input) => {
                const num = Number(input);
                if (isNaN(num)) return 'Please enter a valid number';
                if (num <= 0) return 'Amount must be greater than 0';
                return true;
            }
        },
        { name: 'category', message: 'New Category:', default: expense.category },
        { name: 'date', message: 'New Date (YYYY-MM-DD):', default: expense.date },
        { name: 'notes', message: 'New Notes:', default: expense.notes || '' },
    ]);

    updates.amount = parseFloat(updates.amount);
    try {
        await model.updateExpense(id, updates);
        console.log(chalk.green('Expense updated.'));
    } catch (error) {
        console.error(chalk.red('Error updating expense:', error.message));
    }
}

const deleteExpense = async () => {
    const expenses = await model.getAllExpenses();
    if (expenses.length === 0) return console.log(chalk.yellow('No expenses to delete.'));
    const { id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'Choose expense to delete:',
            choices: expenses.map(e => ({ name: `${e.title} (${e.date})`, value: e.id })),
        },
    ]);
    if (!id) return console.log(chalk.yellow('No expense selected.'));
    try {
        await model.deleteExpense(id);
        console.log(chalk.green('Expense deleted.'));
    } catch (error) {
        console.error(chalk.red('Error deleting expense:', error.message));
    }
}

const viewSummary = async () => {
    const expenses = await model.getAllExpenses();
    if (expenses.length === 0) {
        console.log(chalk.yellow('No expenses to summarize.'));
        return;
    }
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const categories = {};
    expenses.forEach(exp => {
        categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
    });

    console.log(chalk.cyan('\n--- Expense Summary ---'));
    console.log(chalk.white(`Total Spent: ${formatCurrency(total)}`));
    console.log('\nBreakdown by Category:');
    for (const [cat, amt] of Object.entries(categories)) {
        console.log(`- ${cat}: ${formatCurrency(amt)}`);
    }
}

module.exports = {
    addExpense,
    viewExpenses,
    updateExpense,
    deleteExpense,
    viewSummary,
};