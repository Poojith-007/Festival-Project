export interface FestivalImages {
  heroBackground?: string;
  ganeshIdol?: string;
  festivalBackground?: string;
  nimajjanamBackground?: string;
}

export interface FestivalConfig {
  villageName: string;
  festivalName: string;
  year: string;
  startDate: string;
  endDate: string;
  venue: string;
  themeMessage: string;
  images: FestivalImages;
}

export type EventStatus = 'completed' | 'current' | 'upcoming';

export interface FestivalEvent {
  id: string;
  time: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface FestivalDay {
  id: string;
  dayNumber: number;
  date: string;
  title: string;
  shortDescription: string;
  status: EventStatus;
  mainEvent: string;
  image?: string;
  announcement?: string;
  events: FestivalEvent[];
}

export interface Announcement {
  id: string;
  type: 'normal' | 'important' | 'emergency';
  message: string;
  timestamp: string;
}

export interface GalleryItem {
  id: string;
  category: string;
  imageUrl: string;
  caption?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  day: string;
  thumbnailUrl: string;
  videoUrl?: string;
  description: string;
}

export interface CommitteeMember {
  id: string;
  role: string;
  name: string;
  imageUrl?: string;
}

export interface Instruction {
  id: string;
  text: string;
}

export interface FestivalLocation {
  venue: string;
  village: string;
  address: string;
  mapUrl?: string;
}