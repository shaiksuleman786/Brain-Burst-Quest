import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlusCircle, BookOpen, Search, Trophy, Users, Zap } from 'lucide-react';
import plantDecoration from '@/assets/plant-decoration.png';
import fruitsDecoration from '@/assets/fruits-decoration.png';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="hidden lg:block absolute top-10 left-10 w-16 h-16 lg:w-24 lg:h-24 opacity-80 animate-bounce-gentle">
        <img src={plantDecoration} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="hidden lg:block absolute top-40 right-16 w-30 h-40 lg:w-42 lg:h-52 opacity-70 animate-bounce-gentle delay-1000">
        <img src={fruitsDecoration} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="hidden md:block absolute bottom-20 left-20 w-12 h-12 lg:w-20 lg:h-20 bg-accent/20 rounded-full animate-bounce-gentle delay-500"></div>
      <div className="hidden md:block absolute bottom-32 right-10 w-10 h-10 lg:w-16 lg:h-16 bg-primary/20 rounded-full animate-bounce-gentle delay-700"></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center py-8 md:py-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6">
            Brain Burst 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Quest</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 px-4">
            Create engaging quizzes, challenge your knowledge, and compete with friends. 
            The most fun way to learn and test yourself!
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-md sm:max-w-none mx-auto mb-6 md:mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-2 mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">1.2K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/20 rounded-full mb-2 mx-auto">
                <BookOpen className="h-6 w-6 text-accent-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Quizzes</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-success/20 rounded-full mb-2 mx-auto">
                <Trophy className="h-6 w-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-foreground">10K+</div>
              <div className="text-sm text-muted-foreground">Attempts</div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12 md:mb-16 px-4 sm:px-0">
          <Card className="p-8 text-center bg-gradient-card hover:shadow-quiz transition-all duration-300 hover:scale-105 animate-fade-in delay-200">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <PlusCircle className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Create Quiz</h3>
            <p className="text-muted-foreground mb-6">
              Build your own quiz with custom questions and share it with the world. 
              It's easy and fun!
            </p>
            <Button asChild variant="hero" size="lg" className="w-full">
              <Link to="/create">
                Start Creating
                <Zap className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </Card>

          <Card className="p-8 text-center bg-gradient-card hover:shadow-quiz transition-all duration-300 hover:scale-105 animate-fade-in delay-400">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-accent-foreground" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Take Quiz</h3>
            <p className="text-muted-foreground mb-6">
              Challenge yourself with quizzes created by our community. 
              Test your knowledge across various topics!
            </p>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link to="/browse">
                Browse Quizzes
                <Search className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </Card>

          <Card className="p-8 text-center bg-gradient-card hover:shadow-quiz transition-all duration-300 hover:scale-105 animate-fade-in delay-600">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-success-foreground" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">View Results</h3>
            <p className="text-muted-foreground mb-6">
              Track your progress, see your scores, and compare with others. 
              Celebrate your achievements!
            </p>
            <Button asChild variant="secondary" size="lg" className="w-full">
              <Link to="/profile">
                My Profile
                <Users className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </Card>
        </div>

        {/* Features Section */}
        <div className="text-center py-12 md:py-16 animate-fade-in delay-800 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Why Choose Brain Burst Quest?</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mt-6 md:mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Lightning Fast</h4>
              <p className="text-sm text-muted-foreground">Quick and responsive quiz experience</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-accent-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Community Driven</h4>
              <p className="text-sm text-muted-foreground">Created by users, for users</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-6 w-6 text-success" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Track Progress</h4>
              <p className="text-sm text-muted-foreground">Monitor your learning journey</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-warning-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Diverse Topics</h4>
              <p className="text-sm text-muted-foreground">Quizzes on every subject imaginable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;