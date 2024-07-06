import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";

function MyLocation(setForm, form, setSearch, setValue) {
  // Check if Geolocation is supported
  if ("geolocation" in navigator) {
    // Request user's location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setSearch("Loading...");

        const { latitude, longitude } = pos.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        // Fetch location details based on coordinates
        fetch(url)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to fetch location details");
            }
            return res.json();
          })
          .then((data) => {
            // Extract city and country from location data
            const location = data.address.city
              ? `${data.address.city}, ${data.address.country}`
              : data.address.country;

            // Update form field with location
            setSearch(location);
            setValue(location);
            setForm((prevState) => ({
              ...prevState,
              originCountry: location,
            }));
          })
          .catch((err) => {
            console.error("Error fetching location:", err);

            // Show error notification to user
            notifications.show({
              color: "red",
              autoClose: 5000,
              radius: 15,
              icon: <IconX />,
              style: {
                opacity: 0.95,
              },

              title: "Location Error",
              message: "Failed to retrieve location information.",
            });
          });
      },
      (error) => {
        console.error("Error getting location:", error);

        // Show error notification for location access denial
        notifications.show({
          color: "red",
          autoClose: 5000,
          radius: 15,
          icon: <IconX />,
          style: {
            opacity: 0.95,
          },

          title: "Location Access Denied",
          message: "Please allow access to your location.",
        });
      }
    );
  } else {
    // Geolocation not supported by the browser
    console.log("Geolocation is not supported");

    // Show error notification for unsupported browser
    notifications.show({
      color: "red",
      autoClose: 5000,
      radius: 15,
      icon: <IconX />,
      title: "Location Error",
      message: "Geolocation is not supported by your browser.",
    });
  }
}

export default MyLocation;
