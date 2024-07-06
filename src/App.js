import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HeaderTabs from "./HeaderTabs";
import Home from "./Home";
import Login from "./account-components/Login";
import LoggedInModal from "./account-components/LoggedInModal";
import Footer from "./Footer";
import VacationPage from "./vacation-components/VacationPage";
import SavedPage from "./vacation-components/SavedPage";
import NotFoundPage from "./NotFoundPage";

function App() {
  const [opened, setOpened] = useState(false);
  const [openedLoggedInModal, setLoggedInModalOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("formData")) {
      // Check local storage for saved form data (for refresh)
      const savedData = localStorage.getItem("formData");
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    }
  }, []);
  return (
    <Router>
      <div className="app-container">
        <HeaderTabs
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          open={setOpened}
          openLoggedIn={setLoggedInModalOpened}
        />
        <Login
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          open={opened}
          close={setOpened}
        />
        <LoggedInModal
          open={openedLoggedInModal}
          close={setLoggedInModalOpened}
        />

        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  open={setOpened}
                  openLoggedIn={setLoggedInModalOpened}
                  setData={setData}
                  setSaved={setSaved}
                />
              }
            />

            <Route
              path="/details"
              element={
                <VacationPage
                  setData={setData}
                  data={data}
                  id={id}
                  setId={setId}
                  saved={saved}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/saved-tours"
              element={
                <SavedPage
                  setData={setData}
                  setSaved={setSaved}
                  setId={setId}
                />
              }
            />
            <Route path="/not-found" element={<NotFoundPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
