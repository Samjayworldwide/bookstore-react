import { Filters } from "./Filters.jsx";
import { useEffect, useState } from "react";
import { BookDetails } from "../BookDetails.jsx";
import axios from "../../../api/axios.jsx";
import { BookDisplayCard } from "./comps/BookDisplayCard.jsx";

export const UserCategoryPage = ({
  handleStatus,
  setStatusTitle,
  setStatusMessage,
  setStatusColor,
}) => {
  const [isLast, setIsLast] = useState(false)

  const [page, setPage] = useState(0);

  const [books, setBooks] = useState([]);

  const [viewBook, setViewBook] = useState();

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const loadBooks = async () => {
      const response = await axios.get(`/book/books?pageNo=${page}`);

      setBooks(response.data.responseData.content);
      setIsLast(response.data.responseData.last)
      setViewBook(response.data.responseData.content[0]);
    };

    loadBooks();
  }, [page]);

  const [details, setDetails] = useState(false);

  const handleDetails = () => {
    setDetails(!details);
  };

  const handleViewBook = (viewedBook) => {
    setViewBook(viewedBook);
  };

  const nextPage = () => {
    if (!isLast) {
      setPage(page + 1)
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="bg-white flex flex-col items-stretch pb-12">
      {details && (
        <BookDetails
          handleStatus={handleStatus}
          setStatusTitle={setStatusTitle}
          setStatusMessage={setStatusMessage}
          setStatusColor={setStatusColor}
          viewedBook={viewBook}
        />
      )}

      {!details && (
        <div className="flex w-full flex-col items-stretch mb-10 px-16 max-md:max-w-full max-md:mt-10 max-md:px-5">
          <div className="text-black text-6xl mt-[4.5rem] mb-[2rem] w-fit font-bold leading-[81.2px] tracking-tight max-md:text-4xl">
            Explore all Deals
          </div>
          <div className="mt-6 max-md:max-w-full">
            <div className="h-[100%] gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="h-fit flex flex-col items-stretch w-[22%] max-md:w-full max-md:ml-0">
                <Filters />
              </div>

              <div className="flex flex-col items-stretch w-[78%] ml-5 max-md:w-full max-md:ml-0">
                <div className="flex grow flex-col max-md:max-w-full max-md:mt-5">
                  <div className="items-stretch flex w-[66px] max-w-full gap-2 mr-28 self-end max-md:mr-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a201f9390a9c08c0bc5f61c075ba5ff03858958083aa5dd21ae172881481277c?"
                      className="aspect-square object-contain object-center w-full overflow-hidden shrink-0 flex-1"
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccdaccc5c0abec7567e5d2b41ef8ad8064ea019014d0bb446df45ca0ec70abc1?"
                      className="aspect-square object-contain object-center w-full overflow-hidden shrink-0 flex-1"
                    />
                  </div>

                  <>
                    {books.map((book) => (
                      <BookDisplayCard
                        key={book.id}
                        book={book}
                        handleViewBook={handleViewBook}
                        bookCover={book.bookCover}
                        bookTitle={book.bookTitle}
                        bookAuthor={book.author}
                        genre={book.genre}
                        price={book.price}
                        bookDescription={book.description}
                        handleDetails={handleDetails}
                      />
                    ))}
                  </>

                  {books.length > 0 && (
                    <div className="flex gap-4 justify-end">
                      <button
                        onClick={prevPage}
                        className="flex hover:bg-red-500 py-1 w-[8rem] transition items-center gap-2 border border-black rounded-lg px-4 justify-center"
                      >
                        <div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d7dd83f57cf0f0d55ac4589528b86a4f6e45a046fbd6c7d18b6110dd0c11edb?"
                            className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
                          />
                        </div>
                        <p>Back</p>
                      </button>

                      <button
                        onClick={nextPage}
                        className="flex items-center hover:bg-green-500 py-1 w-[8rem] transition gap-2 border border-black rounded-lg px-4 justify-center"
                      >
                        <p>Next</p>
                        <div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d7dd83f57cf0f0d55ac4589528b86a4f6e45a046fbd6c7d18b6110dd0c11edb?"
                            className="aspect-square object-contain rotate-180 object-center w-6 overflow-hidden shrink-0 max-w-full"
                          />
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
