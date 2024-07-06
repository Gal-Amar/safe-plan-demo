import {
  Image,
  Text,
  Container,
  ThemeIcon,
  Title,
  SimpleGrid,
} from "@mantine/core";

const data = [
  {
    image: "efficient",
    title: "Efficient Trip Planning",
    description:
      "Our Website simplifies travel planning,ensuring users can organize their entire trip in minutes, saving them valuable time and effort",
  },
  {
    image: "organized",
    title: "Visual Organization",
    description:
      "Our website's visually organized layout makes finding information effortless, allowing users to quickly locate relevant details and plan their trip with confidence.",
  },
  {
    image: "diverse",
    title: "Diverse personalized Recommendations",
    description:
      "Our website delivers personalized recommendations based on users preferences, ensuring each itinerary is uniquely crafted to meet their needs and desires.",
  },
  {
    image: "revolutionized",
    title: "Revolutionizing Travel Planning:",
    description:
      "With user-centric design and cutting-edge technology, Our website revolutionizes travel planning, offering seamless and personalized experiences.",
  },
];

const AboutUs = () => {
  const items = data.map((item) => (
    <div className="about-us-item-wrapper" key={item.image} id="about-us">
      <ThemeIcon
        variant="light"
        className="about-us-image"
        size={60}
        radius="md"
      >
        <Image src={require(`../assets/${item.image}.png`)} />
      </ThemeIcon>

      <div>
        <Text fw={600} fz="lg" className="about-us-title">
          {item.title}
        </Text>
        <Text c="dimmed">{item.description}</Text>
      </div>
    </div>
  ));
  return (
    <div className="about-us-section" id="about-us">
      <Container className="about-us-wrapper">
        <Title order={2}>
          Safe Plan is <span className="about-us-highlight">not</span> a simple
          trip planning
        </Title>
        <Container size={660} p={0}>
          <Text c="dimmed" className="about-us-des">
            Safe Plane simplifies travel planning by providing personalized
            recommendations for hotels, flights, and activities. It uses
            predefined templates to input your requirements and ensures a
            seamless vacation planning experience.
          </Text>
        </Container>
        <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={50} mt={30}>
          {items}
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default AboutUs;
