import React from "react";
import { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  Container,
  Title,
  Text,
  Button,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FiArrowLeftCircle } from "react-icons/fi";
import { IoArrowBackCircle } from "react-icons/io5";

import Riddle from "./Riddle";
import VacationAccordion from "./VacationAccordion";
import { handleSave } from "./VacationHandler";
import JsonCsvConverter from "./JsonCsvConverter";
import { useMediaQuery } from "@mantine/hooks";

const VacationDetails = (props) => {
  const isMobile = useMediaQuery("(max-width: 60em)");
  const navigate = useNavigate();
  const [saved, setSaved] = useState(props.saved);
  const [opened, { close, open }] = useDisclosure(false);
  //create data var for the csv converter, without the locations
  const filteredData = { ...props.data };
  delete filteredData.locations;
  //Enables save trip when login/registered after fetching
  // useEffect(() => {
  //   if (props.setData && props.isLoggedIn && !props.data.saveable) {
  //     props.setData((prevState) => ({
  //       ...prevState,
  //       saveable: true,
  //     }));
  //   }
  // }, [props.isLoggedIn, props.data.saveable, props.setData, props]);
  const handleClick = () => {
    handleSave(props.data, saved, props.setId, props.id, setSaved);
  };
  //if the page hasn't load on time, then moving to error page
  const handleError = () => {
    setTimeout(() => {
      window.location.href = "/";
    }, 10000);
  };
  return (
    <div className="vacation-details-section">
      <Container
        className="vacation-container"
        size="responsive"
        w={isMobile ? "100%" : "90%"}
        mt={30}
        mb={30}
        pb={10}
      >
        {/* Can access riddle only from waiting page */}
        {props.riddle && (
          <Riddle riddle={props.riddle} setRiddle={props.setRiddle} />
        )}
        {/* Return btn only if came from the saved tours page */}
        {/* {props.saved && (
          <Button
            leftSection={<IoArrowBackCircle />}
            size="lg"
            m={10}
            radius={"lg"}
            className="return-btn-saved-tours"
            justify="space-between"
            onClick={() => {
              navigate("/saved-tours", { replace: true });
            }}
          >
            Back to saved tours
          </Button>
        )} */}
        {props.data ? (
          <>
            {props.riddle && (
              <Title align="center" p={20} order={1} fw={700}>
                Your Trip is ready!
              </Title>
            )}

            {props.data?.overview?.title && (
              <Title
                pl={20}
                pt={20}
                size={isMobile ? "2rem" : "2.5rem"}
                fw={600}
              >
                {props.data.overview.title}
              </Title>
            )}
            <Flex justify={"flex-end"} gap={"sm"}>
              {/* Can save new tours and only if login/registered */}
              {props.data?.saveable && (
                <Popover
                  classNames={{ dropdown: "popover" }}
                  width={130}
                  position="top"
                  withArrow
                  radius={20}
                  opened={opened}
                >
                  <Popover.Target>
                    <ActionIcon
                      onMouseEnter={open}
                      onMouseLeave={close}
                      className="action-btn"
                      size="xl"
                      c={"red"}
                      bg={"#fef6ec"}
                      onClick={() => {
                        handleClick();
                      }}
                    >
                      {saved ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown style={{ pointerEvents: "none" }}>
                    <Text size="md">Press here to save\unsave trip</Text>
                  </Popover.Dropdown>
                </Popover>
              )}

              <JsonCsvConverter jsonData={filteredData} />
            </Flex>
            {/* Display data content */}
            <VacationAccordion data={props.data} />
            <Flex direction={"row"} justify={"space-between"}>
              {/* If come for this page from the waiting, there is an option to go back to main form */}
              {props.riddle && (
                <HashLink to="/#main-form">
                  {" "}
                  <Button
                    className="return-btn-vacation-details"
                    size="xl"
                    m={10}
                    radius={"lg"}
                    justify="space-between"
                    w={"fit-content"}
                    variant="transparent"
                    c={"#57333d"}
                    bg={"transparent"}
                    leftSection={<FiArrowLeftCircle size={20} />}
                  >
                    Try again
                  </Button>
                </HashLink>
              )}
            </Flex>
          </>
        ) : (
          <>
            <Text size="lg" fw={600} p={10}>
              There has been en internal error, please try again later!
            </Text>
            {handleError()}
          </>
        )}
      </Container>
    </div>
  );
};

export default VacationDetails;
