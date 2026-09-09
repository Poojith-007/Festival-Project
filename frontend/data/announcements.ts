import { Announcement } from '../types';

export const announcements: Announcement[] = [
  {
    id: 'a1',
    type: 'emergency',
    message: "Today's Maha Aarti will begin at 7:30 PM.",
    timestamp: '10 minutes ago'
  },
  {
    id: 'a2',
    type: 'important',
    message: 'Important: Today\'s cultural program has been rescheduled to 8:00 PM.',
    timestamp: '2 hours ago'
  },
  {
    id: 'a3',
    type: 'normal',
    message: 'Prasadam distribution will start after Aarti.',
    timestamp: '5 hours ago'
  }
];