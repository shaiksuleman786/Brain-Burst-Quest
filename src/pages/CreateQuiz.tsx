import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Quiz, Question } from '@/types/quiz';
import { Plus, Minus, Save, Eye } from 'lucide-react';

const CreateQuiz: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Omit<Question, 'id'>[]>([
    {
      questionText: '',
      options: ['', ''],
      correctAnswerIndex: 0
    }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, {
      questionText: '',
      options: ['', ''],
      correctAnswerIndex: 0
    }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    (updated[index] as any)[field] = value;
    setQuestions(updated);
  };

  const addOption = (questionIndex: number) => {
    if (questions[questionIndex].options.length < 6) {
      const updated = [...questions];
      updated[questionIndex].options.push('');
      setQuestions(updated);
    }
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    if (questions[questionIndex].options.length > 2) {
      const updated = [...questions];
      updated[questionIndex].options.splice(optionIndex, 1);
      // Adjust correct answer index if needed
      if (updated[questionIndex].correctAnswerIndex >= optionIndex) {
        updated[questionIndex].correctAnswerIndex = Math.max(0, updated[questionIndex].correctAnswerIndex - 1);
      }
      setQuestions(updated);
    }
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a quiz.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    // Validation
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a title and description for your quiz.",
        variant: "destructive",
      });
      return;
    }

    const invalidQuestion = questions.findIndex(q => 
      !q.questionText.trim() || 
      q.options.some(opt => !opt.trim()) ||
      q.options.length < 2
    );

    if (invalidQuestion !== -1) {
      toast({
        title: "Invalid question",
        description: `Question ${invalidQuestion + 1} is incomplete. Please fill in all fields.`,
        variant: "destructive",
      });
      return;
    }

    // Create quiz
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      createdBy: user.id,
      createdByUsername: user.username,
      questions: questions.map((q, index) => ({
        ...q,
        id: `${Date.now()}-${index}`,
        questionText: q.questionText.trim(),
        options: q.options.map(opt => opt.trim())
      })),
      createdAt: new Date(),
      isPublic: true
    };

    // Save to localStorage (mock database)
    const existingQuizzes = JSON.parse(localStorage.getItem('quiz_quizzes') || '[]');
    const updatedQuizzes = [...existingQuizzes, newQuiz];
    localStorage.setItem('quiz_quizzes', JSON.stringify(updatedQuizzes));

    toast({
      title: "Quiz created!",
      description: "Your quiz has been successfully created and published.",
    });

    navigate('/browse');
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center bg-gradient-card">
          <h2 className="text-2xl font-bold text-foreground mb-4">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">Please log in to create a quiz.</p>
          <Button asChild variant="hero">
            <a href="/login">Login</a>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Create New Quiz</h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Build an engaging quiz and share it with the world
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Quiz Info */}
        <Card className="p-6 bg-gradient-card shadow-card animate-fade-in delay-200">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Quiz Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Quiz Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging title for your quiz"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what your quiz is about"
                rows={3}
                required
              />
            </div>
          </div>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground">Questions</h2>
            <Button type="button" onClick={addQuestion} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>

          {questions.map((question, qIndex) => (
            <Card key={qIndex} className="p-6 bg-gradient-card shadow-card animate-fade-in">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-foreground">Question {qIndex + 1}</h3>
                {questions.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    variant="outline"
                    size="sm"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Question Text</Label>
                  <Input
                    value={question.questionText}
                    onChange={(e) => updateQuestion(qIndex, 'questionText', e.target.value)}
                    placeholder="Enter your question"
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label>Answer Options</Label>
                    <Button
                      type="button"
                      onClick={() => addOption(qIndex)}
                      variant="outline"
                      size="sm"
                      disabled={question.options.length >= 6}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Option
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={question.correctAnswerIndex === oIndex}
                          onChange={() => updateQuestion(qIndex, 'correctAnswerIndex', oIndex)}
                          className="w-4 h-4 text-primary mt-3 flex-shrink-0"
                        />
                        <Input
                          value={option}
                          onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                          placeholder={`Option ${oIndex + 1}`}
                          className="flex-1 min-w-0"
                          required
                        />
                        {question.options.length > 2 && (
                          <Button
                            type="button"
                            onClick={() => removeOption(qIndex, oIndex)}
                            variant="outline"
                            size="sm"
                            className="flex-shrink-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Select the correct answer by clicking the radio button
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end animate-fade-in delay-400">
          <Button type="button" variant="outline" onClick={() => navigate('/browse')} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto">
            <Save className="h-4 w-4 mr-2" />
            Create Quiz
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;