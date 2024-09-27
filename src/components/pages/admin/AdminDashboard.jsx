import { AdminSideBar } from "./AdminSideBar.jsx";
import { AdminHeader } from "./AdminHeader";
import { Route, Routes } from "react-router-dom";
import { AddNewBook } from "./AddNewBook.jsx";
import { ViewBooks } from "./ViewBooks.jsx";
import { AccountSetting } from "../userDashboard/AccountSetting.jsx";
import { useEffect, useState } from "react";
import axios from "../../../api/axios.jsx";

export const AdminDashboard = ({
  handleStatus,
  setStatusTitle,
  setStatusMessage,
  setStatusColor,
}) => {
  const [dependency, setDependency] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/user", {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
          },
        })
        .then((response) => {
          setUser(response.data.responseData);
        });
    };

    fetchData();
  }, [dependency]);

  const [user, setUser] = useState();

  const setDep = () => {
    setDependency(!dependency);
  };

  return (
    <>
      <div className="bg-white gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0 ">
        <div>
          <AdminSideBar />
        </div>
        <div>
          <AdminHeader />
        </div>
        <div>
          <Routes>
            <Route
              path={"/"}
              element={
                <AddNewBook
                  handleStatus={handleStatus}
                  setStatusTitle={setStatusTitle}
                  setStatusMessage={setStatusMessage}
                  setStatusColor={setStatusColor}
                />
              }
            />

            <Route
              path={"/view-books"}
              element={
                <ViewBooks
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
          </Routes>
        </div>
      </div>
    </>
  );
};
