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

export interface MovieCardProps {
  movie: Movie;
}