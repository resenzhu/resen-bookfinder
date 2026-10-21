import type { Book, GoogleBooksResponse } from '@type/index';
import { type JSX, useEffect, useState } from 'react';
import {
  getFavorites,
  removeFavorite,
  saveFavorite
} from '@services/favoriteservice';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { BookCard } from '@components/index';
import { searchBooks } from '@services/bookservice';
import { useLocation } from 'react-router-dom';

const Home = (): JSX.Element => {
  const { state } = useLocation();
  const keyword = (state as { search?: string } | null)?.search ?? '';
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggleFavorite = async (selectedBook: Book): Promise<void> => {
    try {
      if (selectedBook.isFavorite && typeof selectedBook.id !== 'undefined') {
        await removeFavorite(selectedBook.id);
      } else {
        await saveFavorite(selectedBook);
      }
      setBooks((currentBooks): Book[] =>
        currentBooks.map((book): Book =>
          book.id === selectedBook.id
            ? { ...book, isFavorite: !book.isFavorite }
            : book
        )
      );
    } catch (error) {
      console.error('Failed to update favorite:', error);
    }
  };
  useEffect((): void => {
    if (keyword.trim().length !== 0) {
      const fetchBooks = async (): Promise<void> => {
        setIsLoading(true);
        try {
          const data = (await searchBooks(
            keyword.trim()
          )) as GoogleBooksResponse;
          const results = (data.items ?? []).map((item): Book => ({
            id: item.id,
            ...(typeof item.volumeInfo?.title !== 'undefined' && {
              title: item.volumeInfo.title
            }),
            ...(typeof item.volumeInfo?.authors !== 'undefined' && {
              authors: item.volumeInfo.authors
            }),
            ...(typeof item.volumeInfo?.imageLinks?.thumbnail !==
              'undefined' && {
              thumbnail: item.volumeInfo.imageLinks.thumbnail
            }),
            ...(typeof item.volumeInfo?.averageRating !== 'undefined' && {
              rating: item.volumeInfo.averageRating
            })
          }));
          const favorites = await getFavorites();
          const favoriteIds = new Set(
            favorites.map((favorite): string => favorite.book_id)
          );
          setBooks(
            results.map((book): Book => ({
              ...book,
              isFavorite: favoriteIds.has(book.id)
            }))
          );
        } catch (error) {
          console.error('Failed to fetch books:', error);
          setBooks([]);
        } finally {
          setIsLoading(false);
        }
      };
      fetchBooks();
    }
  }, [keyword]);
  return (
    <main className='h-[calc(100dvh-3.5rem)] bg-gray-50 px-4 py-6'>
      <header>
        <h1 className='text-2xl font-bold text-gray-900'>Discover Books</h1>
        <p className='text-sm text-gray-500'>Find your next favorite book.</p>
      </header>
      <section className='space-y-3 pb-10 pt-8'>
        {isLoading ? (
          <div className='flex flex-col items-center justify-center gap-3 py-12'>
            <ArrowPathIcon className='size-8 animate-spin text-gray-500' />
            <p className='text-sm text-gray-500'>Searching books...</p>
          </div>
        ) : books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onToggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <p className='py-8 text-center text-gray-400'>
            Search for books to get started
          </p>
        )}
      </section>
    </main>
  );
};

export default Home;
