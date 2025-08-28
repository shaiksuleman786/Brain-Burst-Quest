import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { Quiz, QuizResult } from '@/types/quiz';
import { QuizCard } from '@/components/QuizCard';
import { User, BookOpen, Trophy, Calendar, Target, TrendingUp } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myQuizzes, setMyQuizzes] = useState<Quiz[]>([]);
  const [myResults, setMyResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load user's quizzes
    const storedQuizzes = localStorage.getItem('quiz_quizzes');
    if (storedQuizzes) {
      const allQuizzes = JSON.parse(storedQuizzes);
      const userQuizzes = allQuizzes.filter((quiz: Quiz) => quiz.createdBy === user.id);
      setMyQuizzes(userQuizzes);
    }

    // Load user's results  
    const storedResults = localStorage.getItem('quiz_results');
    if (storedResults) {
      const allResults = JSON.parse(storedResults);
      const userResults = allResults.filter((result: QuizResult) => result.userId === user.id);
      setMyResults(userResults);
    }
  }, [user, navigate]);

  const handleTakeQuiz = (quizId: string) => {
    navigate(`/quiz/${quizId}`);
  };

  if (!user) {
    return null;
  }

  const totalQuizzes = myQuizzes.length;
  const totalAttempts = myResults.length;
  const averageScore = myResults.length > 0 
    ? Math.round(myResults.reduce((sum, result) => sum + (result.score / result.total), 0) / myResults.length * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">{user.username}</h1>
            <p className="text-xl text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-6 text-center bg-gradient-card shadow-card">
            <div className="flex justify-center mb-2">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{totalQuizzes}</div>
            <div className="text-sm text-muted-foreground">Quizzes Created</div>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-card shadow-card">
            <div className="flex justify-center mb-2">
              <Target className="h-8 w-8 text-accent-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">{totalAttempts}</div>
            <div className="text-sm text-muted-foreground">Quizzes Taken</div>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-card shadow-card">
            <div className="flex justify-center mb-2">
              <Trophy className="h-8 w-8 text-success" />
            </div>
            <div className="text-2xl font-bold text-foreground">{averageScore}%</div>
            <div className="text-sm text-muted-foreground">Average Score</div>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-card shadow-card">
            <div className="flex justify-center mb-2">
              <Calendar className="h-8 w-8 text-warning-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
            <div className="text-sm text-muted-foreground">Member Since</div>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="my-quizzes" className="animate-fade-in delay-200">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="my-quizzes">My Quizzes</TabsTrigger>
          <TabsTrigger value="my-results">My Results</TabsTrigger>
        </TabsList>

        {/* My Quizzes Tab */}
        <TabsContent value="my-quizzes">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-foreground">Quizzes I Created</h2>
              <Button asChild variant="hero">
                <a href="/create">Create New Quiz</a>
              </Button>
            </div>

            {myQuizzes.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myQuizzes.map((quiz, index) => (
                  <div key={quiz.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <QuizCard quiz={quiz} onTakeQuiz={handleTakeQuiz} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center bg-gradient-card">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No quizzes yet</h3>
                <p className="text-muted-foreground mb-6">Create your first quiz and share it with the world!</p>
                <Button asChild variant="hero">
                  <a href="/create">Create Your First Quiz</a>
                </Button>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* My Results Tab */}
        <TabsContent value="my-results">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">My Quiz Attempts</h2>

            {myResults.length > 0 ? (
              <div className="space-y-4">
                {myResults
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((result, index) => {
                    const percentage = Math.round((result.score / result.total) * 100);
                    const getScoreColor = () => {
                      if (percentage >= 80) return "text-success";
                      if (percentage >= 60) return "text-warning-foreground";
                      return "text-destructive";
                    };

                    return (
                      <Card key={result.id} className="p-6 bg-gradient-card shadow-card animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">{result.quizTitle}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(result.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Target className="h-4 w-4" />
                                <span>{result.score}/{result.total} correct</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getScoreColor()}`}>
                              {percentage}%
                            </div>
                            <Button
                              onClick={() => navigate(`/quiz/${result.quizId}`)}
                              variant="outline"
                              size="sm"
                              className="mt-2"
                            >
                              Retake
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
              </div>
            ) : (
              <Card className="p-12 text-center bg-gradient-card">
                <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No quiz attempts yet</h3>
                <p className="text-muted-foreground mb-6">Start taking quizzes to track your progress!</p>
                <Button asChild variant="hero">
                  <a href="/browse">Browse Quizzes</a>
                </Button>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;