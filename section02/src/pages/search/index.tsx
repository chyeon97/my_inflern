import {ReactNode} from "react";
import SearchableLayout from "@/components/searchable-layout";
import books from '@/mock/books.json'
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/api/fetch-books";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const {q} = context.query
  const books = await fetchBooks(q as string);

  return {
    props: {books},
  }
}

export default function Search({books} : InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
      <div>
        {books.map((book) => <BookItem key={book.id} {...book}/>)}
      </div>
    );
  }
  
  Search.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
  }