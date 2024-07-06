//Encoding the user mail
const encodeMail = (email) => {
  const [localPart, domainPart] = email.split("@");
  const encodeLocalPart = btoa(localPart);
  const encodeDomainPart = btoa(domainPart);
  return encodeLocalPart + "@" + encodeDomainPart;
};

const saveUser = (email, close, toggle, setIsLoggedIn, setMessage, message) => {
  //saving the encoded user name in local storage of the browser
  localStorage.setItem("email", encodeMail(email));
  setMessage(message);
  setIsLoggedIn(true);
  setTimeout(() => {
    setMessage("");
    close();
    toggle("login");
  }, 2000);
};

const handleResponse = (
  form,
  close,
  setIsLoggedIn,
  setMessage,
  responseData,
  toggle
) => {
  if (responseData.message === "Credentials are valid") {
    saveUser(
      form.values.email,
      close,
      toggle,
      setIsLoggedIn,
      setMessage,
      "Successfully logged in!"
    );
  } else if (responseData.message === "User added successfully") {
    saveUser(
      form.values.email,
      close,
      toggle,
      setIsLoggedIn,
      setMessage,
      "Successfully signed in!"
    );
  } else {
    switch (responseData.detail) {
      case "Invalid Credentials":
        setMessage("Name or password is not correct");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        break;
      case "400: Email already exists":
        setMessage("Email already exists, please sign in");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        break;
      case "No password hash found for the user" || "User not found":
        setMessage("User don't exist in our system, please sign up");
        setTimeout(() => {
          setMessage("");
        }, 3000);
        break;
      default:
        setMessage("Error occurred in our system, please try again later");
        setTimeout(() => {
          setMessage("");
          close();
          toggle("login");
        }, 5000);
    }
  }
};
//submit handler for login
const submitHandler = async (
  event,
  form,
  type,
  setMessage,
  close,
  setIsLoggedIn,
  toggle
) => {
  event.preventDefault();

  if (type === "register") {
    try {
      const response = await fetch(
        "https://safeplane-78a3982e4d7a.herokuapp.com/add-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form.values),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log(responseData);
      handleResponse(
        form,
        close,
        setIsLoggedIn,
        setMessage,
        responseData,
        toggle
      );
    } catch (error) {
      setMessage("We encountered a system error. Please try again later.");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  } else {
    try {
      const response = await fetch(
        "https://safeplane-78a3982e4d7a.herokuapp.com/check-credentials",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form.values),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();

      handleResponse(
        form,
        close,
        setIsLoggedIn,
        setMessage,
        responseData,
        toggle
      );
    } catch (error) {
      setMessage("We encountered a system error. Please try again later.");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  }
};

const handleLoginButtonClick = (open, openLoggedIn) => {
  openLoggedIn(true);
  setTimeout(() => {
    openLoggedIn(false);
  }, 2000);
};

const handleLogOut = (key, setIsLoggedIn) => {
  if (localStorage.getItem("formData")) {
    localStorage.removeItem("formData");
  }
  localStorage.removeItem(key);
  setIsLoggedIn(false);
};

const handleChangeAccount = (key, setIsLoggedIn, open) => {
  handleLogOut(key, setIsLoggedIn);
  open(true);
};

export {
  submitHandler,
  handleLoginButtonClick,
  handleLogOut,
  handleChangeAccount,
};
