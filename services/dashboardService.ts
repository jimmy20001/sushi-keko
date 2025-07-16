import { User, ForYouResponse } from '../types';

// Simulates GET /api/user - fetches the current user's data.
export const fetchUser = async (): Promise<User> => {
  // In a real app, this would be a fetch call:
  // const response = await fetch('/api/user');
  // if (!response.ok) throw new Error('Failed to fetch user');
  // return response.json();

  // For demonstration, we'll keep a mock endpoint simulation here.
  const { MOCK_USER } = await import('../constants');
  return new Promise(resolve => setTimeout(() => resolve(MOCK_USER), 500));
};

// Simulates GET /api/dashboard/foryou - fetches personalized cards for the dashboard.
export const fetchForYouCards = async (): Promise<ForYouResponse> => {
  // const response = await fetch('/api/dashboard/foryou');
  // if (!response.ok) throw new Error('Failed to fetch "For You" cards');
  // return response.json();

  const { MOCK_FOR_YOU_RESPONSE } = await import('../constants');
  return new Promise(resolve => setTimeout(() => resolve(MOCK_FOR_YOU_RESPONSE), 800));
};