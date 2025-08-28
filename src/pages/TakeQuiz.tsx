import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Quiz, QuizAttempt } from '@/types/quiz';
import { useAuth } from '@/context/AuthContext';
import { ChevronLeft, ChevronRight, Flag, Clock } from 'lucide-react';

const TakeQuiz: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!id) return;

    // Load quiz from localStorage
    const storedQuizzes = localStorage.getItem('quiz_quizzes');
    if (storedQuizzes) {
      const quizzes = JSON.parse(storedQuizzes);
      const foundQuiz = quizzes.find((q: Quiz) => q.id === id);
      if (foundQuiz) {
        setQuiz(foundQuiz);
        // Initialize attempt
        setAttempt({
          quizId: id,
          answers: new Array(foundQuiz.questions.length).fill(null),
          currentQuestion: 0,
          startTime: new Date(),
          isCompleted: false
        });
      } else {
        navigate('/browse');
      }
    } else {
      navigate('/browse');
    }
  }, [id, navigate]);

  useEffect(() => {
    // Timer
    const timer = setInterval(() => {
      if (attempt && !attempt.isCompleted) {
        setTimeElapsed(Math.floor((Date.now() - attempt.startTime.getTime()) / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [attempt]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!attempt || attempt.isCompleted) return;

    const updatedAnswers = [...attempt.answers];
    updatedAnswers[attempt.currentQuestion] = answerIndex;
    setAttempt({
      ...attempt,
      answers: updatedAnswers
    });
  };

  const handleNext = () => {
    if (!attempt || !quiz) return;

    if (attempt.currentQuestion < quiz.questions.length - 1) {
      setAttempt({
        ...attempt,
        currentQuestion: attempt.currentQuestion + 1
      });
    }
  };

  const handlePrevious = () => {
    if (!attempt) return;

    if (attempt.currentQuestion > 0) {
      setAttempt({
        ...attempt,
        currentQuestion: attempt.currentQuestion - 1
      });
    }
  };

  const handleSubmit = () => {
    if (!attempt || !quiz) return;

    // Calculate score
    let score = 0;
    attempt.answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswerIndex) {
        score++;
      }
    });

    // Save result
    const result = {
      id: Date.now().toString(),
      quizId: quiz.id,
      quizTitle: quiz.title,
      userId: user?.id || 'guest',
      answers: attempt.answers.map(a => a ?? -1),
      score,
      total: quiz.questions.length,
      createdAt: new Date()
    };

    const existingResults = JSON.parse(localStorage.getItem('quiz_results') || '[]');
    localStorage.setItem('quiz_results', JSON.stringify([...existingResults, result]));

    // Navigate to results
    navigate(`/quiz/${quiz.id}/result`, { state: { result, quiz } });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quiz || !attempt) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Loading quiz...</h2>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[attempt.currentQuestion];
  const isLastQuestion = attempt.currentQuestion === quiz.questions.length - 1;
  const hasAnswered = attempt.answers[attempt.currentQuestion] !== null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{quiz.title}</h1>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
          </div>
        </div>
        <ProgressBar current={attempt.currentQuestion} total={quiz.questions.length} />
      </div>

      {/* Question Card */}
      <Card className="p-8 bg-gradient-card shadow-quiz animate-fade-in delay-200">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            {currentQuestion.questionText}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  attempt.answers[attempt.currentQuestion] === index
                    ? 'border-primary bg-primary/10 shadow-card'
                    : 'border-border hover:border-primary/50 hover:bg-primary/5'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    attempt.answers[attempt.currentQuestion] === index
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {attempt.answers[attempt.currentQuestion] === index && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    )}
                  </div>
                  <span className="text-foreground font-medium">{option}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-6 border-t border-border">
          <Button
            onClick={handlePrevious}
            variant="outline"
            disabled={attempt.currentQuestion === 0}
            className="w-full sm:w-auto"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex space-x-3">
            {isLastQuestion ? (
              <Button
                onClick={handleSubmit}
                variant="success"
                size="lg"
                disabled={!hasAnswered}
                className="w-full sm:w-auto"
              >
                <Flag className="h-4 w-4 mr-2" />
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                variant="hero"
                disabled={!hasAnswered}
                className="w-full sm:w-auto"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Quiz Info */}
      <div className="mt-6 text-center text-sm text-muted-foreground animate-fade-in delay-400">
        <p>Created by {quiz.createdByUsername} • {quiz.questions.length} questions</p>
      </div>
    </div>
  );
};

export default TakeQuiz;