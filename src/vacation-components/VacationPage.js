import { useState, useEffect } from "react";
import VacationDetails from "./VacationDetails";
import WaitingPage from "./WaitingPage";
import data from "../assets/trips/Budapest_trip.json";
const VacationPage = (props) => {
  const [riddle, setRiddle] = useState(null);
  const [error, setError] = useState(false);
  const [showWaitingPage, setShowWaitingPage] = useState(true);

  // //Set error in case the server takes too much time to return a trip
  // useEffect(() => {
  //   if (props.data === null) {
  //     // Set a timeout to navigate after 3 minutes (300000 milliseconds)
  //     const timeoutId = setTimeout(() => {
  //       setError(true);
  //     }, 300000); // 5 minutes in milliseconds (5 * 60 * 1000)

  //     // Clean up the timeout when the component unmounts or props.data changes
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [props.data]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWaitingPage(false);
    }, 15000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);
  return (
    <>
      {showWaitingPage ? (
        <WaitingPage setRiddle={setRiddle} riddle={riddle} />
      ) : (
        <VacationDetails
          isLoggedIn={props.isLoggedIn}
          data={data}
          setData={props.setData}
          setRiddle={setRiddle}
          riddle={riddle}
          id={props.id}
          setId={props.setId}
          saved={props.saved}
        />
      )}
    </>
  );
};

export default VacationPage;
