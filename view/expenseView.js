const inquirer = require('inquirer');
const chalk = require('chalk');

const showMenu = async () => {
    console.log(chalk.green('\n=== Personal Expense Manager ===\n'));
    const choices = [
        'Add a New Expense',
        'View All Expenses',
        'Update an Expense',
        'Delete an Expense',
        'View Summary',
        'Exit',
    ];
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please select an option:',
            choices: choices,
        }
    ]);

    return choice;
};

module.exports = showMenu;