import { Presentation } from './types';
import { savePresentationToSupabase, fetchPresentationsFromSupabase } from './supabase';

const STORAGE_KEY = 'ai_presentation_generator_decks';

export function getSavedPresentations(): Presentation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read saved presentations:', err);
    return [];
  }
}

export function getPresentationById(id: string): Presentation | null {
  const list = getSavedPresentations();
  return list.find((p) => p.id === id) || null;
}

export function savePresentation(presentation: Presentation): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getSavedPresentations();
    const existingIndex = list.findIndex((p) => p.id === presentation.id);
    const updated = {
      ...presentation,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      list[existingIndex] = updated;
    } else {
      list.unshift(updated);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

    // Asynchronously sync to Supabase in background
    savePresentationToSupabase(updated).catch((err) =>
      console.warn('Supabase sync skipped:', err)
    );
  } catch (err) {
    console.error('Failed to save presentation:', err);
  }
}

export function deletePresentation(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const list = getSavedPresentations();
    const filtered = list.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete presentation:', err);
  }
}
