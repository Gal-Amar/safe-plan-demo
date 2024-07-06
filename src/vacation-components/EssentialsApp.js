import {
  Container,
  Title,
  Text,
  Avatar,
  Anchor,
  Group,
  SimpleGrid,
  Spoiler,
} from "@mantine/core";
import mapsLogo from "../assets/google-maps.svg";
import TripAdvisor from "../assets/tripadvisor-icon.svg";
import Booking from "../assets/bookinglogo.svg";
import Airbnb from "../assets/airbnb.png";
import Skyscanner from "../assets/Skyscanner.svg";
import UberLyft from "../assets/ubberLift.png";
import GoogleTranslate from "../assets/google-translate.svg";
import Duolingo from "../assets/duolingo.svg";
import FaceBook from "../assets/facebook.svg";
import { FaExternalLinkAlt } from "react-icons/fa";
// list of used apps in travels and vacations in the world
const apps = [
  {
    icon: mapsLogo,
    href: "https://www.google.com/maps",
    title: "Google Maps",
    description:
      "Google Maps is a detailed map app with real-time traffic updates and navigation. It helps travelers find places easily and gives accurate directions, making it essential for exploring new locations.",
  },
  {
    icon: TripAdvisor,
    href: "https://www.tripadvisor.com/",
    title: "TripAdvisor",
    description:
      "TripAdvisor is a review platform where travelers share experiences and find recommended hotels, restaurants, and attractions worldwide. It's great for discovering popular places based on other travelers' feedback.",
  },
  {
    icon: Booking,
    href: "https://www.booking.com/",
    title: "Booking.com",
    description:
      "Booking.com is an app for booking accommodations like hotels and apartments. It offers a wide range of choices and competitive prices, making it convenient for finding and reserving places to stay.",
  },
  {
    icon: Skyscanner,
    href: "https://www.skyscanner.com/",
    title: "Skyscanner",
    description:
      "Skyscanner helps travelers find the best flight deals by comparing prices across airlines and booking sites. It's perfect for finding affordable flights for your trips.",
  },
  {
    icon: UberLyft,
    hrefUber: "https://www.uber.com/il/en/",
    hrefLyft: "https://www.lyft.com/",
    title: "Uber/Lyft",
    description:
      "Uber and Lyft are ride-sharing apps for convenient transportation. They offer rides with upfront pricing, easy payments, and driver ratings, making it simple to get around in many cities.",
  },
  {
    icon: GoogleTranslate,
    href: "https://translate.google.co.il/?hl=iw",
    title: "Google Translate",
    description:
      "Google Translate translates languages using text, voice, or images. It's useful for communicating in foreign languages while traveling.",
  },
  {
    icon: Duolingo,
    href: "https://www.duolingo.com/",
    title: "Duolingo",
    description:
      "Duolingo is a language-learning app for beginners. It's fun and interactive, helping travelers learn basic phrases and vocabulary in foreign languages.",
  },
  {
    icon: FaceBook,
    href: "https://www.facebook.com/",
    title: "FaceBook",
    description:
      "On Facebook, you can discover groups for almost any country where you'll find tips, connect with people who have been there, ask questions, and explore firsthand experiences and recommendations from others.",
  },
  {
    icon: Airbnb,
    href: "https://www.airbnb.com/",
    title: "Airbnb",
    description:
      "Airbnb lets travelers book unique homes and stays hosted by locals. It's ideal for finding personalized and authentic accommodations beyond traditional hotels.",
  },
];

function Feature({ item }, key) {
  return (
    <Group wrap="nowrap" key={key}>
      <Avatar src={item.icon} size={60} variant="light" />
      <Container className="apps-content">
        <Spoiler
          classNames={{
            control: "app-control",
            content: "app-spoiler-content",
          }}
          maxHeight={100}
          showLabel={"Expend for more"}
          hideLabel={"Close"}
          transitionDuration={5}
        >
          <Title fw={700} mt={5} className="app-title" order={3}>
            {item.title}
          </Title>
          <Text c="dimmed" fz="md">
            {item.description}
          </Text>
          {key !== "Uber/Lyft" && (
            <Anchor target="_blank" href={item.href} className="app-web">
              Website link <FaExternalLinkAlt />
            </Anchor>
          )}
          {key === "Uber/Lyft" && (
            <div>
              {" "}
              <Anchor target="_blank" href={item.hrefUber} className="app-web">
                Website link - Uber
                <FaExternalLinkAlt />
              </Anchor>
              <Anchor target="_blank" href={item.hrefLyft} className="app-web">
                Website link Lyft
                <FaExternalLinkAlt />
              </Anchor>
            </div>
          )}
        </Spoiler>
      </Container>
    </Group>
  );
}

const EssentialApps = (props) => {
  const items = apps.map((item) => <Feature item={item} key={item.title} />);

  return (
    <Container mt={30} mb={30} className="apps-container" size={"responsive"}>
      <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }} spacing={50}>
        {items}
      </SimpleGrid>
    </Container>
  );
};

export default EssentialApps;
