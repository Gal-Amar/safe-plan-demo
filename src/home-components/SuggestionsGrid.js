import {
  Grid,
  Title,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconCircleArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import SuggModal from "./SuggModal";
import data from "../assets/trips/sugg_trips.json";
const SuggestionsGrid = () => {
  const isMobile = useMediaQuery("(max-width: 60em)");
  const isSmallMobile = useMediaQuery("(max-width: 38em)");

  //  const [data, setData] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [dataForModal, setDataForModal] = useState(null);

  //Fetching travels saved in the DB
  // useEffect(() => {
  //   const email = "alex@gmail.com";
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://safeplane-78a3982e4d7a.herokuapp.com/get-user-history/${email}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const res = await response.json();
  //       setData(res);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="grid-wrapper">
      <Title className="sugg-grid-title" size={isMobile ? "1.5rem" : "2.5rem"}>
        You Can Also Enjoy Our Suggestions For The Perfect Vacation
      </Title>

      {data && (
        <Grid
          className="sugg-grid"
          justify="center"
          pl={isSmallMobile ? "1rem" : "5rem"}
          pr={isSmallMobile ? "1rem" : "5rem"}
        >
          {data.map((item) => (
            <Grid.Col
              span={{ base: 12, md: 4, sm: 6 }}
              key={(item.id, item.image)}
            >
              <Card
                shadow="lg"
                padding="lg"
                radius="lg"
                withBorder
                h={"340px"}
                classNames={{ root: "sugg-grid-card-root" }}
              >
                <Card.Section>
                  <Image src={item.image} height={160} alt="Destination" />
                </Card.Section>
                <Group justify="space-between" mt="md" mb="xs" wrap="noWrap">
                  <Text className="sugg-grid-card-title" fw={600}>
                    {item.data.overview.title}
                  </Text>
                  <Badge className="sugg-grid-badge" w={80}>
                    {item.period}
                  </Badge>
                </Group>
                <Text mb={10} size="sm" c="dimmed" lineClamp={5}>
                  {item.data.overview.about}
                </Text>
                <Button
                  size="compact-md"
                  className="sugg-grid-button"
                  rightSection={<IconCircleArrowRight />}
                  onClick={() => {
                    setDataForModal(item.data); //connecting each model to its relevant trip
                    open();
                  }}
                >
                  Continue Reading
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}
      {dataForModal && (
        <SuggModal opened={opened} close={close} data={dataForModal} />
      )}
    </div>
  );
};

export default SuggestionsGrid;
