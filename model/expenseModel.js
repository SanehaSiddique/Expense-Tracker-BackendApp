const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const filePath = process.env.DATA_FILE || 'expenses.json';

// basic two read/write functions to handle expenses
const readExpenses = async () => {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data || '[]');
}

const writeExpenses = async (data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

const getAllExpenses = async () => {
    try {
        const expenses = await readExpenses();
        return expenses;
    } catch (error) {
        console.error('Error reading expenses:', error);
        throw error;
    }
}

const addExpense = async (expense) => {
    try {
        const expenses = await readExpenses();
        expense.id = uuidv4(); // generate a unique ID for the expense
        expenses.push(expense);
        await writeExpenses(expenses);
        return expense;
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
}

const updateExpense = async (id, updatedExpense) => {
    try {
        const expenses = await readExpenses();
        const index = expenses.findIndex(exp => exp.id === id);
        if (index === -1) {
            throw new Error('Expense not found');
        }
        expenses[index] = { ...expenses[index], ...updatedExpense };
        await writeExpenses(expenses);
        return expenses[index];
    } catch (error) {
        console.error('Error updating expense:', error);
        throw error;
    }
}

const deleteExpense = async (id) => {
    try {
        let expenses = await readExpenses();
        const index = expenses.findIndex(exp => exp.id === id);
        if (index === -1) {
            throw new Error('Expense not found');
        }
        const filtered = expenses.filter(e => e.id !== id);

        if (filtered.length !== expenses.length) {
            await writeExpenses(filtered);
            return true;
        }
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw error;
    }
}

module.exports = {
    getAllExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
};