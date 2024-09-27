import { UserDashboardHeader } from "./UserDashboardHeader.jsx";
import { MyBooks } from "./MyBooks.jsx";
import { Route, Routes } from "react-router-dom";
import { UserCategoryPage } from "../userCategory/UserCategoryPage.jsx";
import { Subscriptions } from "./Subscriptions.jsx";
import { PurchasedBooks } from "./PurchasedBooks.jsx";
import { SavedBooks } from "./SavedBooks.jsx";
import { AccountSetting } from "./AccountSetting.jsx";
import { Checkout } from "./Checkout.jsx";
import {useEffect, useState} from "react";
import axios from "../../../api/axios.jsx";

export const UserDashboardPage = ({handleStatus, setStatusTitle, setStatusMessage, setStatusColor}) => {

  const [dependency, setDependency] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/user", {
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`
        }
      }).then(
          response => {
            setUser(response.data.responseData)
          }
      )
    }

    fetchData()

  }, [dependency]);

  const [user, setUser] = useState();

  const setDep = () => {
    setDependency(!dependency);
  }

  return (
    <>
      <div className="m-auto pb-[5rem]">
        <div
          className="fixed w-[100vw] bg-white"
          style={{
            boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.04)",
            zIndex: "100",
          }}
        >
          <UserDashboardHeader
            userData={user}
          />
        </div>

        <div className="pt-[3rem]">
          <Routes>
            <Route path={"/"} element={<MyBooks />} />

            <Route path={"/categories"} element={
              <UserCategoryPage
                  handleStatus={handleStatus}
                  setStatusTitle={setStatusTitle}
                  setStatusMessage={setStatusMessage}
                  setStatusColor={setStatusColor}
              />
            }
            />

            <Route path={"/subscription"} element={
              <Subscriptions
                  handleStatus={handleStatus}
                  setStatusTitle={setStatusTitle}
                  setStatusMessage={setStatusMessage}
                  setStatusColor={setStatusColor}
              />
            } />

            <Route path={"/purchased-books"} element={<PurchasedBooks
                handleStatus={handleStatus}
                setStatusTitle={setStatusTitle}
                setStatusMessage={setStatusMessage}
                setStatusColor={setStatusColor}/>} />

            <Route path={"/saved-books"} element={
              <SavedBooks
                  handleStatus={handleStatus}
                  setStatusTitle={setStatusTitle}
                  setStatusMessage={setStatusMessage}
                  setStatusColor={setStatusColor}
              />
            }
            />

            <Route
              path={"/profile"}
              element={
                <AccountSetting
                  handleStatus={handleStatus}
                  setStatusTitle={setStatusTitle}
                  setStatusMessage={setStatusMessage}
                  setStatusColor={setStatusColor}
                  userData={user}
                  setDep={setDep}
                />
              }
            />

            <Route path={"/cart"} element={<Checkout />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
