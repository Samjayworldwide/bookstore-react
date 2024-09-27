import { useEffect, useState } from "react";

export const Filters = () => {
  const [showMore, setShowMore] = useState(false);
  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  // const [filledData, setFilledData] = useState(() => {
  //   const data = new FormData();
  //
  //   data.append("FANTASY", "FANTASY");
  //   data.append("ROMANCE", "ROMANCE");
  //
  //   return data;
  // });

  const [formData, setFormData] = useState({
    FANTASY: "",
    ROMANCE: "",
    NON_FICTION: "",
    ADVENTURE: "",
    HORROR: "",
    MUSICAL: "",
    SPIRITUAL: "",
    budget: {
      lessThan5000: false,
      between15000And20000: false,
      between20000And25000: false,
      greaterThan500: false,
    },
    rating: null,
  });

  const data = new FormData();

  const handleChange = (e) => {
    if (e.target.checked === true) {
      setFormData({ ...formData, [e.target.name]: e.target.name });
    } else {
      setFormData({ ...formData, [e.target.name]: "" });
    }
  };

  const handleBudgetCheckboxChange = (field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      budget: {
        ...prevFormData.budget,
        [field]: !prevFormData.budget[field],
      },
    }));
  };

  const [selectedRating, setSelectedRating] = useState(null);
  const handleRadioChange = (value) => {
    setSelectedRating(value);
  };

  const handleSubmit = () => {
    data.append("FANTASY", `${formData.FANTASY}`);
    data.append("ROMANCE", `${formData.ROMANCE}`);
    data.append("NON_FICTION", `${formData.NON_FICTION}`);
    data.append("ADVENTURE", `${formData.ADVENTURE}`);
    data.append("HORROR", `${formData.HORROR}`);
    data.append("MUSICAL", `${formData.MUSICAL}`);
    data.append("SPIRITUAL", `${formData.SPIRITUAL}`);
    // Add budget data to formData
    Object.entries(formData.budget).forEach(([key, value]) => {
      if (value) {
        data.append(`budget_${key}`, value.toString());
      }
    });
    // Add rating data to formData
    if (formData.rating !== null) {
      data.append("rating", formData.rating);
    }

    // if (data.get("FANTASY").length === 0 && data.get("ROMANCE").length === 0) {
    //   getData(filledData);
    // } else {
    //   getData(data);
    // }
  };

  // useEffect(() => {
  //   // Call the handleSubmit function whenever formData changes
  //   handleSubmit();
  // }, [formData]);

  return (
    <form className="justify-center items-stretch bg-white flex max-w-[18rem] flex-col px-8 py-7 rounded-md">
      <div className="overflow-hidden text-zinc-900 text-ellipsis whitespace-nowrap text-2xl font-bold">
        Filters
      </div>
      <span className="items-stretch flex justify-between gap-0 mt-11">
        <div className="overflow-hidden text-zinc-900 text-ellipsis whitespace-nowrap text-xl font-semibold grow">
          Categories
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/55eece25be896457b90f51eb56ab16267501ff84aa63de453cae5b740cfe25b1?"
          className="aspect-square object-contain object-center w-[25px] overflow-hidden shrink-0 max-w-full self-start"
        />
      </span>
      <span className="items-center flex flex-col justify-between gap-4 mt-6">
        {renderCheckbox("FANTASY", "Fantasy", formData.FANTASY, handleChange)}
        {renderCheckbox("ROMANCE", "Romance", formData.ROMANCE, handleChange)}
        {showMore && (
          <>
            {renderCheckbox(
              "NON_FICTION",
              "Non-fiction",
              formData.NON_FICTION,
              handleChange,
            )}
            {renderCheckbox(
              "ADVENTURE",
              "Adventure",
              formData.ADVENTURE,
              handleChange,
            )}
            {renderCheckbox("HORROR", "Horror", formData.HORROR, handleChange)}
            {renderCheckbox(
              "MUSICAL",
              "Musical",
              formData.MUSICAL,
              handleChange,
            )}
            {renderCheckbox(
              "SPIRITUAL",
              "Spiritual",
              formData.SPIRITUAL,
              handleChange,
            )}
          </>
        )}
      </span>
      <span className="flex justify-between gap-1.5 mt-6 pr-4 items-start">
        <div
          className="text-emerald-700 text-xl font-semibold cursor-pointer"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more"}
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1d48398ad4121cb80f7750ede868e3621e9cd273fdff222f0d504ddfe13ca4b?"
          className="aspect-square object-contain object-center w-[25px] overflow-hidden self-stretch shrink-0 max-w-full"
        />
      </span>
      <span className="items-stretch flex justify-between gap-0 mt-11">
        <div className="overflow-hidden text-zinc-900 text-ellipsis whitespace-nowrap text-xl font-[556] grow">
          Your Budget
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/08d4c08d8ad55fb934b39eda3ee58376800a7f986680956f14782b7f76c3f1d7?"
          className="aspect-square object-contain object-center w-[25px] overflow-hidden shrink-0 max-w-full self-start"
        />
      </span>
      <span className="items-center flex flex-col justify-between gap-4 mt-6">
        {renderCheckbox(
          "LESS THAN ₦10000",
          "Less than ₦10000",
          formData.budget.lessThan5000,
          () => handleBudgetCheckboxChange("lessThan5000"),
        )}
        {renderCheckbox(
          "₦15000 - ₦20000",
          "₦15000 - ₦20000",
          formData.budget.between15000And20000,
          () => handleBudgetCheckboxChange("between15000And20000"),
        )}
        {showMore2 && (
          <>
            {renderCheckbox(
              "₦20000 - ₦25000",
              "₦20000 - ₦25000",
              formData.budget.between20000And25000,
              () => handleBudgetCheckboxChange("between20000And25000"),
            )}
            {renderCheckbox(
              "GREATER THAN ₦25000",
              "Greater than ₦25000",
              formData.budget.greaterThan500,
              () => handleBudgetCheckboxChange("greaterThan500"),
            )}
          </>
        )}
      </span>

      <span className="flex justify-between gap-1.5 mt-6 pr-4 items-start">
        <div
          className="text-emerald-700 text-xl font-semibold cursor-pointer"
          onClick={() => setShowMore2(!showMore2)}
        >
          {showMore2 ? "Show less" : "Show more"}
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4197910499d52782dc44b0a553bf1721e90ce574f2353ba8f9bda960049fad0f?"
          className="aspect-square object-contain object-center w-[25px] overflow-hidden self-stretch shrink-0 max-w-full"
        />
      </span>
      <span className="items-stretch flex justify-between gap-0 mt-11">
        <div className="overflow-hidden text-zinc-900 text-ellipsis whitespace-nowrap text-xl font-semibold grow">
          Rating
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb4ce552aa08ccbebbf60768007b35db1a62e288eeea58edee23d713b9158c43?"
          className="aspect-[1.04] object-contain object-center w-[25px] overflow-hidden shrink-0 max-w-full self-start"
        />
      </span>
      <span className="items-center flex flex-col justify-between gap-3 mt-4">
        {renderRadio(
          "1_STAR",
          "starRating",
          "1 Star",
          "1 Star",
          selectedRating,
          handleRadioChange,
        )}
        {renderRadio(
          "2_STARS",
          "starRating",
          "2 Stars",
          "2 Stars",
          selectedRating,
          handleRadioChange,
        )}
        {renderRadio(
          "3_STARS",
          "starRating",
          "3 Stars",
          "3 Stars",
          selectedRating,
          handleRadioChange,
        )}
        {showMore1 && (
          <>
            {renderRadio(
              "4_STARS",
              "starRating",
              "4 Stars",
              "4 Stars",
              selectedRating,
              handleRadioChange,
            )}
            {renderRadio(
              "5_STARS",
              "starRating",
              "5 Stars",
              "5 Stars",
              selectedRating,
              handleRadioChange,
            )}
          </>
        )}
      </span>
      <span className="flex justify-between gap-1.5 mt-6 pr-4 items-start">
        <div
          className="text-emerald-700 text-xl font-semibold cursor-pointer"
          onClick={() => setShowMore1(!showMore1)}
        >
          {showMore1 ? "Show less" : "Show more"}
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f59782dfb7b3830646a97617a75335d45d1417088b506885c1b4abac4752bc9?"
          className="aspect-square object-contain object-center w-[25px] overflow-hidden self-stretch shrink-0 max-w-full"
        />
      </span>
    </form>
  );
};

const renderCheckbox = (inputName, label, value, onChange) => (
  <div className="items-stretch flex w-full justify-between gap-2">
    <input
      type="checkbox"
      id={inputName}
      name={inputName}
      checked={value}
      onChange={onChange}
      className="aspect-[0.75] object-contain object-center w-[15px] overflow-hidden shrink-0 max-w-full bg-green-500 cursor-pointer"
    />
    <label
      htmlFor={inputName}
      className="overflow-hidden text-xl text-zinc-900 text-ellipsis whitespace-nowrap self-stretch grow cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        onChange({ target: { checked: !value, name: inputName } });
      }}
    >
      {label}
    </label>
  </div>
);

const renderRadio = (
  inputId,
  inputName,
  label,
  value,
  selectedValue,
  handleRadioChange,
) => (
  <div className="items-stretch flex w-full justify-between gap-2">
    <input
      type="radio"
      id={inputId}
      name={inputName}
      value={value}
      checked={selectedValue === value}
      onChange={() => handleRadioChange(value)}
      className="aspect-[0.75] object-contain object-center w-[15px] overflow-hidden shrink-0 max-w-full bg-green-500 cursor-pointer"
    />
    <label
      htmlFor={inputId}
      className="overflow-hidden text-zinc-900 text-ellipsis whitespace-nowrap text-xl self-stretch grow cursor-pointer"
    >
      {label}
    </label>
  </div>
);
