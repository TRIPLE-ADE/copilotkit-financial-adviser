import React from "react";

import { ExpenseFormProps } from "@/types/expense"; // Adjust the path as necessary

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
  newExpense,
  onSubmit,
  isEditing,
  setNewExpense,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setNewExpense((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="flex flex-col gap-4 mb-4 p-4 border rounded shadow-lg bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(newExpense);
      }}
    >
      <input
        required
        className="border rounded p-2"
        name="title"
        placeholder="Expense Title"
        type="text"
        value={newExpense.title}
        onChange={handleInputChange}
      />
      <input
        required
        className="border rounded p-2"
        name="amount"
        placeholder="Amount"
        type="number"
        value={newExpense.amount}
        onChange={handleInputChange}
      />
      <select
        required
        className="border rounded p-2"
        name="category"
        value={newExpense.category}
        onChange={handleInputChange}
      >
        <option disabled value="">
          Select Category
        </option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>
      <input
        required
        className="border rounded p-2"
        name="date"
        type="date"
        value={newExpense.date}
        onChange={handleInputChange}
      />
      <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600" type="submit">
        {isEditing ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
};
