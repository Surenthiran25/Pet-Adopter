export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed: string;
  age: number;
  size: 'small' | 'medium' | 'large';
  color: string;
  description: string;
  medicalHistory: string;
  images: string[];
  status: 'available' | 'pending' | 'adopted';
  shelterId: string;
}

export interface Shelter {
  id: string;
  name: string;
  location: string;
  contact: {
    email: string;
    phone: string;
  };
  description: string;
  rating: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'adopter' | 'shelter' | 'foster';
  favorites: string[];
}

export interface AdoptionApplication {
  id: string;
  petId: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  notes: string;
}