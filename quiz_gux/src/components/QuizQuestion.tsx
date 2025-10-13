import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, Gamepad2 } from "lucide-react";

interface Option {
  id: string;
  tag: string;
  text: string;
}

interface Question {
  id: number;
  tag: string;
  question: string;
  options: Option[];
}

interface QuizQuestionProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
  onAnswer: (answer: string) => void;
  onSkip: () => void;
}

export const QuizQuestion = ({
  question,
  currentQuestion,
  totalQuestions,
  timeLeft,
  onAnswer,
  onSkip,
}: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    // Automatically submit after a short delay to show selection
    setTimeout(() => {
      onAnswer(answer);
      setSelectedAnswer("");
    }, 300);
  };

  const handleSkip = () => {
    onSkip();
    setSelectedAnswer("");
  };

  const timePercentage = (timeLeft / 15) * 100;
  const isTimeRunningOut = timeLeft <= 5;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
      {/* Gaming background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-8 h-8 border-2 border-primary rotate-45"></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-secondary rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-accent"></div>
        <div className="absolute top-1/2 right-10 w-5 h-5 border border-primary"></div>
        <Gamepad2 className="absolute bottom-10 right-10 w-12 h-12 text-primary/20" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] border border-border/50">
          {/* Timer */}
          <div className="mb-6">
            <div className={`flex items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
              isTimeRunningOut 
                ? 'bg-destructive/10 border-destructive/50 animate-pulse' 
                : 'bg-accent/10 border-accent/50'
            }`}>
              <Clock className={`w-5 h-5 ${isTimeRunningOut ? 'text-destructive' : 'text-accent'}`} />
              <span className={`text-lg font-bold ${isTimeRunningOut ? 'text-destructive' : 'text-accent'}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${
                  isTimeRunningOut ? 'bg-destructive' : 'bg-accent'
                }`}
                style={{ width: `${timePercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Header com progresso */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                Questão {currentQuestion} de {totalQuestions}
              </span>
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {Math.round(((currentQuestion - 1) / totalQuestions) * 100)}%
              </span>
            </div>
            <Progress 
              value={((currentQuestion - 1) / totalQuestions) * 100} 
              className="h-3"
            />
          </div>

          {/* Pergunta */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground leading-relaxed border-l-4 border-primary pl-4">
              {question.question}
            </h2>
          </div>

          {/* Opções */}
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelection} className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <div key={option.id} className="flex items-start space-x-3 p-4 rounded-xl border border-border hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02] hover:shadow-md group">
                <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                <Label 
                  htmlFor={option.id} 
                  className="flex-1 text-base cursor-pointer leading-relaxed group-hover:text-primary transition-colors"
                >
                  <span className="inline-block w-8 h-8 bg-primary text-primary-foreground rounded-full text-center leading-8 font-bold mr-3 text-sm">
                    {option.id.toUpperCase()}
                  </span>
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Botão de pular */}
          <Button
            onClick={handleSkip}
            variant="outline"
            className="w-full h-12 text-lg font-semibold hover:bg-muted transition-all duration-200 hover:scale-[1.02]"
          >
            ⏭️ Pular Questão
          </Button>
        </div>
      </div>
    </div>
  );
};
