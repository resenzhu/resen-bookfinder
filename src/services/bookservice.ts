import type { GoogleBooksResponse } from '@type/index';
import axios from 'axios';

const API_URL = import.meta.env.VITE_GOOGLE_BOOKS_API_URL;
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const searchBooks = async (
  keyword: string
): Promise<GoogleBooksResponse> => {
  const response = await axios.get<GoogleBooksResponse>(`${API_URL}/volumes`, {
    params: {
      q: keyword,
      maxResults: 10,
      key: API_KEY
    }
  });
  return response.data;
};
