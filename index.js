require('dotenv').config();
const showMenu = require('./view/expenseView.js');
const route = require('./routes/expenseRoutes.js');

const main = async () => {
    console.clear();
    console.log('Welcome to the Personal Expense Manager!');
    
    while (true) {
        const choice = await showMenu();
        await route(choice);
    }
}

main();