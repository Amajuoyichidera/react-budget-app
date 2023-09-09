import React, { useState } from "react";
import "./App.css"; 

function App() {
  const [budget, setBudget] = useState(0);
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);



  const addExpense = () => {
    if (expense.trim() === "" || isNaN(amount) || parseFloat(amount) <= 0) {
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expense,
      amount: parseFloat(amount),
    };

    setExpenses([...expenses, newExpense]);
    setBudget(budget - newExpense.amount);
    setExpense("");
    setAmount("");
  };



  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    const deletedExpense = expenses.find((expense) => expense.id === id);
    if (deletedExpense) {
      setBudget(budget + deletedExpense.amount);
    }
    setExpenses(updatedExpenses);
  };



  return (
    <div className="App">
      <h1>Budget App</h1>

      <div className="budget">
        <h2>Your Budget: ${budget.toFixed(2)}</h2>
        <input
          type="number"
          placeholder="Enter Your Budget"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value))}
        />
      </div>

      <div className="expense-input">
        <input
          type="text"
          placeholder="Expense"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>

      <div className="expense-list">
        <h2>Expenses</h2>
        <ol>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.name}: ${expense.amount.toFixed(2)}
              <button onClick={() => deleteExpense(expense.id)}>Delete</button>
            </li>
          ))}
        </ol>
      </div>
	  
    </div>
  );
}


export default App;

