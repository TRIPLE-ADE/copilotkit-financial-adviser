import { useState, useEffect } from "react";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { Expense } from "@/types/expense";

export const useAdviceHook = (expenses: Expense[]) => {
    const [advice, setAdvice] = useState<string>("Awaiting request for advice...");
    const [copilotInstructions, setCopilotInstructions] = useState<string>("Add some expenses to receive personalized advice!");
    const [isAdviceRequested, setIsAdviceRequested] = useState<boolean>(false);
    const [chatResponse, setChatResponse] = useState<string>("");

    // Register a Copilot action to generate financial advice
    useCopilotAction({
        name: "generateAdvice",
        description: "Generates financial advice based on current expenses",
        parameters: [],
        handler: async () => {
            // Set the flag indicating advice has been requested
            setIsAdviceRequested(true);

            // Analyze expenses to find top spending category and high-frequency expenses
            const highSpendingCategory = expenses.reduce((acc, expense) => {
                acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                return acc;
            }, {} as Record<string, number>);

            const topCategory = Object.keys(highSpendingCategory).reduce((a, b) =>
                highSpendingCategory[a] > highSpendingCategory[b] ? a : b
            );

            setAdvice(`Your top spending category is '${topCategory}'. Consider saving here!`);
            setCopilotInstructions(
                `Analyze spending trends in the category '${topCategory}' and suggest ways to save. ` +
                "Provide general budgeting advice based on overall spending patterns. " +
                "Identify potential savings by analyzing high-frequency expenses."
            );

            // Simulate getting a response from the chat (replace this with the actual API call)
            const response = await fetchChatResponse(topCategory); // Define your fetchChatResponse function
            setChatResponse(response);
        },
    });

    // Copilot readable state for displaying current advice
    useCopilotReadable({
        description: "Current financial advice based on expense analysis",
        value: advice,
    });

    useEffect(() => {
        if (!isAdviceRequested) {
            return;
        }

        // If no expenses are available when advice is requested
        if (expenses.length === 0) {
            setAdvice("No expenses to analyze yet. Start adding some to receive advice!");
            setCopilotInstructions("Add some expenses to receive personalized advice!");
            return;
        }

        const highSpendingCategory = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {} as Record<string, number>);

        const topCategory = Object.keys(highSpendingCategory).reduce((a, b) =>
            highSpendingCategory[a] > highSpendingCategory[b] ? a : b
        );

        setAdvice(`Top spending category: ${topCategory}. Generating advice...`);
        
        // Reset the flag after generating advice
        setIsAdviceRequested(false);
    }, [expenses, isAdviceRequested]);

    return {
        advice,
        copilotInstructions,
        chatResponse, // Return the chat response for display
    };
};

// Simulated fetch function for the chat response
const fetchChatResponse = async (category: string) => {
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `Based on your spending in the '${category}' category, consider cutting back on non-essential items to save more.`;
};
