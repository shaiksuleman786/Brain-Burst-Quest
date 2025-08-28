import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Quiz, QuizResult as Result } from '@/types/quiz';
import { Trophy, RotateCcw, Home, Share2, CheckCircle, XCircle } from 'lucide-react';

interface LocationState {
  result: Result;
  quiz: Quiz;
}

const QuizResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const state = location.state as LocationState;
  
  if (!state || !state.result || !state.quiz) {
    navigate('/browse');
    return null;
  }

  const { result, quiz } = state;
  const percentage = Math.round((result.score / result.total) * 100);

  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding! 🎉";
    if (percentage >= 80) return "Excellent work! 👏";
    if (percentage >= 70) return "Well done! 👍";
    if (percentage >= 60) return "Good effort! 💪";
    return "Keep practicing! 📚";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning-foreground";
    return "text-destructive";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
            <Trophy className="h-10 w-10 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Quiz Complete!</h1>
        <p className="text-xl text-muted-foreground">{quiz.title}</p>
      </div>

      {/* Score Card */}
      <Card className="p-8 text-center bg-gradient-card shadow-quiz mb-8 animate-fade-in delay-200">
        <div className="mb-6">
          <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
            {percentage}%
          </div>
          <div className="text-2xl text-foreground mb-2">
            {result.score} out of {result.total} correct
          </div>
          <div className="text-xl text-muted-foreground font-medium">
            {getScoreMessage()}
          </div>
        </div>

        {/* Progress Ring */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke={percentage >= 80 ? "hsl(var(--success))" : percentage >= 60 ? "hsl(var(--warning))" : "hsl(var(--destructive))"}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${percentage * 2.51} 251.2`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{result.score}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Detailed Results */}
      <Card className="p-6 bg-gradient-card shadow-card mb-8 animate-fade-in delay-400">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Question Breakdown</h2>
        <div className="space-y-4">
          {quiz.questions.map((question, index) => {
            const userAnswer = result.answers[index];
            const isCorrect = userAnswer === question.correctAnswerIndex;
            
            return (
              <div key={index} className="p-4 rounded-lg border border-border">
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`mt-1 ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                    {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-2">
                      Question {index + 1}: {question.questionText}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p className={`${isCorrect ? 'text-success' : 'text-destructive'}`}>
                        Your answer: {userAnswer >= 0 ? question.options[userAnswer] : 'No answer'}
                      </p>
                      {!isCorrect && (
                        <p className="text-success">
                          Correct answer: {question.options[question.correctAnswerIndex]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center animate-fade-in delay-600">
        <Button
          onClick={() => navigate(`/quiz/${quiz.id}`)}
          variant="hero"
          size="lg"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Take Again
        </Button>
        
        <Button asChild variant="outline" size="lg">
          <Link to="/browse">
            <Home className="h-4 w-4 mr-2" />
            Browse More Quizzes
          </Link>
        </Button>

        <Button
          onClick={async () => {
            const shareData = {
              title: `I scored ${percentage}% on "${quiz.title}"`,
              text: `Check out this quiz on Brain Burst Quest!`,
              url: window.location.origin + `/quiz/${quiz.id}`
            };

            try {
              if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
              } else {
                await navigator.clipboard.writeText(window.location.origin + `/quiz/${quiz.id}`);
                // Simple feedback without external toast dependency
                const originalText = 'Share';
                const button = document.querySelector('[data-share-button]') as HTMLElement;
                if (button) {
                  button.textContent = 'Link Copied!';
                  setTimeout(() => {
                    button.textContent = originalText;
                  }, 2000);
                }
              }
            } catch (error) {
              console.log('Share failed, copying to clipboard');
              try {
                await navigator.clipboard.writeText(window.location.origin + `/quiz/${quiz.id}`);
                const originalText = 'Share';
                const button = document.querySelector('[data-share-button]') as HTMLElement;
                if (button) {
                  button.textContent = 'Link Copied!';
                  setTimeout(() => {
                    button.textContent = originalText;
                  }, 2000);
                }
              } catch (clipboardError) {
                console.error('Could not share or copy to clipboard');
              }
            }
          }}
          variant="secondary"
          size="lg"
          data-share-button
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>

      {/* Quiz Info */}
      <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in delay-800">
        <p>Quiz created by {quiz.createdByUsername}</p>
        <p>Completed on {new Date(result.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default QuizResult;