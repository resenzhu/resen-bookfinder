export type GoogleBookItem = {
  id: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
    averageRating?: number;
  };
};

export type GoogleBooksResponse = {
  items?: GoogleBookItem[];
};
