import { Button } from "@/components/ui/button";
import { Gamepad2, Trophy } from "lucide-react";

interface QuizCompleteProps {
  onRestart: () => void;
  totalScore: number;
  maxScore: number;
}

export const QuizComplete = ({ onRestart, totalScore, maxScore }: QuizCompleteProps) => {
  const percentage = ((totalScore / maxScore) * 100).toFixed(1);
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
      {/* Gaming celebration background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-8 h-8 border-2 border-accent rotate-45 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-secondary animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-10 w-5 h-5 border border-accent animate-spin" style={{ animationDuration: '3s' }}></div>
        <Gamepad2 className="absolute bottom-10 right-10 w-12 h-12 text-accent/30 animate-pulse" />
        <Trophy className="absolute top-20 right-1/4 w-10 h-10 text-primary/30 animate-bounce" style={{ animationDelay: '0.8s' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] border border-border/50 text-center backdrop-blur-sm">
          <div className="inline-block p-6 bg-gradient-to-br from-accent to-accent/80 rounded-full mb-6 relative">
            <Trophy className="w-16 h-16 text-accent-foreground" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-pulse">
              <span className="text-primary-foreground text-lg">🎉</span>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Missão Cumprida!
          </h2>
          
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Quiz UX Gaming Concluído
          </h3>
          
          <div className="my-6 p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Sua Pontuação</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {totalScore}
                </span>
                <span className="text-2xl text-muted-foreground">/ {maxScore}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-full max-w-xs bg-secondary/20 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-primary">{percentage}%</span>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Parabéns! Suas respostas sobre <span className="text-primary font-semibold">Experiência do Usuário em Jogos</span> foram enviadas com sucesso. Continue explorando o mundo do UX! 🎮
          </p>

          <Button
            onClick={onRestart}
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-200 hover:scale-[1.02] shadow-lg"
          >
            🎯 Jogar Novamente
          </Button>
        </div>
      </div>
    </div>
  );
};
