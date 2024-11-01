import React, { useState } from "react";

import { Expense, ExpensesListProps } from "@/types/expense";

import { ExpenseForm } from "./ExpenseForm";
import { ExpenseItem } from "./ExpenseItem";

export const ExpensesList: React.FC<ExpensesListProps> = ({
  expenses,
  addExpense,
  deleteExpense,
  updateExpense,
}) => {
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: 0,
    category: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (expenseData: Partial<Expense>) => {
    const { title, amount, category, date } = expenseData;
    const amountNumber = parseFloat(amount?.toString() || "0");

    if (title && amountNumber > 0 && category) {
      if (editingId !== null) {
        // Update existing expense
        updateExpense(editingId, { title, amount: amountNumber, category, date });
        setEditingId(null);
      } else {
        // Add new expense
        addExpense(title, amountNumber, category, date || new Date().toISOString().slice(0, 10));
      }

      // Reset form
      setNewExpense({
        title: "",
        amount: 0,
        category: "",
        date: new Date().toISOString().slice(0, 10),
      });
    }
  };

  const handleEdit = (expense: Expense) => {
    setNewExpense({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
    setEditingId(expense.id);
  };

  return (
    <div className="max-w-md mt-10 m-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Expenses List</h1>

      <ExpenseForm
        isEditing={editingId !== null}
        newExpense={newExpense}
        setNewExpense={setNewExpense}
        onSubmit={handleSubmit}
      />

      {/* Display the list of expenses */}
      <ul className="space-y-2">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={deleteExpense}
            onEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
};
