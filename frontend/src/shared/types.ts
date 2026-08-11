import React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
  addClasses?: string;

}

export interface Movie {
  id: number;
  title: string;
  year: number;
  category: string;
  posterUrl: string;
}

export interface TMDBMovie {
  tmdb_id: number;
  title: string;
  year: number;
  posterUrl: string;
}

export interface UserMovieWithDetails {
  id: number;
  status: string;
  title: string;
  year: number;
  posterUrl: string;
  tmdb_id: number | null;
}

export interface MovieCardProps {
  movie: TMDBMovie | UserMovieWithDetails;
}

