import { type JSX, useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '@services/favoriteservice';
import type { Book } from '@type/index';
import { BookCard } from '@components/index';

const Favorites = (): JSX.Element => {
  const [books, setBooks] = useState<Book[]>([]);
  const toggleFavorite = async (selectedBook: Book): Promise<void> => {
    try {
      if (selectedBook.isFavorite && typeof selectedBook.id !== 'undefined') {
        await removeFavorite(selectedBook.id);
        setBooks((currentBooks): Book[] =>
          currentBooks.filter((book): boolean => book.id !== selectedBook.id)
        );
      }
    } catch (error) {
      console.error('Failed to update favorite:', error);
    }
  };
  useEffect((): void => {
    const fetchFavorites = async (): Promise<void> => {
      try {
        const favorites = await getFavorites();
        setBooks(
          favorites.map((favorite): Book => ({
            id: favorite.book_id,
            ...(favorite.title !== null && {
              title: favorite.title
            }),
            ...(favorite.authors !== null && {
              authors: favorite.authors
            }),
            ...(favorite.thumbnail !== null && {
              thumbnail: favorite.thumbnail
            }),
            ...(favorite.rating !== null && {
              rating: favorite.rating
            }),
            isFavorite: true
          }))
        );
      } catch (error) {
        console.error('Failed to fetch favorite books:', error);
        setBooks([]);
      }
    };
    fetchFavorites();
  }, []);
  return (
    <main className='h-[calc(100dvh-3.5rem)] bg-gray-50 px-4 py-6'>
      <header>
        <h1 className='text-2xl font-bold text-gray-900'>Favorite Books</h1>
        <p className='text-sm text-gray-500'>
          Your favorite books in one place.
        </p>
      </header>
      <section className='space-y-3 pb-10 pt-8'>
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onToggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <p className='py-8 text-center text-gray-400'>
            No favorite books yet
          </p>
        )}
      </section>
    </main>
  );
};

export default Favorites;
