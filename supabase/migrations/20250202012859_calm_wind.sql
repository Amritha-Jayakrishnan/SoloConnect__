/*
  # Initial Schema for SoloConnect

  1. Tables
    - users
      - Extended user profile information
    - matches
      - Stores user matches and their status
    - messages
      - Chat messages between matched users
    - blog_posts
      - City guide blog posts
    - timeline_posts
      - User travel timeline posts
    
  2. Security
    - RLS enabled on all tables
    - Policies for user data protection
*/

-- Users table extension (works with auth.users)
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  age int,
  gender text,
  photo text,
  city text,
  country text,
  interests text[],
  languages text[],
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Matches table
CREATE TABLE public.matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id uuid REFERENCES auth.users(id),
  user2_id uuid REFERENCES auth.users(id),
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Messages table
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid REFERENCES public.matches(id),
  sender_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  title text NOT NULL,
  content text NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  images text[],
  likes int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Timeline posts table
CREATE TABLE public.timeline_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  photo text NOT NULL,
  location text NOT NULL,
  caption text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_posts ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Matches policies
CREATE POLICY "Users can view their own matches"
  ON public.matches FOR SELECT
  USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can create matches"
  ON public.matches FOR INSERT
  WITH CHECK (auth.uid() = user1_id);

-- Messages policies
CREATE POLICY "Users can view messages in their matches"
  ON public.messages FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user1_id FROM public.matches WHERE id = match_id
      UNION
      SELECT user2_id FROM public.matches WHERE id = match_id
    )
  );

CREATE POLICY "Users can insert messages in their matches"
  ON public.messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    auth.uid() IN (
      SELECT user1_id FROM public.matches WHERE id = match_id
      UNION
      SELECT user2_id FROM public.matches WHERE id = match_id
    )
  );

-- Blog posts policies
CREATE POLICY "Blog posts are viewable by everyone"
  ON public.blog_posts FOR SELECT
  USING (true);

CREATE POLICY "Users can create blog posts"
  ON public.blog_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own blog posts"
  ON public.blog_posts FOR UPDATE
  USING (auth.uid() = user_id);

-- Timeline posts policies
CREATE POLICY "Timeline posts are viewable by everyone"
  ON public.timeline_posts FOR SELECT
  USING (true);

CREATE POLICY "Users can create timeline posts"
  ON public.timeline_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own timeline posts"
  ON public.timeline_posts FOR UPDATE
  USING (auth.uid() = user_id);