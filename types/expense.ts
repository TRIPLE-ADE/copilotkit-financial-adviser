export type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
  isRecurring?: boolean;
};

export type ExpenseFormProps = {
  newExpense: {
    title: string;
    amount: number;
    category: string;
    date: string;
  };
  onSubmit: (expenseData: Partial<Expense>) => void;
  isEditing: boolean;
  setNewExpense: React.Dispatch<
    React.SetStateAction<{
      title: string;
      amount: number;
      category: string;
      date: string;
    }>
  >;
};

export type ExpenseItemProps = {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
};

export type ExpensesListProps = {
  expenses: Expense[];
  addExpense: (title: string, amount: number, category: string, date: string) => void;
  deleteExpense: (id: number) => void;
  updateExpense: (id: number, updatedData: Partial<Expense>) => void;
};
