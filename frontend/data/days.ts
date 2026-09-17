import { FestivalDay } from '../types';

export const festivalDays: FestivalDay[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    date: '14 Sep 2026',
    title: 'Installation & Pranapratishta',
    shortDescription: 'The grand welcoming and consecration of Lord Ganesha.',
    status: 'upcoming',
    mainEvent: 'Pranapratishta',
    image: '/images/festival/ganesh-idol.jpg',
    events: [
      { id: 'e1', time: '06:00 AM', name: 'Suprabhatam', icon: '🌅' },
      { id: 'e2', time: '09:00 AM', name: 'Murthi Sthapana & Pranapratishta', icon: '🪔' },
      { id: 'e2b', time: '07:00 PM', name: 'Ganesh Puja & Maha Aarti', icon: '🕉️' },
      { id: 'e2c', time: '08:00 PM', name: 'Prasadam Distribution', icon: '🍛' }
    ]
  },
  {
    id: 'day-2',
    dayNumber: 2,
    date: '15 Sep 2026',
    title: 'Ganesh Puja & Archana',
    shortDescription: 'Morning rituals and evening devotional archana.',
    status: 'upcoming',
    mainEvent: 'Maha Puja',
    events: [
      { id: 'e3', time: '07:00 AM', name: 'Ganesh Puja', icon: '🪔' },
      { id: 'e4', time: '06:00 PM', name: 'Evening Aarti', icon: '🕉️' }
    ]
  },
  {
    id: 'day-3',
    dayNumber: 3,
    date: '16 Sep 2026',
    title: 'Bhajans & Kirtans',
    shortDescription: 'Devotional songs and bhajans by the community.',
    status: 'upcoming',
    mainEvent: 'Community Bhajans',
    events: [
      { id: 'e5', time: '06:30 PM', name: 'Maha Aarti', icon: '🕉️' },
      { id: 'e6', time: '07:30 PM', name: 'Community Bhajans', icon: '🎵' }
    ]
  },
  {
    id: 'day-4',
    dayNumber: 4,
    date: '17 Sep 2026',
    title: 'Sri Ganapathi Puja',
    shortDescription: 'Special aarti and cultural programs.',
    status: 'current',
    mainEvent: 'Cultural Night',
    events: [
      { id: 'e7', time: '06:00 AM', name: 'Suprabhatam', icon: '🌅' },
      { id: 'e8', time: '07:00 AM', name: 'Ganesh Puja', icon: '🪔' },
      { id: 'e8b', time: '10:00 AM', name: 'Darshan', icon: '🙏' },
      { id: 'e9', time: '06:00 PM', name: 'Bhajans', icon: '🎵' },
      { id: 'e10', time: '08:00 PM', name: 'Maha Aarti', icon: '🕉️' },
      { id: 'e11', time: '09:00 PM', name: 'Prasadam', icon: '🍛' }
    ]
  },
  {
    id: 'day-5',
    dayNumber: 5,
    date: '18 Sep 2026',
    title: 'Maha Annadanam',
    shortDescription: 'Grand feast and prasadam for all devotees.',
    status: 'upcoming',
    mainEvent: 'Maha Annadanam',
    events: [
      { id: 'e12', time: '12:00 PM', name: 'Maha Annadanam Starts', icon: '🍛' }
    ]
  },
  {
    id: 'day-6',
    dayNumber: 6,
    date: '19 Sep 2026',
    title: 'Cultural Night & Sandhya Aarti',
    shortDescription: 'Local devotional performances and final preparations.',
    status: 'upcoming',
    mainEvent: 'Cultural Events',
    events: [
      { id: 'e13', time: '07:00 PM', name: 'Devotional Cultural Programs', icon: '🎵' }
    ]
  },
  {
    id: 'day-7',
    dayNumber: 7,
    date: '20 Sep 2026',
    title: 'Maha Nimajjanam',
    shortDescription: 'The grand final-day immersion and procession.',
    status: 'upcoming',
    mainEvent: 'Procession & Immersion',
    image: '/images/festival/nimajjanam_background_1788872905368.jpg',
    events: [
      { id: 'e14', time: '08:00 AM', name: 'Final Puja', icon: '🪔' },
      { id: 'e15', time: '10:00 AM', name: 'Procession Starts', icon: '🚶' },
      { id: 'e16', time: '04:00 PM', name: 'Nimajjanam', icon: '🌊' }
    ]
  }
];
