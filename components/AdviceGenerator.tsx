import React from "react";
import { CopilotPopup } from "@copilotkit/react-ui";

type AdviceGeneratorProps = {
    advice: string; // Existing advice prop
    copilotInstructions: string; // Instructions for the Copilot
    chatResponse: string; // New prop for chat response
};

export const AdviceGenerator: React.FC<AdviceGeneratorProps> = ({ advice, copilotInstructions, chatResponse }) => (
    <div className="bg-green-100 p-4 rounded shadow">
        <h2 className="font-bold text-lg">Financial Advice</h2>
        <p>{advice}</p>

        {/* Display the chat response */}
        {chatResponse && (
            <div className="bg-blue-100 p-2 rounded mt-2">
                <p>{chatResponse}</p>
            </div>
        )}

        <CopilotPopup
            instructions={copilotInstructions}
            labels={{
                title: "Personalized Financial Advice",
                initial: "Here's some advice based on your spending patterns!",
            }}
        />
    </div>
);
