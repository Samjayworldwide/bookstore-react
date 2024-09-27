import { PricingCard } from "./PricingCard";
import checkBox from "../../../assets/images/userCatImages/check_box.png";
import checkBox1 from "../../../assets/images/userCatImages/check_box (1).png";
import checkBox2 from "../../../assets/images/userCatImages/check_box (2).png";
import { useNavigate } from "react-router-dom";

export const Subscriptions = ({ handleStatus, setStatusTitle, setStatusMessage, setStatusColor }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-[75vw] mx-auto mt-[4.5rem]">
      <span
        onClick={goBack}
        className="cursor-pointer transition hover:scale-110 gap-1 items-center flex w-[75px] max-w-full"
      >
        <div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d7dd83f57cf0f0d55ac4589528b86a4f6e45a046fbd6c7d18b6110dd0c11edb?"
            className="aspect-square object-contain object-center w-[1.5rem] overflow-hidden shrink-0 flex-1 my-auto"
          />
        </div>

        <div className="text-black text-center text-sm leading-7 self-stretch whitespace-nowrap">
          Back
        </div>
      </span>
      <div className="text-black text-[2.5rem] font-bold leading-[56px] tracking-wide self-stretch mt-2 mb-5 max-md:max-w-full">
        My subscriptions
      </div>
      <div className="flex justify-center gap-9 mx-auto">
        {/* First PricingCard */}
        <PricingCard
          title="Light 😴"
          price="15,000"
          description="Enjoy reading books at a leisurely pace? occasionally dip into novels for relaxation or entertainment without diving deeply into extensive reading sessions."
          headerColor="bg-gray-300"
          redirectUrl="http://example.com"
          imageSrc={checkBox1}
          headerText="Basic"
          plan={"basic"}
          handleStatus={handleStatus}
          setStatusTitle={setStatusTitle}
          setStatusMessage={setStatusMessage}
          setStatusColor={setStatusColor}
        />

        {/* Second PricingCard with green color */}
        <PricingCard
          title="Casual 🤔"
          price="35,000"
          description="You can engage with reading regularly but may not delve deeply into extensive or complex texts"
          headerColor="bg-green-500"
          redirectUrl="http://example.com"
          imageSrc={checkBox}
          headerText="Most Popular"
          plan={"popular"}
          handleStatus={handleStatus}
          setStatusTitle={setStatusTitle}
          setStatusMessage={setStatusMessage}
          setStatusColor={setStatusColor}
        />

        {/* Third PricingCard with dark gray color */}
        <PricingCard
          title="Voracious 😋"
          price="50,000"
          description="Constantly hungry for new books to devour? eagerly explore diverse genres and topics with boundless enthusiasm."
          headerColor="bg-gray-500"
          redirectUrl="http://example.com"
          imageSrc={checkBox2}
          headerText="Best Deal"
          plan={"best"}
          handleStatus={handleStatus}
          setStatusTitle={setStatusTitle}
          setStatusMessage={setStatusMessage}
          setStatusColor={setStatusColor}
        />
      </div>
    </div>
  );
};
