import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { User, LogOut, Home, PlusCircle, BookOpen } from 'lucide-react';
import brainBurstLogo from '@/assets/brain-burst-logo-new.svg';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Button 
              asChild 
              variant={isActive('/') ? 'default' : 'ghost'} 
              size="sm"
            >
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant={isActive('/browse') ? 'default' : 'ghost'} 
              size="sm"
            >
              <Link to="/browse">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse
              </Link>
            </Button>

            {user && (
              <Button 
                asChild 
                variant={isActive('/create') ? 'default' : 'ghost'} 
                size="sm"
              >
                <Link to="/create">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create
                </Link>
              </Button>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {user ? (
              <div className="flex items-center space-x-2">
                <Button 
                  asChild 
                  variant={isActive('/profile') ? 'default' : 'ghost'} 
                  size="sm"
                >
                  <Link to="/profile">
                    <User className="h-4 w-4 mr-2" />
                    {user.username}
                  </Link>
                </Button>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="hero" size="sm">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};