export interface User {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  photo: string;
  location: {
    city: string;
    country: string;
  };
  interests: string[];
  languages: string[];
  bio: string;
}

export interface BlogPost {
  id: string;
  userId: string;
  title: string;
  content: string;
  city: string;
  country: string;
  images: string[];
  createdAt: string;
  likes: number;
}

export interface TimelinePost {
  id: string;
  userId: string;
  photo: string;
  location: string;
  caption: string;
  date: string;
}