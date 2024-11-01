import React from "react";

import { ExpenseItemProps } from "@/types/expense"; // Adjust the path as necessary

export const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onEdit, onDelete }) => {
  return (
    <li className="flex justify-between items-center p-4 border-b">
      <div>
        <h2 className="font-bold">{expense.title}</h2>
        <p>
          N{expense.amount} - {expense.category} - {expense.date}
        </p>
      </div>
      <div>
        <button
          className="bg-yellow-500 text-white rounded p-1 mx-2 hover:bg-yellow-600"
          onClick={() => onEdit(expense)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white rounded p-1 hover:bg-red-600"
          onClick={() => onDelete(expense.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};
