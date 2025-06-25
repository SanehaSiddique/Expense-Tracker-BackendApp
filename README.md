# 📊 Personal Expense Tracker (Console App)

A simple **Node.js** CLI-based personal expense manager using the **MVCR (Model-View-Controller-Router)** structure. The app allows users to record, view, update, and delete expenses, and view summaries of total and categorized spending. Data is stored in a local `.json` file and settings are configurable via `.env`.

---

## 🚀 Features

- ✅ Add a new expense (title, amount, category, date, optional notes)
- ✅ View all expenses (sorted by date)
- ✅ Update an existing expense
- ✅ Delete an expense
- ✅ View total and category-wise summary
- ✅ Persistent data storage using a JSON file
- ✅ Environment configuration with `.env`
- ✅ Interactive CLI using `inquirer`
- ✅ Colored terminal output using `chalk`

---

## 🗂️ Project Structure

```

expense-tracker/
├── controllers/              # Business logic
│   └── expenseController.js
├── models/                   # Data read/write operations
│   └── expenseModel.js
├── routes/                   # Routes CLI menu choices
│   └── expenseRoutes.js
├── views/                    # CLI user interaction
│   └── cliView\.js
├── storage/                  # JSON file for persistent data
│   └── expenses.json
├── utils/                    # (Optional) Helper functions
├── .env                      # Environment variables
├── index.js                  # Main entry point
├── package.json
└── README.md

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Expense-Tracker-BackendApp.git
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a `.env` File

```env
# .env
DATA_FILE=./storage/expenses.json
CURRENCY=PKR
```

### 4. Run the App

```bash
node index.js
```

> ⚠️ For best results, run it in **Command Prompt** or **Windows Terminal** (not Git Bash).

---

## 🧾 Sample Expense JSON Structure

```json
[
  {
    "id": "b1f9d6b2-3dcb-4c13-9c1f-1f8e9c9f88d0",
    "title": "Lunch at Subway",
    "amount": 850,
    "category": "Food",
    "date": "2025-06-02",
    "notes": "Had sandwich and drink"
  }
]
```

---

## 🧪 Tech Stack

* **Node.js** – JavaScript runtime
* **inquirer** – Interactive CLI menus
* **chalk** – Colored terminal output
* **dotenv** – Manage environment variables
* **uuid** – Generate unique expense IDs
* **fs/promises** – Handle file operations

---

## ✅ Available Actions in the App

1. **Add a New Expense**
2. **View All Expenses**
3. **Update an Expense**
4. **Delete an Expense**
5. **View Summary**
6. **Exit**

---

## 📈 Summary Output Example

```
--- Expense Summary ---
Total Spent: PKR 3,150

Breakdown by Category:
- Food: PKR 1,850
- Transport: PKR 1,300
```

---

## 📌 Notes

* The app uses a `.json` file instead of a database to keep it lightweight.
* Use arrow keys to navigate the menu in supported terminals.
* You can customize the currency in the `.env` file (e.g., `USD`, `PKR`, `INR`).

---

## 👨‍💻 Author

Made with ❤️ by \Saneha Siddique

