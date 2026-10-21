import type { Book, Favorite } from '@type/index';
import { supabase } from '@lib/supabase';

export const getFavorites = async (): Promise<Favorite[]> => {
  const { data, error } = await supabase.from('favorites').select('*');
  if (error) throw error;
  return data;
};

export const saveFavorite = async (book: Book): Promise<void> => {
  const { error } = await supabase.from('favorites').upsert(
    {
      book_id: book.id,
      title: book.title ?? null,
      authors: book.authors ?? null,
      thumbnail: book.thumbnail ?? null,
      rating: book.rating ?? null
    },
    { onConflict: 'book_id' }
  );
  if (error) throw error;
};

export const removeFavorite = async (bookId: string): Promise<void> => {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('book_id', bookId);
  if (error) throw error;
};
