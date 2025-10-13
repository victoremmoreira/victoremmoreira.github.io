import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gamepad2 } from "lucide-react";

interface QuizWelcomeProps {
  onStart: (name: string, email: string) => void;
}

export const QuizWelcome = ({ onStart }: QuizWelcomeProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    const newErrors = { name: "", email: "" };
    
    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    
    if (!email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!validateEmail(email)) {
      newErrors.email = "E-mail inválido";
    }
    
    setErrors(newErrors);
    
    if (!newErrors.name && !newErrors.email) {
      onStart(name, email);
    }
  };

  const isFormValid = name.trim() && email.trim() && validateEmail(email);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
      {/* Gaming background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-12 h-12 border-4 border-primary rotate-45"></div>
        <div className="absolute top-40 right-32 w-8 h-8 bg-secondary rounded-full"></div>
        <div className="absolute bottom-32 left-1/3 w-6 h-6 bg-accent"></div>
        <div className="absolute top-1/3 right-20 w-10 h-10 border-2 border-primary rotate-12"></div>
        <Gamepad2 className="absolute bottom-20 right-20 w-16 h-16 text-primary/20" />
        <div className="absolute top-1/2 left-10 w-4 h-4 bg-secondary rotate-45"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-card rounded-3xl p-8 shadow-[var(--shadow-card)] border border-border/50 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4 relative">
              <svg
                className="w-12 h-12 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-6-8h8"
                />
              </svg>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xs text-accent-foreground font-bold">🎮</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              UX Gaming Quiz
            </h1>
            <p className="text-muted-foreground text-lg">
              Teste seus conhecimentos sobre <span className="text-primary font-semibold">Experiência do Usuário em Jogos Digitais</span>
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span className="text-accent">⏱️</span>
                <span>15s por questão</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-secondary">📝</span>
                <span>10 questões</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nome completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`h-12 ${errors.name ? "border-destructive" : ""}`}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-12 ${errors.email ? "border-destructive" : ""}`}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-200 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:scale-100"
            >
              🎮 Iniciar Desafio UX
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
