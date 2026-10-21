import { type JSX, useEffect, useRef } from 'react';
import type { Book } from '@type/index';
import { HeartIcon } from '@heroicons/react/24/solid';
import raterJs from 'rater-js';

type BookCardProps = {
  book: Book;
  onToggleFavorite?: (book: Book) => void;
};

const BookCard = ({ book, onToggleFavorite }: BookCardProps): JSX.Element => {
  const ratingRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ratingRef.current) return;
    const rater = raterJs({
      element: ratingRef.current,
      rating: book.rating ?? 0,
      max: 5,
      readOnly: true,
      starSize: 18,
      starSpacing: 3,
      showToolTip: false
    });
    return () => {
      rater.dispose();
      ratingRef.current?.replaceChildren();
    };
  }, [book.rating]);
  return (
    <div className='flex gap-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md'>
      <div className='h-32 w-24 shrink-0 overflow-hidden rounded-md bg-gray-100'>
        {book.thumbnail ? (
          <img
            className='size-full object-cover'
            src={book.thumbnail.replace(/^http:\/\//, 'https://')}
            loading='lazy'
          />
        ) : (
          <div className='flex size-full items-center justify-center p-2 text-center text-xs text-gray-400'>
            No cover available
          </div>
        )}
      </div>
      <div className='flex flex-1 flex-col'>
        <div className='flex items-start justify-between gap-3'>
          <h3 className='line-clamp-3 font-semibold text-gray-900'>
            {book.title ?? 'Untitled'}
          </h3>
          <button
            className={`shrink-0 ${book.isFavorite ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'}`}
            type='button'
            onClick={(): void => {
              onToggleFavorite?.(book);
            }}
          >
            <HeartIcon className='size-6' />
          </button>
        </div>
        <p className='line-clamp-1 text-sm text-gray-500'>
          {book.authors?.join(', ') ?? 'Unknown author'}
        </p>
        <div className='mt-auto flex items-center gap-2 pt-4'>
          <div ref={ratingRef}></div>
          <span className='text-sm text-gray-500'>
            {book.rating?.toFixed(1) ?? 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
