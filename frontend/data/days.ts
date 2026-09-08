import { FestivalDay } from '../types';

export const festivalDays: FestivalDay[] = [
  {
    id: 'day-1',
    dayNumber: 1,
    date: '14 Sep 2026',
    title: 'Installation & Pranapratishta',
    shortDescription: 'The grand welcoming of Lord Ganesha.',
    status: 'completed',
    mainEvent: 'Pranapratishta',
    image: '/images/festival/ganesh_idol_1788872848419.jpg',
    events: [
      { id: 'e1', time: '06:00 AM', name: 'Suprabhatam' },
      { id: 'e2', time: '09:00 AM', name: 'Murthi Sthapana' }
    ]
  },
  {
    id: 'day-2',
    dayNumber: 2,
    date: '15 Sep 2026',
    title: 'Ganesh Puja',
    shortDescription: 'Morning and evening rituals.',
    status: 'completed',
    mainEvent: 'Maha Puja',
    events: [
      { id: 'e3', time: '07:00 AM', name: 'Ganesh Puja' },
      { id: 'e4', time: '06:00 PM', name: 'Evening Aarti' }
    ]
  },
  {
    id: 'day-3',
    dayNumber: 3,
    date: '16 Sep 2026',
    title: 'Bhajans & Kirtans',
    shortDescription: 'Devotional songs by the community.',
    status: 'completed',
    mainEvent: 'Community Bhajans',
    events: [
      { id: 'e5', time: '06:30 PM', name: 'Maha Aarti' },
      { id: 'e6', time: '07:30 PM', name: 'Community Bhajans' }
    ]
  },
  {
    id: 'day-4',
    dayNumber: 4,
    date: '17 Sep 2026',
    title: 'Evening Celebration',
    shortDescription: 'Special aarti and cultural programs.',
    status: 'current',
    mainEvent: 'Cultural Night',
    events: [
      { id: 'e7', time: '06:00 AM', name: 'Suprabhatam' },
      { id: 'e8', time: '07:00 AM', name: 'Ganesh Puja' },
      { id: 'e9', time: '06:00 PM', name: 'Bhajans' },
      { id: 'e10', time: '08:00 PM', name: 'Maha Aarti' },
      { id: 'e11', time: '09:00 PM', name: 'Prasadam' }
    ]
  },
  {
    id: 'day-5',
    dayNumber: 5,
    date: '18 Sep 2026',
    title: 'Annadanam',
    shortDescription: 'Grand feast for all devotees.',
    status: 'upcoming',
    mainEvent: 'Maha Annadanam',
    events: [
      { id: 'e12', time: '12:00 PM', name: 'Maha Annadanam Starts' }
    ]
  },
  {
    id: 'day-6',
    dayNumber: 6,
    date: '19 Sep 2026',
    title: 'Preparation for Farewell',
    shortDescription: 'Final day of normal viewing.',
    status: 'upcoming',
    mainEvent: 'Sandhya Aarti',
    events: [
      { id: 'e13', time: '07:00 PM', name: 'Special Sandhya Aarti' }
    ]
  },
  {
    id: 'day-7',
    dayNumber: 7,
    date: '20 Sep 2026',
    title: 'Maha Nimajjanam',
    shortDescription: 'The Grand Final Day immersion.',
    status: 'upcoming',
    mainEvent: 'Procession & Immersion',
    image: '/images/festival/nimajjanam_background_1788872905368.jpg',
    events: [
      { id: 'e14', time: '08:00 AM', name: 'Final Puja' },
      { id: 'e15', time: '10:00 AM', name: 'Procession Starts' },
      { id: 'e16', time: '04:00 PM', name: 'Nimajjanam' }
    ]
  }
];