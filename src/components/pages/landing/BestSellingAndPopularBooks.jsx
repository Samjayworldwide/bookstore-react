import { BookCard } from "./BookCard.jsx";
import { useEffect, useState } from "react";
import axios from "../../../api/axios.jsx";

export const BestSellingAndPopularBooks = () => {
  const [books, setBooks] = useState([]);

  const [fantasy, setFantasy] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const response = await axios.get("/book/books?sortDir=desc");

      setBooks(response.data.responseData.content);
    };

    loadBooks();
  }, []);

  useEffect(() => {
    const loadAllBooks = async () => {
      const response = await axios.get(
        "/book/books?sortDir=desc&pageSize=1000",
      );

      setFantasy(
        response.data.responseData.content.filter(
          (book) => book.genre === "FANTASY",
        ),
      );
    };

    loadAllBooks();
  }, []);

  const bestSelling = {
    image1: "/src/assets/images/landingPageImages/img.png",
    image2: "/src/assets/images/landingPageImages/img_1.png",
    image3: "/src/assets/images/landingPageImages/img_2.png",
    image4: "/src/assets/images/landingPageImages/img_3.png",
  };

  const nameBestSelling = {
    name1: "The Midnight Library",
    name2: "Not Here to be Liked",
    name3: "Click to Subscribe",
    name4: "The rules do not apply",
  };

  const authorBestSelling = {
    author1: "Matt Haig",
    author2: "Michelle Quach",
    author3: "G.L.Tomas",
    author4: "Ariel Levy",
  };

  return (
    <div className="flex flex-col max-w-[1297px] mx-auto items-stretch">
      <div className="items-stretch flex w-full justify-between gap-5 px-5 max-md:max-w-full max-md:flex-wrap">
        <div className="text-black text-4xl font-medium leading-7 tracking-wider grow shrink basis-auto max-md:max-w-full">
          BEST SELLING AND POPULAR BOOKS
        </div>
        <div className="text-black text-base font-bold leading-7">View all</div>
      </div>
      <div className="w-full mt-12 px-5 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <BookCard
            image={bestSelling.image1}
            name={nameBestSelling.name1}
            author={authorBestSelling.author1}
            price={5000}
          />
          <BookCard
            image={bestSelling.image2}
            name={nameBestSelling.name2}
            author={authorBestSelling.author2}
            price={5000}
          />
          <BookCard
            image={bestSelling.image3}
            name={nameBestSelling.name3}
            author={authorBestSelling.author3}
            price={5000}
          />
          <BookCard
            image={bestSelling.image4}
            name={nameBestSelling.name4}
            author={authorBestSelling.author4}
            price={5000}
          />
        </div>
      </div>
      <div className="items-stretch flex w-full justify-between gap-5 mt-14 px-5 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <div className="text-black text-4xl font-semibold leading-7 tracking-widest grow shrink basis-auto">
          FANTASY BOOKS
        </div>
        <div className="text-black text-base font-semibold leading-7">
          View All{" "}
        </div>
      </div>
      <div className="w-full mt-12 px-5 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          {fantasy.map((book) => (
            <BookCard
              key={book.id}
              image={book.bookCover}
              name={book.bookTitle}
              author={book.author}
              price={book.price}
            />
          ))}
        </div>
      </div>

      <div className="justify-between items-stretch flex w-full gap-5 mt-16 px-5 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <div className="text-black text-4xl font-semibold leading-7 tracking-widest grow shrink basis-auto">
          RECENTLY ADDED
        </div>
        <div className="text-black text-base font-semibold leading-7">
          Read More{" "}
        </div>
      </div>
      <div className="w-full mt-12 px-5 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          {books.slice(0, 4).map((book, index) => (
            <BookCard
              key={index}
              image={book.bookCover}
              name={book.bookTitle}
              author={book.author}
              price={book.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
