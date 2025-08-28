import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { QuizCard } from '@/components/QuizCard';
import { Quiz } from '@/types/quiz';
import { Search, Filter } from 'lucide-react';

const Browse: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load quizzes from localStorage (mock database)
    const storedQuizzes = localStorage.getItem('quiz_quizzes');
    if (storedQuizzes) {
      const parsedQuizzes = JSON.parse(storedQuizzes);
      setQuizzes(parsedQuizzes);
      setFilteredQuizzes(parsedQuizzes);
    } else {
      // Add some sample quizzes if none exist
      const sampleQuizzes: Quiz[] = [
        {
          id: '1',
          title: 'General Knowledge Quiz',
          description: 'Test your knowledge across various subjects including science, history, and geography.',
          createdBy: 'admin',
          createdByUsername: 'Quiz Master',
          isPublic: true,
          createdAt: new Date('2024-01-15'),
          questions: [
            {
              id: '1',
              questionText: 'What is the capital of France?',
              options: ['London', 'Paris', 'Berlin', 'Madrid'],
              correctAnswerIndex: 1
            },
            {
              id: '2',
              questionText: 'Which planet is known as the Red Planet?',
              options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
              correctAnswerIndex: 1
            },
            {
              id: '3',
              questionText: 'Who painted the Mona Lisa?',
              options: ['Van Gogh', 'Picasso', 'Leonardo da Vinci', 'Michelangelo'],
              correctAnswerIndex: 2
            }
          ]
        },
        {
          id: '2',
          title: 'Science & Technology',
          description: 'Explore the fascinating world of science and modern technology.',
          createdBy: 'admin',
          createdByUsername: 'Science Guru',
          isPublic: true,
          createdAt: new Date('2024-01-20'),
          questions: [
            {
              id: '1',
              questionText: 'What does DNA stand for?',
              options: ['Deoxyribonucleic Acid', 'Dynamic Nuclear Analysis', 'Digital Network Access', 'Data Network Architecture'],
              correctAnswerIndex: 0
            },
            {
              id: '2',
              questionText: 'Which programming language is known for web development?',
              options: ['Python', 'JavaScript', 'C++', 'Java'],
              correctAnswerIndex: 1
            }
          ]
        }
      ];
      localStorage.setItem('quiz_quizzes', JSON.stringify(sampleQuizzes));
      setQuizzes(sampleQuizzes);
      setFilteredQuizzes(sampleQuizzes);
    }
  }, []);

  useEffect(() => {
    // Filter quizzes based on search query
    const filtered = quizzes.filter(quiz => 
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.createdByUsername.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuizzes(filtered);
  }, [searchQuery, quizzes]);

  const handleTakeQuiz = (quizId: string) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Browse Quizzes</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6">
          Discover amazing quizzes created by our community
        </p>
        
        {/* Search Bar */}
        <div className="relative max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Found {filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'es' : ''}
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {filteredQuizzes.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredQuizzes.map((quiz, index) => (
              <div key={quiz.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <QuizCard quiz={quiz} onTakeQuiz={handleTakeQuiz} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No quizzes found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'Try adjusting your search terms.' : 'Be the first to create a quiz!'}
            </p>
            <Button asChild variant="hero">
              <a href="/create">Create Your First Quiz</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;