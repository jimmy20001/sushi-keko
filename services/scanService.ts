import { ScanResponse, ScanErrorResponse } from '../types';

// Simulates POST /api/scan - sends a scanned QR code to the backend for verification.
export const scanCode = async (code: string): Promise<ScanResponse> => {
  // Real implementation:
  // const response = await fetch('/api/scan', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ code })
  // });
  // const data = await response.json();
  // if (!response.ok) {
  //   throw new Error(data.error || 'Failed to process scan');
  // }
  // return data;

  // For demonstration, we'll keep a mock endpoint simulation here.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let response: ScanResponse;
      const basePoints = 10;

      switch (code) {
        case 'SUSHI-KEKO-VALID-NORMAL':
          response = {
            success: true,
            points_added: basePoints,
            bonus_points: 0,
            challenge_completed_en: null,
            challenge_completed_pl: null,
            new_total_points: 1260, // This would be calculated server-side
          };
          resolve(response);
          break;

        case 'SUSHI-KEKO-VALID-CHALLENGE':
          const bonusPoints = 50;
          response = {
            success: true,
            points_added: basePoints,
            bonus_points: bonusPoints,
            challenge_completed_en: "Vegan Voyager Challenge!",
            challenge_completed_pl: "Wyzwanie Wegański Podróżnik!",
            new_total_points: 1310, // This would be calculated server-side
          };
          resolve(response);
          break;

        default:
          // In a real fetch, this would be handled by the .ok check
          reject({ success: false, error: "Invalid or expired code." });
          break;
      }
    }, 1500);
  });
};