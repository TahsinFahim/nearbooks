import { apiFetch } from "@/lib/api";
import { BooksApiResponse } from "@/types/book";
import { BooksCarousel } from "@/utils/BooksCarousel";
import Header from "@/utils/Header";
import { Book } from "lucide-react";

export default async function Products({ categoryId, title }: { categoryId: number, title: string }) {
  const res: BooksApiResponse = await apiFetch("/books/category/" + categoryId);
  const books = res.success ? res.data : [];
  console.log(books);

  return <>
    <Header title={title} />
    <BooksCarousel books={books} />

  </>;
}