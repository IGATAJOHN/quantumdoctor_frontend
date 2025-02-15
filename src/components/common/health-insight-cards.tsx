// src/components/common/HealthInsightCard.js
import { Button } from "@/components/ui/button";

const HealthInsightCard = ({ insight }) => {
    return (
        <div className={`p-4 rounded-lg text-white ${insight.color}`}>
            <h3 className="text-lg font-bold">{insight.title}</h3>
            <p className="mt-2">{insight.description}</p>
            {insight.buttonText && (
                <Button className="mt-4"> {insight.buttonText} </Button>
            )}
        </div>
    );
};

export default HealthInsightCard;

