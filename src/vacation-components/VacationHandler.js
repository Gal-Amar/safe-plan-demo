//Function to fetch the riddles in the waiting page
const fetchFRiddles = (setRiddle, setLoaderActive) => {
  const apiKey = "ZvOXYoMlBRVdAs7ZDSkuRw==wLe2nyhaMZ6tJaoe";

  fetch(`https://api.api-ninjas.com/v1/riddles`, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })
    .then((data) => {
      setRiddle(data);
      if (setLoaderActive !== null) setLoaderActive(false);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

//Decoding the user mail
const decodeMail = (email) => {
  const [localPart, domainPart] = email.split("@");
  const decodeLocalPart = atob(localPart);
  const decodeDomainPart = atob(domainPart);
  return decodeLocalPart + "@" + decodeDomainPart;
};
// Submit main form data to chatGpt api to receive trip description
const submitForm = async (values, setData) => {
  const baseUrl =
    "https://safeplane-78a3982e4d7a.herokuapp.com/generate-response";
  const email =
    localStorage.getItem("email") !== null
      ? decodeMail(localStorage.getItem("email"))
      : "global";
  const url = `${baseUrl}?email=${email}`;

  if (localStorage.getItem("formData")) {
    localStorage.removeItem("formData");
  }
  console.log(JSON.stringify(values));

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      console.log("Response data:", responseData);
      return waitingForAnswer(setData, email);
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors
    });
};
//sending in loop get request to server, waiting for the trip details to arrive
const waitingForAnswer = async (setData, email) => {
  const baseUrl =
    "https://safeplane-78a3982e4d7a.herokuapp.com/get-improved-response";
  const url = `${baseUrl}/${email}`;

  let response = null;
  while (
    !response ||
    response.message ===
      "No improved response available yet. Please try again later."
  ) {
    try {
      const res = await fetch(url);
      response = await res.json();
      if (
        response.message ===
        "No improved response available yet. Please try again later."
      ) {
        await new Promise((resolve) => setTimeout(resolve, 10000)); // Retry after 10 seconds
      }
    } catch (error) {
      console.error("Error fetching data in loop: ", error);
      throw new Error("Error fetching data");
    }
  }

  setData(response);
  localStorage.setItem("formData", JSON.stringify(response));
};
//Fetching images from Serper api
const fetchImages = (setImages, q) => {
  var myHeaders = new Headers();
  myHeaders.append("X-API-KEY", "de14091ca2ef32506bbf7f916080abb333507a80");
  myHeaders.append("Content-Type", "application/json");

  // var raw = JSON.stringify(data);
  var raw = JSON.stringify({
    q: q,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://google.serper.dev/images", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      setImages(responseData);
      console.log(responseData);
    })

    .catch((error) => console.log("error", error));
};

//Handle save trip in history
const handleSave = (data, saved, setId, id, setSaved) => {
  const email =
    localStorage.getItem("email") !== null
      ? decodeMail(localStorage.getItem("email"))
      : "global";

  if (!saved) {
    const baseUrl =
      "https://safeplane-78a3982e4d7a.herokuapp.com/update-user-history";
    const url = `${baseUrl}/${email}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setSaved(true);
        return response.json();
      })
      .then((responseData) => {
        setId(responseData.index);
      })

      .catch((error) => console.log("error", error));
  } else {
    const baseUrl =
      "https://safeplane-78a3982e4d7a.herokuapp.com/remove-from-history";
    const url = `${baseUrl}/${email}/${id}`;
    fetch(url, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else setSaved(false);
      })
      .then((responseData) => {})

      .catch((error) => console.log("error", error));
  }
};

export { fetchImages, submitForm, fetchFRiddles, decodeMail, handleSave };
