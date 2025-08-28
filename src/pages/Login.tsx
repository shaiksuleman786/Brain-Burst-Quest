import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Brain, Mail, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate('/');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <Brain className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue your quiz journey</p>
        </div>

        <Card className="p-8 bg-gradient-card shadow-quiz animate-fade-in delay-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              variant="hero"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="text-center">
              <p className="text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center mb-2">Demo credentials:</p>
              <div className="text-xs text-center space-y-1">
                <p>Email: demo@example.com</p>
                <p>Password: demo123</p>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;