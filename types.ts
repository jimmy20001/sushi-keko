export interface User {
  id: number;
  name: string;
  points: number;
  loyalty_tier: 'bronze' | 'silver' | 'gold';
  purchaseHistory: number[];
  challengeProgress: { [challengeId: number]: number };
}

export interface MenuItem {
  id: number;
  category: { en: string; pl: string };
  name: { en: string; pl: string };
  description: { en: string; pl: string };
  price: number;
  imageUrl: string;
  isVegan: boolean;
  isGlutenFree: boolean;
}

export interface VendingMachine {
  id: number;
  name: string;
  locationDescription: { en: string; pl: string };
  latitude: number;
  longitude: number;
  stockStatus: 'in_stock' | 'low' | 'out_of_stock';
}

export interface Reward {
  id: number;
  name: { en: string; pl: string };
  pointsRequired: number;
  tierRequired: 'bronze' | 'silver' | 'gold';
  imageUrl: string;
}

export interface Challenge {
  id: number;
  title: { en: string; pl: string };
  description: { en: string; pl: string };
  bonusPoints: number;
  goal: number;
}

export interface AllergenItem {
  id: string;
  name: { en: string; pl: string };
  description: { en: string; pl: string };
  allergens: string[];
}

export interface AIRecommendation {
  recommendation: {
    name: string;
    description: string;
  };
  pairing: {
    name: string;
    description: string;
  };
}

export type Language = 'en' | 'pl';

export interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

// Types for the new Dashboard "For You" section
interface ChallengeCardData {
  type: 'challenge';
  title_en: string;
  title_pl: string;
  progress: number; // 0 to 1
}

interface RecommendationCardData {
  type: 'recommendation';
  menu_item_id: number;
  name_en: string;
  name_pl: string;
  image_url: string;
}

interface LocationStockCardData {
  type: 'location_stock';
  machine_name: string;
  item_name_en: string;
  item_name_pl: string;
}

export type DashboardCardData = ChallengeCardData | RecommendationCardData | LocationStockCardData;

export interface ForYouResponse {
  cards: DashboardCardData[];
}

export interface ScanResponse {
  success: true;
  points_added: number;
  bonus_points: number;
  challenge_completed_en: string | null;
  challenge_completed_pl: string | null;
  new_total_points: number;
}

export interface ScanErrorResponse {
  success: false;
  error: string;
}