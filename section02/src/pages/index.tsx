import style from './index.module.css'
import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/api/fetch-books'
import fetchRandomBooks from '@/api/fetch-randombooks';

// 컴포넌트보다 먼 실행되어서 컴포넌트에 필요한 데이터 불러오는 함수
export const getServerSideProps = async () => {
  // const allBooks = await fetchBooks();
  // const randomBooks = await fetchRandomBooks();
  
  // 병렬형식
  const [allBooks, randomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);


  return {
    props: {
      allBooks,
      randomBooks,
    }
  }
}

export default function Home({allBooks, randomBooks}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {randomBooks.map((book) => <BookItem key={book.id} {...book}/>)}
      </section>

      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => <BookItem key={book.id} {...book}/>)}
      </section>
    </div>
  );
}


Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}