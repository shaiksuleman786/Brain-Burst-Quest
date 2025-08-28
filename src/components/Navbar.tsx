import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';
import { Brain, User, LogOut, Home, PlusCircle, BookOpen, Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-bold hidden sm:block">Brain Burst Quest</span>
            <span className="text-lg font-bold sm:hidden">BBQ</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
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

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-4 mt-8">
                  <Button 
                    asChild 
                    variant={isActive('/') ? 'default' : 'ghost'} 
                    className="justify-start"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to="/">
                      <Home className="h-4 w-4 mr-2" />
                      Home
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild 
                    variant={isActive('/browse') ? 'default' : 'ghost'} 
                    className="justify-start"
                    onClick={() => setIsOpen(false)}
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
                      className="justify-start"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to="/create">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create
                      </Link>
                    </Button>
                  )}

                  <div className="border-t pt-4 mt-4">
                    {user ? (
                      <div className="space-y-2">
                        <Button 
                          asChild 
                          variant={isActive('/profile') ? 'default' : 'ghost'} 
                          className="justify-start w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link to="/profile">
                            <User className="h-4 w-4 mr-2" />
                            {user.username}
                          </Link>
                        </Button>
                        <Button 
                          onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                          }} 
                          variant="outline" 
                          className="justify-start w-full"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Button 
                          asChild 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link to="/login">Login</Link>
                        </Button>
                        <Button 
                          asChild 
                          variant="hero" 
                          className="w-full"
                          onClick={() => setIsOpen(false)}
                        >
                          <Link to="/register">Sign Up</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <div className="flex items-center space-x-2">
                <Button 
                  asChild 
                  variant={isActive('/profile') ? 'default' : 'ghost'} 
                  size="sm"
                >
                  <Link to="/profile">
                    <User className="h-4 w-4 mr-2" />
                    <span className="hidden lg:inline">{user.username}</span>
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