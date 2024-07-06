import AboutUs from "./home-components/AboutUs";
import ContactUs from "./home-components/ContactUs";
import FirstMenu from "./home-components/FirstMenu";
import MainForm from "./home-components/MainForm";
import SuggestionsGrid from "./home-components/SuggestionsGrid";

const Home = (props) => {
  return (
    <div className="home-page">
      <FirstMenu open={props.open} openLoggedIn={props.openLoggedIn} />
      <MainForm setData={props.setData} />
      <SuggestionsGrid />
      <AboutUs />
      <ContactUs />
    </div>
  );
};

export default Home;
