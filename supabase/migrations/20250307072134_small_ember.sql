/*
  # Initial Schema for Pet Adoption Platform

  1. New Tables
    - profiles
      - Stores user profile information
      - Links to Supabase auth.users
    - pets
      - Stores pet listings
      - Includes details like name, species, breed, age
    - applications
      - Stores adoption applications
      - Links adopters to pets
    - reviews
      - Stores shelter/pet reviews
      - Links to profiles and pets
    
  2. Security
    - Enable RLS on all tables
    - Add policies for data access control
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE,
  full_name text,
  avatar_url text,
  is_shelter boolean DEFAULT false,
  shelter_name text,
  shelter_address text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create pets table
CREATE TABLE pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by uuid REFERENCES profiles(id),
  name text NOT NULL,
  species text NOT NULL,
  breed text,
  age_years integer,
  age_months integer,
  size text,
  color text,
  gender text,
  medical_history text,
  description text,
  status text DEFAULT 'available',
  photos text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create applications table
CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id uuid REFERENCES pets(id),
  applicant_id uuid REFERENCES profiles(id),
  status text DEFAULT 'pending',
  application_data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id uuid REFERENCES profiles(id),
  shelter_id uuid REFERENCES profiles(id),
  pet_id uuid REFERENCES pets(id),
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Pets policies
CREATE POLICY "Pets are viewable by everyone"
  ON pets FOR SELECT
  USING (true);

CREATE POLICY "Shelters can create pets"
  ON pets FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND is_shelter = true
    )
  );

CREATE POLICY "Shelters can update own pets"
  ON pets FOR UPDATE
  USING (created_by = auth.uid());

-- Applications policies
CREATE POLICY "Users can view own applications"
  ON applications FOR SELECT
  USING (
    applicant_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM pets
      WHERE pets.id = applications.pet_id
      AND pets.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can create applications"
  ON applications FOR INSERT
  WITH CHECK (auth.uid() = applicant_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

-- Create functions
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_pets
  BEFORE UPDATE ON pets
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER handle_updated_at_applications
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();