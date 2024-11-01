"use client";

import { CopilotPopup } from "@copilotkit/react-ui";

import { ExpensesList } from "@/components/ExpenseList";
import { useExpenseHook } from "@/hooks/use-tasks";
import { useAdviceHook } from "@/hooks/use-advisor";

import "@copilotkit/react-ui/styles.css";
import { INSTRUCTIONS } from "@/constants/instructions";
import { AdviceGenerator } from "@/components/AdviceGenerator";

export default function Home() {
  // Use the custom hook
  const { expenses, addExpense, deleteExpense, updateExpense } = useExpenseHook();
  const { advice, copilotInstructions, chatResponse } = useAdviceHook(expenses);

  return (
    <div>
      <AdviceGenerator advice={advice} copilotInstructions={copilotInstructions} chatResponse={chatResponse} />
      <ExpensesList
        addExpense={addExpense}
        deleteExpense={deleteExpense}
        expenses={expenses}
        updateExpense={updateExpense}
      />

      <CopilotPopup
        instructions={INSTRUCTIONS}
        labels={{
          title: "Financial Adviser",
          initial: "How can I help you with your financial advise?",
        }}
      />

    </div>
  );
}
