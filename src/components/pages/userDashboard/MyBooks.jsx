import { MyBookCard } from "./MyBookCard.jsx";
import { BookCard } from "../landing/BookCard.jsx";
import { useEffect, useState } from "react";
import axios from "../../../api/axios.jsx";
import { Link } from "react-router-dom";

export const MyBooks = () => {
  const [savedBooks, setSavedBooks] = useState([]);
  const [purchasedBooks, sePurchasedBooks] = useState([]);

  useEffect(() => {
    const getSavedBooks = async () => {
      const response = await axios.get("/book/saved-books?sortDir=desc", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
        },
      });

      setSavedBooks(response.data.responseData.content);
    };

    const getPurchasedBooks = async () => {
      const response = await axios.get("/book/purchased?sortDir=desc", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
        },
      });

      sePurchasedBooks(response.data.responseData.content);
    };

    getSavedBooks();
    getPurchasedBooks();
  }, []);

  const recommended = {
    image1: "/src/assets/images/landingPageImages/img_7.png",
    image2: "/src/assets/images/landingPageImages/img_8.png",
    image3: "/src/assets/images/landingPageImages/img_9.png",
    image4: "src/assets/images/landingPageImages/image-2@2x.png",
  };

  const nameRecommended = {
    name1: "The Midnight Library",
    name2: "Not Here to be Liked",
    name3: "Click to Subscribe",
    name4: "The rules do not apply",
  };

  const authorRecommended = {
    author1: "Matt Haig",
    author2: "Michelle Quach",
    author3: "G.L.Tomas",
    author4: "Ariel Levy",
  };

  return (
    <div className="flex flex-col max-w-[1297px] mx-auto items-stretch">
      <div className="text-black text-6xl mt-[4.5rem] mb-[2rem] w-fit font-bold leading-[81.2px] tracking-tight max-md:text-4xl">
        Welcome {JSON.parse(localStorage.getItem("userData")).firstName},
      </div>
      <div className="items-stretch flex w-full justify-between mt-10 gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="text-black text-4xl font-medium leading-7 tracking-wider grow shrink basis-auto max-md:max-w-full">
          Your Purchased Books
        </div>
        <Link
          to={"/user-dashboard/purchased-books"}
          className="hover:text-blue-500 transition cursor-pointer text-black text-base font-bold leading-7"
        >
          View all
        </Link>
      </div>
      <div className="w-full max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          {purchasedBooks.slice(0, 4).map((book, index) => (
            <MyBookCard
              key={index}
              image={book.bookCover}
              name={book.bookTitle}
              author={book.author}
              price={book.price}
            />
          ))}
        </div>
      </div>
      <div className="items-stretch flex w-full justify-between gap-5 mt-20 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <div className="text-black text-4xl font-semibold leading-7 tracking-widest grow shrink basis-auto">
          Your Saved Books
        </div>
        <Link
          to={"/user-dashboard/saved-books"}
          className="hover:text-blue-500 transition text-black text-base font-semibold leading-7"
        >
          View All{" "}
        </Link>
      </div>
      <div className="w-full max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          {savedBooks.slice(0, 4).map((book, index) => (
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
      <div className="justify-between items-stretch flex w-full gap-5 mt-20 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <div className="text-black text-4xl font-semibold leading-7 tracking-widest grow shrink basis-auto">
          Recommended Books
        </div>
        <div className="text-black text-base font-semibold leading-7">
          Read More{" "}
        </div>
      </div>
      <div className="w-full mt-7 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <BookCard
            image={recommended.image1}
            name={nameRecommended.name1}
            author={authorRecommended.author1}
            price={5000}
          />
          <BookCard
            image={recommended.image2}
            name={nameRecommended.name2}
            author={authorRecommended.author2}
            price={5000}
          />
          <BookCard
            image={recommended.image3}
            name={nameRecommended.name3}
            author={authorRecommended.author3}
            price={5000}
          />
          <BookCard
            image={recommended.image4}
            name={nameRecommended.name4}
            author={authorRecommended.author4}
            price={5000}
          />
        </div>
      </div>
    </div>
  );
};
