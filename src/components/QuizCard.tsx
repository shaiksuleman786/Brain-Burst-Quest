import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/types/quiz';
import { Users, Clock, Calendar } from 'lucide-react';

interface QuizCardProps {
  quiz: Quiz;
  onTakeQuiz: (quizId: string) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz, onTakeQuiz }) => {
  return (
    <Card className="p-6 bg-gradient-card hover:shadow-quiz transition-all duration-300 hover:scale-[1.02] animate-fade-in">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{quiz.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{quiz.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{quiz.createdByUsername}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{quiz.questions.length} questions</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-muted-foreground">
            Estimated time: {Math.ceil(quiz.questions.length * 1.5)} min
          </div>
          <Button 
            onClick={() => onTakeQuiz(quiz.id)}
            variant="hero"
            size="sm"
          >
            Take Quiz
          </Button>
        </div>
      </div>
    </Card>
  );
};