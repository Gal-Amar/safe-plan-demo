import {
  Title,
  Text,
  Button,
  Group,
  Container,
  Loader,
  Divider,
  Flex,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { decodeMail } from "./VacationHandler";
import { useNavigate } from "react-router-dom";
import { IoArrowForwardCircle } from "react-icons/io5";

const SavedPage = (props) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleClick = (key) => {
    localStorage.setItem("formData", JSON.stringify(data[key].data));
    props.setData(data[key].data);
    props.setSaved(true);
    props.setId(data[key].index);
    navigate("/details", { replace: true });
  };
  //Fetching saved history of the user
  useEffect(() => {
    const email = localStorage.getItem("email");

    const fetchData = async () => {
      const decodeEmail = decodeMail(localStorage.getItem("email"));

      try {
        const response = await fetch(
          `https://safeplane-78a3982e4d7a.herokuapp.com/get-user-history/${decodeEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const responseData = await response.json();
          if (responseData.detail === "404: History not found") {
            setData([]);
            return;
          } else navigate("/not-found", { replace: true });
        }
        const res = await response.json();
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (email !== null) fetchData();
  }, [navigate]);

  return (
    <div className="grid-wrapper">
      <Title className="sugg-grid-title">Explore your saved tours:</Title>
      {data && data.length === 0 ? (
        <>
          {/* If the user has'nt saved anything yet */}
          <Container className="saved-empty-container" align={"center"} mt={30}>
            <Title order={2}>You don't have anything saved yet!</Title>

            <Button
              size="lg"
              m={10}
              radius={"lg"}
              variant="gradient"
              justify="space-between"
              gradient={{ from: "#57333d", to: "#eb8d94", deg: 90 }}
              w={"fit-content"}
              onClick={() => {
                navigate("/#main-form", { replace: true });
              }}
            >
              Start saving tours!
            </Button>
          </Container>
        </>
      ) : data ? (
        <Container className="saved-section">
          {Object.keys(data).map((key) => (
            <Container className="saved-container" key={key}>
              <Group justify="space-between" mt="md" mb="xs">
                <Text className="sugg-grid-card-title" fw={600}>
                  {data[key].data.overview.title}
                </Text>
              </Group>
              <Text mb={10} size="sm" c="dimmed" lineClamp={5}>
                {data[key].data.overview.about}
              </Text>
              <Flex justify={"flex-end"}>
                <Button
                  className="continue-reading-saved-tour"
                  rightSection={<IoArrowForwardCircle />}
                  size="lg"
                  m={10}
                  radius={"lg"}
                  variant="transparent"
                  c={"#57333d"}
                  justify="space-between"
                  w={"fit-content"}
                  onClick={() => {
                    handleClick(key);
                  }}
                >
                  Continue Reading
                </Button>
              </Flex>
              <Divider size="sm" color={"gray"} />
            </Container>
          ))}
        </Container>
      ) : (
        <>
          <Loader color="#eb8d94" size="xl" type="bars" />
        </>
      )}
    </div>
  );
};

export default SavedPage;
