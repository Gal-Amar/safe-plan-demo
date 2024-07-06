import { fetchFRiddles } from "./VacationHandler";
import CancelModal from "./CancelModal";
import { useDisclosure } from "@mantine/hooks";

import {
  Container,
  Card,
  Title,
  Text,
  Loader,
  Flex,
  Anchor,
  Button,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { IoAirplaneOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegSmileBeam } from "react-icons/fa";

const WaitingPage = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(false);
  const [loaderActive, setLoaderActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchFRiddles(props.setRiddle, null);
      } catch (error) {
        console.error("Error fetching riddle:", error);
      }
    };

    if (props.riddle === null) {
      fetchData();
    }
  }, [props.riddle, props.setRiddle]);

  return (
    <div className="waiting-page">
      <Container className="vacation-container ">
        <Title align="center" pt={10}>
          Your Vacation is on the way
        </Title>

        <Text align="center" fw={450} size="xl" c={"red"}>
          Please avoid refreshing or closing this page as the process may take a
          minute or two.
        </Text>
        <div className="facts-up">
          <div className="facts-loader">
            <Flex direction={"row"} align={"center"}>
              <Loader color="black" type="dots" />
              <IoAirplaneOutline className="airplane-icon" />
            </Flex>
          </div>
        </div>
        <Card className="vacation-waiting-card" h={"fit-content"}>
          {props.riddle && (
            <Container
              className="vacation-waiting-inner-card"
              h={"fit-content"}
            >
              <Container>
                <Title order={1} className="riddle">
                  In the meantime we have prepared a riddle for you to solve:
                </Title>
                <Title mt={10} order={3} className="riddle">
                  {" "}
                  Riddle subject: {props.riddle[0].title}
                </Title>
                <Text className="riddle" size={"xl"} fw={400} mt={10}>
                  {props.riddle[0].question}
                </Text>
              </Container>
              <Flex align={"center"} direction={"column"}>
                <Button
                  size="lg"
                  mt={10}
                  variant="light"
                  radius={10}
                  color="#57333d"
                  className="riddle-btn"
                  onClick={() => {
                    setTimeout(() => {
                      // Call fetchFacts() after the delay
                      fetchFRiddles(props.setRiddle, setLoaderActive); // Replace fetchFacts() with your actual function call
                      setActive(false);
                    }, 10000);
                    setTimeout(() => {
                      setLoaderActive(true);
                    }, 2000);
                    setActive(!active);
                  }}
                >
                  Reveal answer?
                </Button>
                <Text
                  className={`riddle  ${
                    active === true ? "" : "riddle-answer"
                  }`}
                  fw={500}
                  mb={10}
                  size="lg"
                >
                  {" "}
                  {props.riddle[0].answer}
                </Text>
                <Text
                  className={`riddle  ${
                    loaderActive === true ? "" : "riddle-answer"
                  }`}
                  fw={500}
                  mb={10}
                  size="lg"
                  c={"red"}
                >
                  {" "}
                  Let's switch riddle so you wont get bored <FaRegSmileBeam />
                </Text>
                <Loader
                  className={`riddle  ${
                    loaderActive === true ? "" : "riddle-answer"
                  }`}
                  color="red"
                  type="dots"
                />
              </Flex>
            </Container>
          )}
        </Card>

        <div className="facts-down">
          <div className="facts-loader">
            <Flex direction={"row"} align={"center"}>
              <Loader color="black" type="dots" />
              <IoAirplaneOutline className="airplane-icon" />
            </Flex>
          </div>
        </div>
        <Flex justify="flex-end">
          <Anchor size="xl" onClick={() => open()}>
            <FaRegTrashCan
              color="white"
              size={50}
              className=" btn trash-icon"
            />
          </Anchor>
        </Flex>
        <CancelModal
          opened={opened}
          close={close}
          form={null}
          message={"You are about to cancel everything!"}
          toggle={props.toggle}
        />
      </Container>
    </div>
  );
};

export default WaitingPage;
