export interface Destination {
  id: string;
  name: string;
  country: string;
  state?: string;
  city: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  bestTime: string;
  duration: string;
  attractions: Attraction[];
  history: string;
  culture: string;
  interestingFacts: string[];
  budget: {
    accommodation: { budget: number; mid: number; luxury: number };
    food: { budget: number; mid: number; luxury: number };
    transport: { local: number; private: number };
    activities: number;
  };
  weather: WeatherInfo[];
}

export interface Attraction {
  id: string;
  name: string;
  type: 'Essential' | 'Optional';
  description: string;
  image: string;
  openingHours: string;
  entryFee: number;
  visitDuration: string;
  coordinates: { lat: number; lng: number };
}

export interface WeatherInfo {
  month: string;
  temperature: { min: number; max: number };
  rainfall: number;
  humidity: number;
  description: string;
}

export const destinations: Destination[] = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    country: 'India',
    state: 'Uttar Pradesh',
    city: 'Agra',
    description: 'An ivory-white marble mausoleum and UNESCO World Heritage Site, considered one of the finest examples of Mughal architecture.',
    image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Historical',
    rating: 4.8,
    bestTime: 'October to March',
    duration: '1-2 days',
    history: 'Built between 1632-1653 by Mughal Emperor Shah Jahan as a mausoleum for his beloved wife Mumtaz Mahal. The construction employed over 20,000 artisans and craftsmen.',
    culture: 'Symbol of eternal love and architectural marvel representing the pinnacle of Mughal art and craftsmanship.',
    interestingFacts: [
      'Changes color throughout the day - pink at dawn, milky white in the evening, and golden under moonlight',
      'Took 22 years to complete with 1,000 elephants used to transport materials',
      'The main dome is 35 meters high and surrounded by four smaller domes',
      'Intricate inlay work features 28 types of precious stones'
    ],
    budget: {
      accommodation: { budget: 1500, mid: 4000, luxury: 8000 },
      food: { budget: 800, mid: 2000, luxury: 4000 },
      transport: { local: 500, private: 2000 },
      activities: 1500
    },
    weather: [
      { month: 'January', temperature: { min: 7, max: 21 }, rainfall: 15, humidity: 65, description: 'Cool and pleasant' },
      { month: 'February', temperature: { min: 10, max: 24 }, rainfall: 10, humidity: 60, description: 'Ideal weather' },
      { month: 'March', temperature: { min: 15, max: 30 }, rainfall: 8, humidity: 55, description: 'Pleasant and warm' },
      { month: 'April', temperature: { min: 21, max: 36 }, rainfall: 5, humidity: 50, description: 'Hot but bearable' },
      { month: 'May', temperature: { min: 26, max: 42 }, rainfall: 10, humidity: 45, description: 'Very hot' },
      { month: 'June', temperature: { min: 29, max: 40 }, rainfall: 60, humidity: 70, description: 'Hot and humid' }
    ],
    attractions: [
      {
        id: 'taj-main',
        name: 'Taj Mahal Main Mausoleum',
        type: 'Essential',
        description: 'The iconic white marble mausoleum with intricate inlay work and perfect symmetry.',
        image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=600',
        openingHours: '6:00 AM - 7:00 PM (Closed on Fridays)',
        entryFee: 1100,
        visitDuration: '2-3 hours',
        coordinates: { lat: 27.1751, lng: 78.0421 }
      },
      {
        id: 'taj-mosque',
        name: 'Taj Mahal Mosque',
        type: 'Essential',
        description: 'Red sandstone mosque on the western side of the Taj Mahal complex.',
        image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=600',
        openingHours: '6:00 AM - 7:00 PM',
        entryFee: 0,
        visitDuration: '30 minutes',
        coordinates: { lat: 27.1749, lng: 78.0419 }
      },
      {
        id: 'mehtab-bagh',
        name: 'Mehtab Bagh',
        type: 'Optional',
        description: 'Charbagh complex offering stunning sunset views of the Taj Mahal.',
        image: 'https://images.pexels.com/photos/2376997/pexels-photo-2376997.jpeg?auto=compress&cs=tinysrgb&w=600',
        openingHours: '6:00 AM - 6:00 PM',
        entryFee: 300,
        visitDuration: '1 hour',
        coordinates: { lat: 27.1767, lng: 78.0434 }
      }
    ]
  },
  {
    id: 'kerala-backwaters',
    name: 'Kerala Backwaters',
    country: 'India',
    state: 'Kerala',
    city: 'Alleppey',
    description: 'A network of brackish lagoons and lakes lying parallel to the Arabian Sea coast, famous for houseboat cruises.',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Nature',
    rating: 4.6,
    bestTime: 'November to February',
    duration: '2-3 days',
    history: 'The backwaters were formed by the action of waves and shore currents creating a natural water system that has been used for transportation and trade for centuries.',
    culture: 'Central to Kerala\'s culture, supporting fishing communities and traditional industries like coir and rice cultivation.',
    interestingFacts: [
      'Stretches over 900 km of waterways',
      'Home to over 150 species of fish',
      'Traditional houseboats called "Kettuvallams" are made without using a single nail',
      'The Chinese fishing nets at Kochi are over 500 years old'
    ],
    budget: {
      accommodation: { budget: 2000, mid: 5000, luxury: 12000 },
      food: { budget: 600, mid: 1500, luxury: 3000 },
      transport: { local: 300, private: 1500 },
      activities: 3000
    },
    weather: [
      { month: 'November', temperature: { min: 23, max: 32 }, rainfall: 20, humidity: 75, description: 'Pleasant and cool' },
      { month: 'December', temperature: { min: 21, max: 31 }, rainfall: 10, humidity: 70, description: 'Ideal weather' },
      { month: 'January', temperature: { min: 20, max: 31 }, rainfall: 5, humidity: 65, description: 'Cool and dry' },
      { month: 'February', temperature: { min: 22, max: 32 }, rainfall: 8, humidity: 68, description: 'Perfect for cruising' }
    ],
    attractions: [
      {
        id: 'houseboat-cruise',
        name: 'Houseboat Cruise',
        type: 'Essential',
        description: 'Traditional houseboat experience through the serene backwaters with local cuisine.',
        image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=600',
        openingHours: '24/7',
        entryFee: 8000,
        visitDuration: '1 day',
        coordinates: { lat: 9.4981, lng: 76.3388 }
      },
      {
        id: 'kumarakom-bird-sanctuary',
        name: 'Kumarakom Bird Sanctuary',
        type: 'Optional',
        description: 'Famous bird sanctuary home to migratory birds and exotic species.',
        image: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=600',
        openingHours: '6:00 AM - 6:00 PM',
        entryFee: 100,
        visitDuration: '2 hours',
        coordinates: { lat: 9.6177, lng: 76.4280 }
      }
    ]
  },
  {
    id: 'goa-beaches',
    name: 'Goa Beaches',
    country: 'India',
    state: 'Goa',
    city: 'Goa',
    description: 'Golden sandy beaches, Portuguese colonial architecture, and vibrant nightlife along India\'s western coast.',
    image: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Beach',
    rating: 4.4,
    bestTime: 'November to February',
    duration: '3-5 days',
    history: 'Former Portuguese colony for over 450 years, liberated in 1961. The blend of Indian and Portuguese cultures creates a unique heritage.',
    culture: 'Famous for its laid-back lifestyle, seafood cuisine, feni (local liquor), and vibrant festivals like Carnival.',
    interestingFacts: [
      'Smallest state in India by area',
      'Home to two UNESCO World Heritage Sites',
      'Only state in India where Portuguese is still spoken',
      'Famous for its cashew production and feni liquor'
    ],
    budget: {
      accommodation: { budget: 1800, mid: 4500, luxury: 10000 },
      food: { budget: 1000, mid: 2500, luxury: 5000 },
      transport: { local: 400, private: 1800 },
      activities: 2500
    },
    weather: [
      { month: 'November', temperature: { min: 24, max: 33 }, rainfall: 15, humidity: 70, description: 'Pleasant and sunny' },
      { month: 'December', temperature: { min: 21, max: 32 }, rainfall: 5, humidity: 65, description: 'Perfect beach weather' },
      { month: 'January', temperature: { min: 19, max: 31 }, rainfall: 3, humidity: 60, description: 'Cool and dry' },
      { month: 'February', temperature: { min: 20, max: 32 }, rainfall: 5, humidity: 62, description: 'Ideal for water sports' }
    ],
    attractions: [
      {
        id: 'baga-beach',
        name: 'Baga Beach',
        type: 'Essential',
        description: 'Popular beach known for water sports, shacks, and vibrant nightlife.',
        image: 'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=600',
        openingHours: '24/7',
        entryFee: 0,
        visitDuration: 'Half day',
        coordinates: { lat: 15.5557, lng: 73.7515 }
      },
      {
        id: 'basilica-bom-jesus',
        name: 'Basilica of Bom Jesus',
        type: 'Essential',
        description: 'UNESCO World Heritage Site housing the relics of St. Francis Xavier.',
        image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=600',
        openingHours: '9:00 AM - 6:30 PM',
        entryFee: 0,
        visitDuration: '1 hour',
        coordinates: { lat: 15.5009, lng: 73.9114 }
      }
    ]
  },
  {
    id: 'rajasthan-palaces',
    name: 'Rajasthan Palaces',
    country: 'India',
    state: 'Rajasthan',
    city: 'Jaipur',
    description: 'Royal palaces and forts showcasing the grandeur of Rajput architecture and rich cultural heritage.',
    image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Historical',
    rating: 4.7,
    bestTime: 'October to March',
    duration: '4-6 days',
    history: 'Land of maharajas and legendary warriors, with magnificent forts and palaces built over centuries by Rajput rulers.',
    culture: 'Rich traditions of folk music, dance, handicrafts, and colorful festivals celebrating royal heritage.',
    interestingFacts: [
      'Jaipur is known as the "Pink City" for its distinctive pink-colored buildings',
      'Rajasthan is home to the Thar Desert, one of the world\'s largest deserts',
      'The state has three UNESCO World Heritage Sites',
      'Famous for its blue pottery, bandhani textiles, and precious gemstones'
    ],
    budget: {
      accommodation: { budget: 2500, mid: 6000, luxury: 15000 },
      food: { budget: 800, mid: 2000, luxury: 4500 },
      transport: { local: 600, private: 2500 },
      activities: 3500
    },
    weather: [
      { month: 'October', temperature: { min: 19, max: 33 }, rainfall: 10, humidity: 55, description: 'Pleasant and clear' },
      { month: 'November', temperature: { min: 14, max: 29 }, rainfall: 5, humidity: 50, description: 'Cool and comfortable' },
      { month: 'December', temperature: { min: 9, max: 25 }, rainfall: 2, humidity: 45, description: 'Cool and dry' },
      { month: 'January', temperature: { min: 6, max: 23 }, rainfall: 3, humidity: 48, description: 'Cold but pleasant' }
    ],
    attractions: [
      {
        id: 'amber-fort',
        name: 'Amber Fort',
        type: 'Essential',
        description: 'Magnificent hilltop fort with stunning architecture and panoramic views.',
        image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=600',
        openingHours: '8:00 AM - 5:30 PM',
        entryFee: 500,
        visitDuration: '3 hours',
        coordinates: { lat: 26.9855, lng: 75.8513 }
      },
      {
        id: 'city-palace',
        name: 'City Palace',
        type: 'Essential',
        description: 'Royal palace complex with museums, courtyards, and architectural marvels.',
        image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=600',
        openingHours: '9:30 AM - 5:00 PM',
        entryFee: 300,
        visitDuration: '2 hours',
        coordinates: { lat: 26.9255, lng: 75.8235 }
      }
    ]
  },
  {
    id: 'himachal-mountains',
    name: 'Himachal Mountains',
    country: 'India',
    state: 'Himachal Pradesh',
    city: 'Shimla',
    description: 'Scenic hill stations with snow-capped peaks, adventure sports, and colonial architecture.',
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Mountain',
    rating: 4.5,
    bestTime: 'March to June, September to November',
    duration: '4-7 days',
    history: 'Former British summer capital, established as a hill station in 1822. Rich in colonial architecture and Himalayan culture.',
    culture: 'Blend of Hindu culture with Tibetan influences, famous for apple orchards, handicrafts, and mountain festivals.',
    interestingFacts: [
      'Shimla was the summer capital of British India',
      'Home to the UNESCO World Heritage Kalka-Shimla Railway',
      'Famous for its toy train and colonial architecture',
      'Gateway to adventure sports like trekking, skiing, and paragliding'
    ],
    budget: {
      accommodation: { budget: 2000, mid: 5000, luxury: 12000 },
      food: { budget: 700, mid: 1800, luxury: 3500 },
      transport: { local: 500, private: 2200 },
      activities: 4000
    },
    weather: [
      { month: 'March', temperature: { min: 4, max: 19 }, rainfall: 40, humidity: 65, description: 'Cool and pleasant' },
      { month: 'April', temperature: { min: 9, max: 24 }, rainfall: 35, humidity: 60, description: 'Mild and comfortable' },
      { month: 'May', temperature: { min: 14, max: 28 }, rainfall: 45, humidity: 55, description: 'Warm and pleasant' },
      { month: 'June', temperature: { min: 18, max: 30 }, rainfall: 120, humidity: 70, description: 'Warm with monsoon onset' }
    ],
    attractions: [
      {
        id: 'mall-road',
        name: 'Mall Road',
        type: 'Essential',
        description: 'Famous shopping street with colonial buildings, cafes, and mountain views.',
        image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600',
        openingHours: '24/7',
        entryFee: 0,
        visitDuration: '2 hours',
        coordinates: { lat: 31.1048, lng: 77.1734 }
      },
      {
        id: 'jakhu-temple',
        name: 'Jakhu Temple',
        type: 'Essential',
        description: 'Ancient temple dedicated to Lord Hanuman with panoramic city views.',
        image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=600',
        openingHours: '6:00 AM - 9:00 PM',
        entryFee: 0,
        visitDuration: '1.5 hours',
        coordinates: { lat: 31.1084, lng: 77.1692 }
      }
    ]
  }
];

export const categories = [
  'All',
  'Historical',
  'Nature',
  'Beach',
  'Mountain',
  'Cultural',
  'Adventure',
  'Spiritual'
];

export const countries = [
  'India',
  'Nepal',
  'Bhutan',
  'Sri Lanka',
  'Thailand',
  'Malaysia',
  'Singapore'
];