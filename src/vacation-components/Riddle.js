import {
  UnstyledButton,
  Drawer,
  Container,
  Card,
  Flex,
  Text,
  Title,
  Button,
  Loader,
} from "@mantine/core";
import { CgNotes } from "react-icons/cg";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { fetchFRiddles } from "./VacationHandler";
import { FaRegSmileBeam } from "react-icons/fa";
// Fetching riddles for the time that the user is waiting
const Riddle = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [active, setActive] = useState(false);
  const [loaderActive, setLoaderActive] = useState(false);
  return (
    <div className="facts" dir="ltr">
      <UnstyledButton
        size="compact-xl"
        onClick={open}
        className="floating-indicator"
      >
        <Flex align={"center"} direction={"column"} c={"#57333d"}>
          <Text fw={600}>Saved riddle</Text>
          <CgNotes size={50} stroke={1.5} />
        </Flex>
      </UnstyledButton>
      <Drawer
        classNames={{
          title: "drawer-title",
          body: "drawer-body",
          header: "drawer-header",
          close: "drawer-close",
          content: "drawer-content",
        }}
        align="center"
        size="lg"
        opened={opened}
        radius={"lg"}
        title="Saved Riddle"
        offset={8}
        onClose={close}
      >
        <Container>
          <Card
            className="vacation-waiting-card"
            p={30}
            mb={30}
            h={"fit-content"}
          >
            <Title order={2} fw={600} mb={10} className="riddle">
              We have saved your riddle in case you are still thinking about
              it...
            </Title>

            {props.riddle && (
              <div>
                <Title mt={10} order={3} className="riddle">
                  {" "}
                  Riddle subject: {props.riddle[0].title}
                </Title>
                <Text className="riddle" size={"xl"} fw={500} mt={10}>
                  {props.riddle[0].question}
                </Text>
                <Flex align={"center"} direction={"column"}>
                  <Button
                    w={"fit-content"}
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
                      }, 15000);
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
              </div>
            )}
          </Card>
        </Container>
      </Drawer>
    </div>
  );
};

export default Riddle;
