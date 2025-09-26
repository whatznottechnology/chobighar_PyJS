import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// Types
export interface AboutHero {
  id: number;
  title: string;
  subtitle: string;
  hero_image: string;
  image_url: string | null;
  alt_text: string;
  is_active: boolean;
}

export interface AboutStory {
  id: number;
  title: string;
  content: string;
  story_image: string;
  image_url: string | null;
  alt_text: string;
  happy_couples: number;
  years_experience: number;
  photos_captured: string;
  is_active: boolean;
}

export interface AboutValue {
  id: number;
  title: string;
  description: string;
  icon_type: string;
  order: number;
  is_active: boolean;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  profile_image: string;
  image_url: string | null;
  alt_text: string;
  email?: string;
  phone?: string;
  order: number;
  is_active: boolean;
}

export interface AboutContent {
  id: number;
  section_type: string;
  section_type_display: string;
  title: string;
  content: string;
  image: string | null;
  image_url: string | null;
  alt_text: string;
  order: number;
  is_active: boolean;
}

// Custom hooks
export function useAboutHero() {
  const [hero, setHero] = useState<AboutHero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/aboutpage/hero/`);
        if (response.ok) {
          const data = await response.json();
          setHero(data);
        } else if (response.status === 404) {
          setHero(null);
        } else {
          throw new Error('Failed to fetch hero data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  return { hero, loading, error };
}

export function useAboutStory() {
  const [story, setStory] = useState<AboutStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/aboutpage/story/`);
        if (response.ok) {
          const data = await response.json();
          setStory(data);
        } else if (response.status === 404) {
          setStory(null);
        } else {
          throw new Error('Failed to fetch story data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, []);

  return { story, loading, error };
}

export function useAboutValues() {
  const [values, setValues] = useState<AboutValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/aboutpage/values/`);
        if (response.ok) {
          const data = await response.json();
          setValues(data);
        } else {
          throw new Error('Failed to fetch values data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchValues();
  }, []);

  return { values, loading, error };
}

export function useTeamMembers() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/aboutpage/team/`);
        if (response.ok) {
          const data = await response.json();
          setTeam(data);
        } else {
          throw new Error('Failed to fetch team data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return { team, loading, error };
}

export function useAboutContent() {
  const [content, setContent] = useState<AboutContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/aboutpage/content/`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        } else {
          throw new Error('Failed to fetch content data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return { content, loading, error };
}