import restless from "../../assets/images/userCatImages/restless.png";
import {useEffect, useState} from "react";
import { PaymentOptions } from "../payment/PaymentOptions.jsx";
import { FaStar } from 'react-icons/fa'
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios.jsx";
import "../pages/bookDetails.css"


const ratingAndReview = {
  rating: "",
  review: "",
}
export const BookDetails = ({ viewedBook, handleStatus, setStatusTitle, setStatusMessage, setStatusColor }) => {
  const enableStatus = (title, message, color) => {
    handleStatus();
    setStatusTitle(title);
    setStatusMessage(message);
    setStatusColor(color);
  };

  const renderStars = (rating) => {
    const stars = [];
    const maxRating = 5; // Assuming the maximum rating is 5
    for (let i = 0; i < maxRating; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };


  const [ratingsAndReviews, setRatingsAndReview] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadAllReviewAndRatings();
  }, []);
  const loadAllReviewAndRatings = async () => {
    try {
      await axios.get(`/ratings/view/${viewedBook.id}`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`
        }
      }).then(
          response => {
            setRatingsAndReview(response.data.responseData);
            setLoading(false);
            console.log(response.data)
            console.log(response.data.responseData)
            console.log(response.data.responseMessage)
          }
      )
    } catch (error) {

      setLoading(false);
    }
  }

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "review") {
      setReview(value);
      return;
    }
  }

  const saveRatedBook = async ()=> {
    ratingAndReview.rating = rating;
    ratingAndReview.review = review;

    setError("");

    try {
      await axios.post(`/ratings/${viewedBook.id}`, ratingAndReview, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`
        }
      }).then(
          response => {
            console.log(response.data.responseData);

            if (response.data.responseMessage === "Your feedback was highly appreciated") {
              enableStatus(
                  "Already saved",
                  "Your review has been saved, Thanks for the feedback",
                  "bg-green-600",
              );
            } else {
              enableStatus(
                  "Error",
                  "There was an error",
                  "bg-red-300",
              );
            }
          }
      )
    } catch (error) {

      enableStatus(
          "Oops!",
          "Something went wrong please try again",
          "bg-red-600",
      );
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveBook = async (e) => {
    e.preventDefault()

    console.log(viewedBook.id)

    try {
      await axios.get(`/book/save/${viewedBook.id}`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`
        }
      }).then(
          response => {
            console.log(response.data.responseData);

            if (response.data.responseMessage === "alreadySaved") {
              enableStatus(
                  "Already saved",
                  "Book has already been saved",
                  "bg-red-300",
              );
            } else {
              enableStatus(
                  "Save Successful",
                  "Book has been saved successfully",
                  "bg-green-600",
              );
            }
          }
      )
    } catch (error) {

      enableStatus(
          "Oops!",
          "Something went wrong please try again",
          "bg-red-600",
      );
    }
  }

  const handleAddToCart = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("id", viewedBook.id)

    console.log(viewedBook.id)

    try {
      await axios.post('/cart/addToCart', formData, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`
        }
      }).then(
          response => {
            console.log(response.data.responseData);

            if (response.data.responseMessage === "alreadyAdded") {
              enableStatus(
                  "Already added",
                  "Book has already been added to Cart",
                  "bg-red-300",
              );
            } else {
              enableStatus(
                  "Add to Cart Successful",
                  "Book has been added to cart successfully",
                  "bg-green-600",
              );
            }
          }
      )
    } catch (error) {

      enableStatus(
          "Oops!",
          "Something went wrong please try again",
          "bg-red-600",
      );
    }
  }

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            maxWidth: "592px",
            maxHeight: "500px",
            margin: "auto",
            background: "white",
            borderRadius: "8px",
            padding: "0px",
          },
        }}
      >
        <PaymentOptions
            book={viewedBook}
            handleStatus={handleStatus}
            setStatusTitle={setStatusTitle}
            setStatusMessage={setStatusMessage}
            setStatusColor={setStatusColor}
            handleBuy={handleCloseModal}
        />
      </Modal>

      <div className="bg-white flex flex-col items-stretch pb-12 mt-8">
        <span className="flex w-full flex-col mt-16 px-16 max-md:max-w-full max-md:mt-10 max-md:px-5">
          <span className="items-stretch flex gap-1 self-start">
            <span className="text-black text-xl font-medium leading-7 whitespace-nowrap items-stretch aspect-[2.0357142857142856] justify-center">
              Home
            </span>
            <div className="text-black text-xl font-medium leading-7">/</div>
            <span className="text-black text-xl font-medium leading-7 whitespace-nowrap items-stretch aspect-[2.3214285714285716] justify-center">
              {viewedBook?.genre}
            </span>
            <div className="text-black text-xl font-medium leading-7">/</div>
            <span className="text-stone-300 text-xl font-medium leading-7 whitespace-nowrap items-stretch grow justify-center">
              {viewedBook?.bookTitle}
            </span>
          </span>

          <div className="self-stretch mt-5 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch max-md:w-full max-md:ml-0">
                <div className="justify-center shadow-sm bg-slate-50 flex grow flex-col w-fit items-start max-md:max-w-full max-md:mt-5 max-md:pr-5">
                  <img
                    loading="lazy"
                    srcSet={viewedBook?.bookCover}
                    className="aspect-[0.75] object-contain object-center w-[302px] overflow-hidden max-w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[67%] max-md:w-full max-md:ml-0">
                <span className="justify-center items-stretch flex grow flex-col mt-1.5 max-md:max-w-full max-md:mt-7">
                  <div className="text-neutral-800 text-3xl font-bold leading-10 max-md:max-w-full">
                    {viewedBook?.bookTitle}
                  </div>
                  <div className="text-black text-2xl leading-9 mt-6 max-md:max-w-full">
                    by <span className="text-black">{viewedBook?.author}</span>
                  </div>
                  <div className="text-black text-base font-light leading-7 mt-6 max-md:max-w-full">
                    {viewedBook?.description}
                  </div>
                  <div className="text-red-700 text-sm leading-7 max-md:max-w-full">
                    Read more
                  </div>
                  <div className="text-neutral-500 text-xl leading-7 mt-4">
                    {viewedBook?.genre}
                  </div>
                  <div className="text-black text-2xl font-bold leading-8 mt-4 max-md:max-w-full">
                    {viewedBook?.price === 0 ? "FREE" : viewedBook?.price}
                  </div>
                  <span className="flex gap-2 mt-4 items-start max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:pr-5">
                    <span
                      onClick={handleDownloadClick}
                      className="transition hover:bg-green-700 cursor-pointer max-w-[12.7rem] h-[3.8rem] text-center py-[1.2rem] text-white text-base font-medium leading-5 uppercase justify-center items-stretch bg-green-600 grow rounded-md border-[1.145px] border-solid border-green-600 max-md:px-5"
                    >
                      BUY NOW
                    </span>
                    <span onClick={handleAddToCart} className="hover:bg-gray-200 transition cursor-pointer  max-w-[12.7rem] h-[3.8rem] text-center py-[1.2rem] text-green-600 text-base font-medium leading-5 uppercase justify-center items-stretch self-stretch grow rounded-md border-[1.174px] border-solid border-green-600 max-md:px-5">
                      ADD TO CART
                    </span>
                    <div onClick={handleSaveBook} className="transition hover:border-solid hover:border-green-600 cursor-pointer max-w-[12.7rem] h-[3.8rem] text-center py-[1.2rem] text-rose-500 text-base font-medium leading-5 uppercase justify-center items-stretch self-stretch grow rounded-md max-md:px-5 border-[1.174px] border-white">
                      ADD TO SAVED
                    </div>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="text-neutral-800 text-3xl font-bold leading-10 self-stretch mt-28 max-md:max-w-full max-md:mt-10">
            Reviews and Ratings
          </div>
          <div className="bg-gray-200 self-stretch w-full shrink-0 h-[3px] mt-3" />
          <div className="flex justify-center gap-3.5 ml-9 mt-9 self-start items-start max-md:max-w-full max-md:flex-wrap">

            {[...Array(5)].map( (star, index) => {
              const currentRating = index + 1;
             return(
                 <label>
                   <input
                       type="radio"
                       name="rating"
                       value={currentRating}
                       onClick={() => setRating(currentRating)}
                   />
                   <FaStar
                       className="star"
                       size={50}
                       color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                       onMouseEnter={() => setHover(currentRating)}
                       onMouseLeave={() => setHover(null)}
                   />
                 </label>
             );
            })}
            <p className="mt-4 mr-4">Your Rating is {rating}</p>

            <textarea typeof="text" name="review" className="text-black-300 text-xl font-medium leading-7 tracking-wide items-stretch border-[color:var(--Gray-600,#757575)] w-[933px] max-w-full mt-2 pl-5 pr-2 pt-1.5 pb-11 rounded-md border-[1.694px] border-solid self-start max-md:max-w-full" placeholder="Enter a brief review of the book" onChange={handleInputChange}>

            </textarea>
            <div className="bg-gray-200 w-0.5 shrink-0 h-[157px]" />
            <span className="items-stretch self-center flex grow basis-[0%] flex-col my-auto">
              <button className="transition hover:bg-green-700 cursor-pointer mb-4 text-white text-base font-medium leading-5 uppercase whitespace-nowrap justify-center items-stretch bg-green-600 mt-1 px-4 py-5 rounded-md border-[1.11px] border-solid border-green-600" onClick={saveRatedBook}>
                Submit your Review
              </button>
            </span>
          </div>
          <div className="text-neutral-800 text-sm font-medium leading-5 self-stretch mt-12 max-md:max-w-full max-md:mt-10">
            All Book Reviews
          </div>

          {loading ? (
              <p>Loading</p>
              ) : ( ratingsAndReviews.map((ratings, index ) => (
                  <div key={index}>
          <div className="bg-gray-200 self-stretch w-full shrink-0 h-1 mt-3.5" />
          <span className="items-start flex w-[858px] max-w-full flex-col mt-5 pr-4 py-4 rounded-2xl self-start">
            <div className="items-stretch flex w-[122px] max-w-full gap-2 self-start">
              {renderStars(ratings.rating)}
            </div>
            <div className="self-stretch text-zinc-800 text-xs leading-4 tracking-wide mt-1 max-md:max-w-full">
              {ratings.review}
            </div>
            <div className="text-zinc-800 text-xs font-medium leading-4 tracking-tight whitespace-nowrap mt-1 self-start">
              {ratings.email}
            </div>
            <div className="text-zinc-400 text-xs leading-4 tracking-tight mt-1 self-start">
              {ratings.dateCreated}
            </div>
          </span>
                  </div>
        ))
        )}
        </span>
      </div>
    </div>
  );
};
