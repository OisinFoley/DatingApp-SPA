import { Photo } from './photo';

export interface User {
  id: number;
  username: string;
  gender: string;
  age: number;
  knownAs: string;
  createdAt: Date;
  lastActive: Date;
  city: string;
  country: string;
  photoURL: string;
  introduction?: string;
  lookingFor?: string;
  interests?: string;
  photos?: Photo[];
}
