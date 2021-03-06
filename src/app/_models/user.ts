import { Photo } from './photo';

export interface User {
  id: number;
  username: string;
  gender: string;
  age: number;
  knownAs: string;
  createdAt: Date;
  lastActive: any;
  city: string;
  country: string;
  photoUrl: string;
  introduction?: string;
  lookingFor?: string;
  interests?: string;
  photos?: Photo[];
}
