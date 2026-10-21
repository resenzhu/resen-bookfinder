export type Favorite = {
  id: number;
  book_id: string;
  title: string | null;
  authors: string[] | null;
  thumbnail: string | null;
  rating: number | null;
  created_at: string;
};
