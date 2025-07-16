import { User, MenuItem, Reward, VendingMachine, Translations, Challenge, ForYouResponse, AllergenItem } from './types';

export const MOCK_USER: User = {
    id: 1,
    name: 'Keko Fan',
    points: 1250,
    loyalty_tier: 'silver',
    purchaseHistory: [101, 201],
    challengeProgress: {
        1: 2,
        2: 1,
    }
};

export const MOCK_FOR_YOU_RESPONSE: ForYouResponse = {
    cards: [
        { type: 'challenge', title_en: 'Variety Seeker', title_pl: 'Poszukiwacz Różnorodności', progress: 0.66 },
        { type: 'recommendation', menu_item_id: 202, name_en: 'Uramaki U2', name_pl: 'Uramaki U2', image_url: 'https://picsum.photos/seed/sushi202/400/300' },
        { type: 'location_stock', machine_name: 'Central Station', item_name_en: 'Your favorite F1 Futomaki is in stock!', item_name_pl: 'Twoje ulubione Futomaki F1 jest dostępne!' },
        { type: 'recommendation', menu_item_id: 104, name_en: 'Futomaki F4W (vege)', name_pl: 'Futomaki F4W (vege)', image_url: 'https://picsum.photos/seed/sushi104/400/300' },
    ]
};

// REMOVED: `ALLERGEN_INFO_PL` string is deprecated.

// NEW: Structured, bilingual allergen data for the redesigned page.
export const ALLERGEN_DATA: AllergenItem[] = [
    {
        id: 'nori',
        name: { en: 'Nori', pl: 'Nori' },
        description: {
            en: 'Sheets of toasted purple algae of the Porphyra genus (Red Algae), sourced from sea farms, dried at high temperature.',
            pl: 'Arkusze prażonych purpurowych glonów z rodzaju Porphyra (Krasnorosty), pozyskiwanych z hodowli morskich, suszone w wysokiej temperaturze.',
        },
        allergens: [],
    },
    {
        id: 'rice',
        name: { en: 'Rice', pl: 'Ryż' },
        description: {
            en: 'Cream cheese, milk roll, salt, thickening agent (locust bean gum).',
            pl: 'Serek śmietankowy, bułka mleka, sól, substancja zagęszczająca (mączka chleba świętojańskiego).',
        },
        allergens: ['milk'],
    },
    {
        id: 'cream-cheese',
        name: { en: 'Cream Cheese', pl: 'Serek' },
        description: {
            en: 'Cream cheese, water, acidity regulators (acetic acid, citric acid), preservative (potassium sorbate), sweeteners (aspartame, acesulfame K, saccharins), color (riboflavin).',
            pl: 'Serek śmietankowy, woda, regulatory kwasowości (kwas octowy, kwas cytrynowy), substancja konserwująca (sorbinian potasu), substancje słodzące (aspartam, acesulfam K, sacharyny), barwnik (ryboflawina).',
        },
        allergens: ['milk'],
    },
    {
        id: 'crab-stick-salad',
        name: { en: 'Crab Stick Salad', pl: 'Sałatka z paluszka krabowego' },
        description: {
            en: 'Crab stick*, mayonnaise*.',
            pl: 'Paluszek krabowy*, majonez*.',
        },
        allergens: ['crustaceans', 'egg', 'soy', 'gluten', 'fish', 'mustard'],
    },
    {
        id: 'salmon-tartare',
        name: { en: 'Raw Salmon Tartare', pl: 'Tatar z surowego łososia' },
        description: {
            en: 'Raw salmon, chives, sesame, salt, soy sauce*, sriracha hot chili sauce*, Japanese spice mix Shichimi Togarashi*.',
            pl: 'Surowy łosoś, szczypior, sezam, sól, sos sojowy*, sos chili sriracha hot*, japońska mieszanka przypraw Shichimi Togarashi*.',
        },
        allergens: ['fish', 'sesame', 'soy', 'gluten'],
    },
    {
        id: 'shrimp-panko',
        name: { en: 'Shrimp in Panko', pl: 'Krewetki w panko' },
        description: {
            en: 'Shrimp, tempura, panko, chili mayo*.',
            pl: 'Krewetki, tempura, panko, chili majo*.',
        },
        allergens: ['crustaceans', 'gluten', 'egg', 'mustard'],
    },
    {
        id: 'soy-sauce',
        name: { en: 'Soy Sauce*', pl: 'Sos sojowy*' },
        description: {
            en: 'Water, soy, wheat, salt.',
            pl: 'Woda, soja, pszenica, sól.',
        },
        allergens: ['soy', 'gluten'],
    },
    {
        id: 'chili-mayo',
        name: { en: 'Chili Mayo*', pl: 'Chili majo*' },
        description: {
            en: 'Mayonnaise*, sriracha hot chili sauce*.',
            pl: 'Majonez*, sos chili sriracha hot*.',
        },
        allergens: ['egg', 'mustard'],
    },
    {
        id: 'crab-stick',
        name: { en: 'Crab Stick*', pl: 'Paluszek krabowy*' },
        description: {
            en: 'Water, surimi (white fish meat, sugar, stabilizers), wheat starch, tapioca starch, sugar, rapeseed oil, salt, soy protein, powdered egg white, flavorings, flavor enhancers, color (carmine, paprika extract). Contains crustaceans.',
            pl: 'Woda, surimi (mięso białych ryb, cukier, stabilizatory) skrobia pszenna, skrobia z tapioki, cukier, olej rzepakowy, sól, białko sojowe, białko jaja w proszku, aromaty, wzmacniacze smaku, barwnik (karmin, ekstrakt z papryki). Zawierają skorupiaki.',
        },
        allergens: ['fish', 'gluten', 'soy', 'egg', 'crustaceans'],
    },
];


export const MENU_ITEMS: MenuItem[] = [
    { id: 1, category: { en: "Appetizers", pl: "Przystawki" }, name: { en: 'Chicken in panko', pl: 'Kurczaki w panko' }, description: { en: '6 pcs chicken in tempura and panko, chili mayo', pl: 'kurczak 6 szt. w tempurze i panko, chilimajo' }, price: 32.00, imageUrl: 'https://picsum.photos/seed/sushi1/400/300', isVegan: false, isGlutenFree: false },
    { id: 2, category: { en: "Appetizers", pl: "Przystawki" }, name: { en: 'Mini spring rolls', pl: 'Mini sajgonki' }, description: { en: '15 pcs mini spring rolls with vegetables, sweet chili sauce', pl: 'Mini sajgonki 15 szt. papier pszenny, kapusta, groszek zielony, marchew, cebula, fasola mung, imbir, czosnek, olej sezamowy, pieprz, sos sojowy, cukier, sól, sos słodkie chili' }, price: 20.00, imageUrl: 'https://picsum.photos/seed/sushi2/400/300', isVegan: false, isGlutenFree: false },
    { id: 3, category: { en: "Appetizers", pl: "Przystawki" }, name: { en: 'Fried trigonki', pl: 'Trigonki smażone' }, description: { en: '15 pcs fried trigonki with vegetable filling, Teriyaki sauce', pl: 'Trigonki smażone 15 szt. mąka pszenna, kapusta, marchew, ziemniaki, cebula, soja, oleje: sojowy, sezamowy, orzechowy, sól, cukier, pieprz czarny, curry, sos Teriyaki 15 ml' }, price: 20.00, imageUrl: 'https://picsum.photos/seed/sushi3/400/300', isVegan: false, isGlutenFree: false },

    { id: 101, category: { en: "Futomaki", pl: "Futomaki" }, name: { en: 'F1 (10 pcs)', pl: 'F1 (10 szt.)' }, description: { en: 'rice, raw salmon, avocado, cucumber, lettuce, cream cheese, nori', pl: 'ryż, surowy łosoś, awokado, ogórek, sałata, serek, nori' }, price: 36.00, imageUrl: 'https://picsum.photos/seed/sushi101/400/300', isVegan: false, isGlutenFree: false },
    { id: 102, category: { en: "Futomaki", pl: "Futomaki" }, name: { en: 'F2 (10 pcs)', pl: 'F2 (10 szt.)' }, description: { en: 'rice, raw salmon, calabash, turnip, cucumber, lettuce, cream cheese, nori', pl: 'ryż, surowy łosoś, tykwa, rzepa, ogórek, sałata, serek, nori' }, price: 36.00, imageUrl: 'https://picsum.photos/seed/sushi102/400/300', isVegan: false, isGlutenFree: false },
    { id: 103, category: { en: "Futomaki", pl: "Futomaki" }, name: { en: 'F3 (10 pcs)', pl: 'F3 (10 szt.)' }, description: { en: 'rice, baked salmon, calabash, cucumber, lettuce, cream cheese, nori', pl: 'ryż, pieczony łosoś, tykwa, ogórek, sałata, serek, nori' }, price: 36.00, imageUrl: 'https://picsum.photos/seed/sushi103/400/300', isVegan: false, isGlutenFree: false },
    { id: 104, category: { en: "Futomaki", pl: "Futomaki" }, name: { en: 'F4W (10 pcs)', pl: 'F4W (10 szt.)' }, description: { en: 'rice, avocado, calabash, turnip, cucumber, lettuce, cream cheese, nori', pl: 'ryż, awokado, tykwa, rzepa, ogórek, sałata, serek, nori' }, price: 25.00, imageUrl: 'https://picsum.photos/seed/sushi104/400/300', isVegan: true, isGlutenFree: false },
    { id: 105, category: { en: "Futomaki", pl: "Futomaki" }, name: { en: 'F6 (10 pcs)', pl: 'F6 (10 szt.)' }, description: { en: 'rice, chicken in tempura and panko, cucumber, lettuce, cream cheese, nori', pl: 'ryż, kurczak w tempurze i panko, ogórek, sałata, serek, nori' }, price: 27.00, imageUrl: 'https://picsum.photos/seed/sushi105/400/300', isVegan: false, isGlutenFree: false },

    { id: 201, category: { en: "Uramaki", pl: "Uramaki" }, name: { en: 'U1 (10 pcs)', pl: 'U1 (10 szt.)' }, description: { en: 'rice, raw salmon, avocado, cream cheese, nori, sesame', pl: 'ryż, surowy łosoś, awokado, serek, nori, sezam' }, price: 36.00, imageUrl: 'https://picsum.photos/seed/sushi201/400/300', isVegan: false, isGlutenFree: false },
    { id: 202, category: { en: "Uramaki", pl: "Uramaki" }, name: { en: 'U2 (10 pcs)', pl: 'U2 (10 szt.)' }, description: { en: 'rice, raw salmon, mango, cream cheese, nori, sesame', pl: 'ryż, surowy łosoś, mango, serek, nori, sezam' }, price: 36.00, imageUrl: 'https://picsum.photos/seed/sushi202/400/300', isVegan: false, isGlutenFree: false },
    { id: 203, category: { en: "Uramaki", pl: "Uramaki" }, name: { en: 'U5 (10 pcs)', pl: 'U5 (10 szt.)' }, description: { en: 'rice, shrimp in tempura and panko, turnip, cucumber, chili mayo, nori, tobiko', pl: 'ryż, krewetka w tempurze i panko, rzepa, ogórek, chili majo, nori, tobiko' }, price: 29.00, imageUrl: 'https://picsum.photos/seed/sushi203/400/300', isVegan: false, isGlutenFree: false },

    { id: 301, category: { en: "Hosomaki", pl: "Hosomaki" }, name: { en: 'H1 (10 pcs)', pl: 'H1 (10 szt.)' }, description: { en: 'rice, cucumber, nori', pl: 'ryż, ogórek, nori' }, price: 20.00, imageUrl: 'https://picsum.photos/seed/sushi301/400/300', isVegan: true, isGlutenFree: false },
    { id: 302, category: { en: "Hosomaki", pl: "Hosomaki" }, name: { en: 'H4 (10 pcs)', pl: 'H4 (10 szt.)' }, description: { en: 'rice, raw salmon, nori', pl: 'ryż, surowy łosoś, nori' }, price: 27.00, imageUrl: 'https://picsum.photos/seed/sushi302/400/300', isVegan: false, isGlutenFree: false },

    { id: 401, category: { en: "Sets", pl: "Zestawy" }, name: { en: 'Kumamoto (20 pcs)', pl: 'Kumamoto (20 szt.)' }, description: { en: 'F6, H1', pl: 'F6 (ryż, kurczak w tempurze i panko, ogórek, sałata, serek, nori), H1 (ryż, ogórek, nori)' }, price: 43.00, imageUrl: 'https://picsum.photos/seed/sushi401/400/300', isVegan: false, isGlutenFree: false },
    { id: 402, category: { en: "Sets", pl: "Zestawy" }, name: { en: 'Saitama (30 pcs)', pl: 'Saitama (30 szt.)' }, description: { en: 'F2, F3, F7', pl: 'F2 (ryż, surowy łosoś, tykwa, rzepa, ogórek, sałata, serek, nori), F3 (ryż, pieczony łosoś, tykwa, ogórek, sałata, serek, nori), F7 (ryż, krewetka w tempurze i panko, rzepa, ogórek, sałata, chili majo, nori)' }, price: 96.00, imageUrl: 'https://picsum.photos/seed/sushi402/400/300', isVegan: false, isGlutenFree: false },
    { id: 403, category: { en: "Sets", pl: "Zestawy" }, name: { en: 'Party 1 (48 pcs)', pl: 'Party 1 (48 szt.)' }, description: { en: 'F9, U5, H3T, SG01, KU01', pl: 'F9, U5, H3T, Sajgonki, Kurczak w panko' }, price: 150.00, imageUrl: 'https://picsum.photos/seed/sushi403/400/300', isVegan: false, isGlutenFree: false },
];

export const REWARDS: Reward[] = [
    { id: 1, name: { en: 'Free Miso Soup', pl: 'Darmowa Zupa Miso' }, pointsRequired: 500, tierRequired: 'bronze', imageUrl: 'https://picsum.photos/seed/reward1/400/300' },
    { id: 2, name: { en: '50% Off Any Roll', pl: '50% Zniżki na Dowolną Rolkę' }, pointsRequired: 1000, tierRequired: 'silver', imageUrl: 'https://picsum.photos/seed/reward2/400/300' },
    { id: 3, name: { en: 'Free Dragon Roll', pl: 'Darmowa Smocza Rolka' }, pointsRequired: 2500, tierRequired: 'gold', imageUrl: 'https://picsum.photos/seed/reward3/400/300' },
];

export const CHALLENGES: Challenge[] = [
    { id: 1, title: { en: 'Variety Seeker', pl: 'Poszukiwacz Różnorodności' }, description: { en: 'Try 3 different sushi rolls.', pl: 'Spróbuj 3 różnych rolek sushi.' }, bonusPoints: 100, goal: 3 },
    { id: 2, title: { en: 'Welcome Bonus', pl: 'Bonus Powitalny' }, description: { en: 'Make your first purchase.', pl: 'Zrób swój pierwszy zakup.' }, bonusPoints: 50, goal: 1 },
    { id: 3, title: { en: 'Vegan Voyager', pl: 'Wegański Podróżnik' }, description: { en: 'Try 2 different vegan items.', pl: 'Spróbuj 2 różnych dań wegańskich.' }, bonusPoints: 150, goal: 2 },
];

export const VENDING_MACHINES: VendingMachine[] = [
    {
        id: 1,
        name: 'Odrzańskie Ogrody',
        locationDescription: {
            en: 'Kędzierzyn-Koźle, Al. Armii Krajowej 38, Odrzańskie Ogrody, 1st floor food court',
            pl: 'Kędzierzyn - Al. Armii Krajowej 38, Odrzańskie Ogrody, I piętro strefa gastronomiczna'
        },
        latitude: 50.3418,
        longitude: 18.2166,
        stockStatus: 'in_stock'
    },
    {
        id: 2,
        name: 'Plac Targowy TEDi',
        locationDescription: {
            en: 'Strzelce Opolskie, Plac Targowy 3, next to TEDi store',
            pl: 'Strzelce Opolskie - Plac Targowy 3, obok sklepu TEDi'
        },
        latitude: 50.5103,
        longitude: 18.3001,
        stockStatus: 'in_stock'
    },
    {
        id: 3,
        name: 'MAXPOL Krapkowice',
        locationDescription: {
            en: 'Krapkowice, ul. Moniuszki 1, next to MAXPOL butcher shop',
            pl: 'Krapkowice, ul. Moniuszki 1, obok sklepu mięsnego MAXPOL'
        },
        latitude: 50.4745,
        longitude: 17.9655,
        stockStatus: 'in_stock'
    },
    {
        id: 4,
        name: 'GS Zdzieszowice',
        locationDescription: {
            en: 'Zdzieszowice, ul. Góry Świętej Anny 6, next to GS store',
            pl: 'Zdzieszowice - ul. Góry Świętej Anny 6, obok sklepu GS'
        },
        latitude: 50.4194,
        longitude: 18.1256,
        stockStatus: 'low'
    },
    {
        id: 5,
        name: 'ROSSMANN Głogówek',
        locationDescription: {
            en: 'Głogówek, ul. Piotra Skargi 15a, next to ROSSMANN store',
            pl: 'Głogówek - ul. Piotra Skargi 15a, obok sklepu ROSSMANN'
        },
        latitude: 50.3541,
        longitude: 17.8653,
        stockStatus: 'in_stock'
    },
    {
        id: 6,
        name: 'LIDL Prudnik',
        locationDescription: {
            en: 'Prudnik, ul. Powstańców Śląskich 2/4, next to LIDL store',
            pl: 'Prudnik - ul. Powstańców Śląskich 2/4, obok sklepu LIDL'
        },
        latitude: 50.3204,
        longitude: 17.5815,
        stockStatus: 'in_stock'
    },
    {
        id: 7,
        name: 'KRISTOF i JANETA Koźle',
        locationDescription: {
            en: 'Koźle, ul. Gazowa 1B, parking next to KRISTOF i JANETA store',
            pl: 'Koźle - ul. Gazowa 1B, parking obok sklepu KRISTOF i JANETA'
        },
        latitude: 50.3475,
        longitude: 18.1565,
        stockStatus: 'out_of_stock'
    },
    {
        id: 8,
        name: 'LIDL Kędzierzyn-Koźle',
        locationDescription: {
            en: 'Kędzierzyn-Koźle, Al. J. Pawła II 39, next to LIDL store',
            pl: 'Kędzierzyn - Al. J. Pawła II 39, obok sklepu LIDL'
        },
        latitude: 50.3496,
        longitude: 18.2045,
        stockStatus: 'in_stock'
    },
    {
        id: 9,
        name: 'Centrum Handlowe EMMA',
        locationDescription: {
            en: 'Opole, ul. Niemodlińska 21, EMMA shopping center',
            pl: 'Opole - ul. Niemodlińska 21, centrum handlowe EMMA'
        },
        latitude: 50.6609,
        longitude: 17.8863,
        stockStatus: 'low'
    },
    {
        id: 10,
        name: 'MERKURY Głuchołazy',
        locationDescription: {
            en: 'Głuchołazy, ul. Wyszyńskiego 9A, next to MERKURY store',
            pl: 'Głuchołazy - ul. Wyszyńskiego 9A, obok sklepu MERKURY'
        },
        latitude: 50.3134,
        longitude: 17.3751,
        stockStatus: 'in_stock'
    },
];

export const STRINGS: Translations = {
    // General
    appName: { en: 'Sushi Keko', pl: 'Sushi Keko' },
    points: { en: 'Points', pl: 'Punkty' },
    forYou: { en: 'For You', pl: 'Dla Ciebie' },

    // Greetings
    greetingMorning: { en: 'Good morning', pl: 'Dzień dobry' },
    greetingAfternoon: { en: 'Good afternoon', pl: 'Dzień dobry' },
    greetingEvening: { en: 'Good evening', pl: 'Dobry wieczór' },
    yourPoints: { en: 'Your Points', pl: 'Twoje Punkty' },

    // Card Specifics
    challengeProgress: { en: 'Progress', pl: 'Postęp' },
    recommendation: { en: 'Recommendation', pl: 'Rekomendacja' },
    inStockAt: { en: 'In Stock At', pl: 'Dostępne w' },
    viewMenu: { en: 'View Menu', pl: 'Zobacz Menu' },
    viewLocations: { en: 'View Locations', pl: 'Zobacz Lokalizacje' },

    // Navigation
    navDashboard: { en: 'Dashboard', pl: 'Panel' },
    navMenu: { en: 'Menu', pl: 'Menu' },
    navLocations: { en: 'Locations', pl: 'Lokalizacje' },
    navRewards: { en: 'Rewards', pl: 'Nagrody' },
    navScan: { en: 'Scan', pl: 'Skanuj' },
    navAllergens: { en: 'Allergens', pl: 'Alergeny' },

    // Loyalty Tiers
    tierBronze: { en: 'Bronze', pl: 'Brązowy' },
    tierSilver: { en: 'Silver', pl: 'Srebrny' },
    tierGold: { en: 'Gold', 'pl': 'Złoty' },

    // Menu Page
    ourMenu: { en: 'Our Menu', pl: 'Nasze Menu' },
    aiRecommendation: { en: 'Get AI Recommendation', pl: 'Poproś o rekomendację AI' },
    aiPrompt: { en: "What are you in the mood for? e.g. 'something spicy', 'a filling classic', 'something light and refreshing'", pl: "Na co masz ochotę? np. 'coś ostrego', 'sycący klasyk', 'coś lekkiego i orzeźwiającego'" },
    getSuggestion: { en: 'Get Suggestion', pl: 'Zaproponuj' },
    aiModalTitle: { en: 'AI Sushi Sommelier', pl: 'Sommelier Sushi AI' },
    askAgain: { en: 'Ask Again', pl: 'Zapytaj ponownie' },

    // Locations Page
    automatySushi: { en: 'Sushi Vending Machines', pl: 'AUTOMATY SUSHI' },
    automatySushiDescription: { en: 'Presenting the updated locations of KeKomats, restocked from Monday to Saturday with fresh sushi:', pl: 'Przedstawiamy zaktualizowane lokalizacje KeKomatów uzupełniane od poniedziałku do soboty świeżym sushi:' },

    // Rewards Page
    rewardsMarketplace: { en: 'Rewards Marketplace', pl: 'Rynek Nagród' },
    insufficientPoints: { en: 'Not enough points', pl: 'Za mało punktów' },
    tierRequired: { en: 'Tier Required', pl: 'Wymagany Poziom' },
    tierLocked: { en: 'Tier Locked', pl: 'Poziom zablokowany' },
    redeem: { en: 'Redeem', pl: 'Wymień' },
    redeemSuccessTitle: { en: 'Reward Redeemed!', pl: 'Nagroda Wymieniona!' },
    redeemSuccessMessage: { en: 'Show this QR code at any machine to claim your reward.', pl: 'Pokaż ten kod QR przy dowolnym automacie, aby odebrać nagrodę.' },
    close: { en: 'Close', pl: 'Zamknij' },

    // Scan Page
    scanTitle: { en: 'Scan QR Code', pl: 'Skanuj Kod QR' },
    scanPrompt: { en: 'Align QR code within the frame', pl: 'Wyrównaj kod QR w ramce' },
    scanLoading: { en: 'Verifying code...', pl: 'Weryfikacja kodu...' },
    scanErrorApi: { en: 'Invalid or expired code.', pl: 'Nieprawidłowy lub nieważny kod.' },
    scanCameraError: { en: 'Could not access camera. Please enable permissions.', pl: 'Brak dostępu do kamery. Proszę włączyć uprawnienia.' },
    scanSuccessTitle: { en: 'Success!', pl: 'Sukces!' },
    pointsAdded: { en: 'Points Added', pl: 'Dodane Punkty' },
    bonusAdded: { en: 'Bonus!', pl: 'Bonus!' },
    challengeCompleted: { en: 'Challenge Completed', pl: 'Ukończono Wyzwanie' },
    totalPoints: { en: 'Total Points', pl: 'Suma Punktów' },
    done: { en: 'Done', pl: 'Gotowe' },
    tryAgain: { en: 'Try Again', pl: 'Spróbuj Ponownie' },

    // Allergens Page
    allergenListTitle: { en: 'List of Ingredients and Allergens', pl: 'Wykaz składników i alergenów' },
    allergenListDescription: { en: 'Below is a list of ingredients used in our products. Click on any item to see its detailed composition. Key allergens are highlighted for your convenience.', pl: 'Poniżej znajduje się lista składników używanych w naszych produktach. Kliknij na dowolną pozycję, aby zobaczyć jej szczegółowy skład. Główne alergeny są dla Państwa wygody wyróżnione.' },
};