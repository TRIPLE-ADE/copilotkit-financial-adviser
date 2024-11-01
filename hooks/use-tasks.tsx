import { useState } from "react";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";

// Types for Expense
type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
  isRecurring?: boolean;
};

const defaultExpenses: Expense[] = [];

export const useExpenseHook = () => {
  const [expenses, setExpenses] = useState<Expense[]>(defaultExpenses);

  const addExpense = (title: string, amount: number, category: string, date: string) => {
    const newExpense: Expense = {
      id: expenses.length + 1,
      title,
      amount,
      category,
      date,
    };

    setExpenses((prev) => [...prev, newExpense]);
  };

  const deleteExpense = (id: number) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const updateExpense = (id: number, updatedData: Partial<Expense>) => {
    setExpenses((prev) =>
      prev.map((expense) => (expense.id === id ? { ...expense, ...updatedData } : expense)),
    );
  };

  // Copilot actions
  useCopilotAction({
    name: "addExpense",
    description: "Adds an expense to the list",
    parameters: [
      { name: "title", type: "string", description: "The title of the expense", required: true },
      { name: "amount", type: "number", description: "The amount of the expense", required: true },
      {
        name: "category",
        type: "string",
        description: "The category of the expense",
        required: true,
      },
      { name: "date", type: "string", description: "The date of the expense", required: true },
    ],
    handler: ({ title, amount, category, date }) => {
      addExpense(title, amount, category, date);
    },
  });

  useCopilotAction({
    name: "deleteExpense",
    description: "Deletes an expense from the list",
    parameters: [
      { name: "id", type: "number", description: "The id of the expense", required: true },
    ],
    handler: ({ id }) => {
      deleteExpense(id);
    },
  });

  useCopilotAction({
    name: "updateExpense",
    description: "Updates an expense in the list",
    parameters: [
      { name: "id", type: "number", description: "The id of the expense", required: true },
      {
        name: "updatedData",
        type: "object",
        description: "The updated data of the expense",
        required: true,
      },
    ],
    handler: ({ id, updatedData }) => {
      updateExpense(id, updatedData);
    },
  });

  // Copilot readable state
  useCopilotReadable({
    description: "The current state of the expense list",
    value: JSON.stringify(expenses),
  });

  return {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
  };
};
