import { User } from '@/types/quiz';

// Initialize sample data if not exists
export const initializeSampleData = () => {
  // Create demo user if no users exist
  const users = JSON.parse(localStorage.getItem('quiz_users') || '[]');
  if (users.length === 0) {
    const demoUser: User & { password: string } = {
      id: 'demo-user',
      username: 'Quiz Master',
      email: 'demo@example.com',
      password: 'demo123',
      createdAt: new Date('2024-01-01')
    };
    
    localStorage.setItem('quiz_users', JSON.stringify([demoUser]));
  }
};