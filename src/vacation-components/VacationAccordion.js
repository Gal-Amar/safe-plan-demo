import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  List,
  Accordion,
  Avatar,
  Anchor,
  Center,
  Grid,
  Group,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { LuPlane } from "react-icons/lu";
import { FaBusAlt } from "react-icons/fa";
import { MdOutlineAttractions } from "react-icons/md";
import { RiRestaurantLine } from "react-icons/ri";
import { HiGlobeAlt } from "react-icons/hi2";
import { HiExternalLink } from "react-icons/hi";

import beach from "../assets/beach.png";
import hotel from "../assets/hotel.png";
import apps from "../assets/apps.png";
import days from "../assets/days.png";
import coconut from "../assets/coconut.png";
import summary from "../assets/summary.png";

import Maps from "./Maps";
import ImagesCarousel from "./ImagesCarousel";
import EssentialApps from "./EssentialsApp";

//Accordion that contain all the information about the vacation
const VacationAccordion = (props) => {
  const matches = useMediaQuery("(max-width: 64em)"); //media query for dynamic styling
  const isMobile = useMediaQuery("(max-width: 38em)");
  const [mapStates, setMapStates] = useState([]); //An array that indicates each days, in the days section when to be rendered

  useEffect(() => {
    if (props.data && props.data.detailed_vacation_plan) {
      const initialMapStates = Object.keys(
        props.data.detailed_vacation_plan
      ).map(() => false);
      setMapStates(initialMapStates);
    }
  }, [props.data]);

  const handleAccordionClick = (index) => {
    setMapStates((prevMapStates) => {
      const newMapStates = [...prevMapStates];
      newMapStates[index] = !prevMapStates[index];
      return newMapStates;
    });
  };

  return (
    <Accordion
      chevronPosition="right"
      variant="filled"
      multiple={true}
      chevronSize={30}
      p={10}
      pt={20}
    >
      <Accordion.Item value="overview" className="vacation-accordion-item">
        <Accordion.Control className="vacation-accordion-control">
          <Group wrap="nowrap">
            <Avatar src={days} radius="xl" size={isMobile ? "md" : "lg"} />
            <div>
              <Title className="vacation-title" order={2}>
                Vacation Introduction
              </Title>
              <Text size="sm" c="dimmed" fw={400}>
                First learn about the destination
              </Text>
            </div>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <List size="lg">
            {/* ========= OVERVIEW SECTION ============ */}
            {props.data?.overview &&
              props.data.overview !== "N/A" &&
              props.data.overview !== "" && (
                <>
                  {props.data.overview?.about &&
                    props.data.overview.about !== "N/A" &&
                    props.data.overview.about !== "" && (
                      <List.Item p={5}>
                        <Text className="vacation-text">
                          <span className={"title-list-item"}>
                            General Information:{" "}
                          </span>
                          {props.data.overview.about}
                        </Text>
                      </List.Item>
                    )}
                  {props.data.overview?.currency &&
                    props.data.overview.currency !== "N/A" &&
                    props.data.overview.currency !== "" && (
                      <List.Item p={5}>
                        <Text className="vacation-text">
                          <span className={"title-list-item"}>Currency: </span>
                          {props.data.overview.currency}
                        </Text>
                        <Anchor
                          fw={500}
                          c={"black"}
                          href={"https://www.hamara.co.il/"}
                        >
                          Click here for currency calculator <HiExternalLink />
                        </Anchor>
                      </List.Item>
                    )}
                  {props.data.overview?.language &&
                    props.data.overview.language !== "N/A" &&
                    props.data.overview.language !== "" && (
                      <List.Item p={5}>
                        <Text className="vacation-text">
                          <span className={"title-list-item"}>
                            Spoken language:{" "}
                          </span>
                          {props.data.overview.language}
                        </Text>
                      </List.Item>
                    )}
                  {props.data.overview?.current_weather &&
                    props.data.overview.current_weather !== "N/A" &&
                    props.data.overview.current_weather !== "" && (
                      <List.Item p={5}>
                        <Text className="vacation-text">
                          <span className={"title-list-item"}>Weather: </span>
                          {props.data.overview.current_weather}
                        </Text>
                      </List.Item>
                    )}
                  {props.data.overview?.clothing &&
                    props.data.overview.clothing !== "N/A" &&
                    props.data.overview.clothing !== "" && (
                      <List.Item p={5}>
                        <Text className="vacation-text">
                          <span className={"title-list-item"}>
                            Clothing recommendation:{" "}
                          </span>
                          {props.data.overview.clothing}
                        </Text>
                      </List.Item>
                    )}
                </>
              )}
          </List>
        </Accordion.Panel>
      </Accordion.Item>

      <div>
        {/* ========= DAYS SECTION ============ */}
        {props.data?.detailed_vacation_plan &&
          props.data.detailed_vacation_plan !== "N/A" &&
          Object.keys(props.data.detailed_vacation_plan).map(
            (dayKey, dayIndex) => {
              const dayDetails = props.data.detailed_vacation_plan[dayKey];
              const locations = props.data.locations[dayKey];

              return (
                <Accordion.Item
                  key={dayIndex}
                  value={dayKey}
                  className="vacation-accordion-item"
                >
                  <Accordion.Control
                    className="vacation-accordion-control"
                    onClick={() => {
                      handleAccordionClick(dayIndex);
                    }}
                  >
                    <Group wrap="nowrap">
                      <Avatar
                        src={beach}
                        radius="xl"
                        size={isMobile ? "md" : "lg"}
                      />
                      <div>
                        <Title className="vacation-title" order={2}>{`Day ${
                          dayIndex + 1
                        }`}</Title>
                        <Text size="sm" c="dimmed" fw={400}>
                          Enjoy our daily plan
                        </Text>
                      </div>
                    </Group>
                  </Accordion.Control>
                  {/* ========= PART OF DAY SECTION ============ */}
                  {Object.keys(dayDetails).map((partOfDay) => {
                    const partDetails = dayDetails[partOfDay];

                    if (mapStates[dayIndex] === true) {
                      return (
                        <Accordion.Panel key={partOfDay}>
                          {partOfDay === "Morning" ||
                          partOfDay === "Noon" ||
                          partOfDay === "Evening" ? (
                            <>
                              <Title
                                className="part-day-title "
                                order={2}
                                mt={5}
                              >
                                {partOfDay.charAt(0).toUpperCase() +
                                  partOfDay.slice(1)}
                              </Title>

                              {partDetails ? (
                                partDetails !== "N/A" &&
                                partDetails !== "" && (
                                  <div>
                                    <List>
                                      {partDetails?.flight &&
                                        partDetails.flight !== "N/A" &&
                                        partDetails.flight !== "" && (
                                          <List.Item>
                                            <Container>
                                              <Text
                                                mt={5}
                                                mb={5}
                                                className="vacation-text "
                                              >
                                                <span
                                                  className={"title-list-item "}
                                                >
                                                  Flight: <LuPlane />
                                                </span>
                                                {partDetails.flight}
                                              </Text>
                                            </Container>
                                          </List.Item>
                                        )}
                                      {partDetails?.transport_options &&
                                        partDetails.transport_options !==
                                          "N/A" &&
                                        partDetails?.transport_options?.mode &&
                                        partDetails.transport_options.mode !==
                                          "N/A" &&
                                        partDetails?.transport_options
                                          ?.time_frames &&
                                        partDetails.transport_options
                                          .time_frames !== "N/A" &&
                                        partDetails?.transport_options.mode !==
                                          "" &&
                                        partDetails.transport_options
                                          .time_frames !== "" && (
                                          <List.Item>
                                            <Container>
                                              <Text
                                                mt={5}
                                                mb={5}
                                                className="vacation-text "
                                              >
                                                <span
                                                  className={"title-list-item "}
                                                >
                                                  Transportation Options:{" "}
                                                  <FaBusAlt />
                                                </span>
                                                {
                                                  partDetails.transport_options
                                                    .mode
                                                }{" "}
                                                in during the{" "}
                                                {partDetails.transport_options.time_frames
                                                  .charAt(0)
                                                  .toLowerCase() +
                                                  partDetails.transport_options.time_frames.slice(
                                                    1
                                                  )}
                                              </Text>
                                            </Container>
                                          </List.Item>
                                        )}
                                      {partDetails?.attractions &&
                                        partDetails.attractions.detail !== "" &&
                                        partDetails.attractions.detail !==
                                          "N/A" && (
                                          <Grid
                                            gutter={"xl"}
                                            justify="space-between"
                                          >
                                            <Grid.Col span={matches ? 12 : 6}>
                                              <List.Item>
                                                <Container>
                                                  <Text
                                                    mt={5}
                                                    mb={5}
                                                    className="vacation-text"
                                                  >
                                                    <span
                                                      className={
                                                        "title-list-item "
                                                      }
                                                    >
                                                      Attractions
                                                      recommendations:
                                                      <MdOutlineAttractions
                                                        size={27}
                                                      />
                                                    </span>
                                                    {
                                                      partDetails.attractions
                                                        .name
                                                    }
                                                  </Text>

                                                  <List>
                                                    {partDetails?.attractions
                                                      ?.detail &&
                                                      partDetails.attractions
                                                        .detail !== "N/A" &&
                                                      partDetails.attractions
                                                        .detail !== "" && (
                                                        <List.Item>
                                                          <Text
                                                            mt={5}
                                                            mb={5}
                                                            className="vacation-text "
                                                          >
                                                            <span
                                                              className={
                                                                "title-detail-item "
                                                              }
                                                            >
                                                              Description:
                                                            </span>{" "}
                                                            {
                                                              partDetails
                                                                .attractions
                                                                .detail
                                                            }
                                                          </Text>
                                                        </List.Item>
                                                      )}
                                                    {partDetails?.attractions
                                                      ?.address &&
                                                      partDetails.attractions
                                                        .address !== "N/A" &&
                                                      partDetails.attractions
                                                        .address !== "" && (
                                                        <List.Item>
                                                          <Text
                                                            mt={5}
                                                            mb={5}
                                                            className="vacation-text "
                                                          >
                                                            <span
                                                              className={
                                                                "title-detail-item "
                                                              }
                                                            >
                                                              Address:
                                                            </span>{" "}
                                                            {
                                                              partDetails
                                                                .attractions
                                                                .address
                                                            }
                                                          </Text>
                                                        </List.Item>
                                                      )}
                                                    {partDetails?.attractions
                                                      ?.amenities &&
                                                      partDetails.attractions
                                                        .amenities !== "N/A" &&
                                                      partDetails.attractions
                                                        .amenities !== "" && (
                                                        <List.Item>
                                                          <Text
                                                            mt={5}
                                                            mb={5}
                                                            className="vacation-text "
                                                          >
                                                            {" "}
                                                            <span
                                                              className={
                                                                "title-detail-item "
                                                              }
                                                            >
                                                              Amenities:{" "}
                                                            </span>
                                                            {
                                                              partDetails
                                                                .attractions
                                                                .amenities
                                                            }
                                                          </Text>
                                                        </List.Item>
                                                      )}
                                                    {partDetails?.attractions
                                                      ?.contact &&
                                                      partDetails.attractions
                                                        .contact !== "N/A" &&
                                                      partDetails.attractions
                                                        .contact !== "" && (
                                                        <List.Item>
                                                          <Text
                                                            mt={5}
                                                            mb={5}
                                                            className="vacation-text "
                                                          >
                                                            <span
                                                              className={
                                                                "title-detail-item "
                                                              }
                                                            >
                                                              Phone Number:{" "}
                                                            </span>
                                                            {
                                                              partDetails
                                                                .attractions
                                                                .contact
                                                            }
                                                          </Text>
                                                        </List.Item>
                                                      )}

                                                    {partDetails?.attractions
                                                      ?.price_range &&
                                                      partDetails.attractions
                                                        .price_range !==
                                                        "N/A" &&
                                                      partDetails.attractions
                                                        .price_range !== "" && (
                                                        <List.Item>
                                                          <Text
                                                            mt={5}
                                                            mb={5}
                                                            className="vacation-text vacation"
                                                          >
                                                            {" "}
                                                            <span
                                                              className={
                                                                "title-detail-item vacation"
                                                              }
                                                            >
                                                              Price range:
                                                            </span>
                                                            {
                                                              partDetails
                                                                .attractions
                                                                .price_range
                                                            }
                                                          </Text>
                                                        </List.Item>
                                                      )}
                                                    {partDetails?.attractions
                                                      ?.website_link &&
                                                      partDetails.attractions
                                                        .website_link !==
                                                        "N/A" &&
                                                      partDetails.attractions
                                                        .website_link !==
                                                        "" && (
                                                        <List.Item>
                                                          <Anchor
                                                            c={"black"}
                                                            className="vacation-text "
                                                            href={
                                                              partDetails
                                                                .attractions
                                                                .website_link
                                                            }
                                                            target="_blank"
                                                          >
                                                            <span
                                                              mt={5}
                                                              mb={5}
                                                              className={
                                                                "title-detail-item vacation"
                                                              }
                                                            >
                                                              Website link:{" "}
                                                              <HiGlobeAlt
                                                                size={24}
                                                              />{" "}
                                                            </span>
                                                            {
                                                              partDetails
                                                                .attractions
                                                                .website_link
                                                            }
                                                          </Anchor>
                                                        </List.Item>
                                                      )}
                                                  </List>
                                                </Container>
                                              </List.Item>
                                            </Grid.Col>
                                            <Grid.Col span={matches ? 12 : 5}>
                                              {partDetails?.attractions?.name &&
                                                partDetails.attractions.name !==
                                                  "N/A" &&
                                                partDetails.attractions.name !==
                                                  "" &&
                                                partDetails?.attractions
                                                  ?.address &&
                                                partDetails.attractions
                                                  .address !== "" &&
                                                partDetails.attractions
                                                  .address !== "N/A" &&
                                                partDetails?.attractions?.detail.substring(
                                                  0,
                                                  9
                                                ) !== "Check-out" &&
                                                partDetails?.attractions?.detail.substring(
                                                  0,
                                                  7
                                                ) !== "Arrival" &&
                                                partDetails?.attractions
                                                  ?.images && (
                                                  <Center>
                                                    <ImagesCarousel
                                                      width={"100%"}
                                                      images={
                                                        partDetails.attractions
                                                          .images
                                                      }
                                                      q={
                                                        partDetails.attractions
                                                          .name +
                                                        " " +
                                                        partDetails.attractions
                                                          .detail
                                                      }
                                                    />
                                                  </Center>
                                                )}
                                            </Grid.Col>
                                          </Grid>
                                        )}
                                      {partDetails?.restaurant &&
                                        partDetails.restaurant !== "N/A" &&
                                        partDetails.restaurant !== "" &&
                                        partDetails?.restaurant?.name !== "" &&
                                        partDetails?.restaurant?.name !==
                                          "N/A" && (
                                          <Grid
                                            gutter="xl"
                                            justify="space-between"
                                            align="center"
                                            mt={10}
                                          >
                                            <Grid.Col span={matches ? 12 : 6}>
                                              <List.Item>
                                                <Container>
                                                  <Text
                                                    mt={5}
                                                    mb={5}
                                                    className="vacation-text "
                                                  >
                                                    <span
                                                      className={
                                                        "title-list-item "
                                                      }
                                                    >
                                                      Restaurant
                                                      recommendations:
                                                      <RiRestaurantLine />
                                                    </span>
                                                    {partDetails.restaurant
                                                      .name &&
                                                      partDetails.restaurant
                                                        .name}
                                                  </Text>

                                                  <List>
                                                    {partDetails?.restaurant
                                                      ?.address &&
                                                      partDetails.restaurant
                                                        .address !== "N/A" &&
                                                      partDetails.restaurant
                                                        .address !== "" && (
                                                        <List.Item>
                                                          <Text className="vacation-text ">
                                                            <span className="title-detail-item ">
                                                              Address:{" "}
                                                            </span>

                                                            {
                                                              partDetails
                                                                .restaurant
                                                                .address
                                                            }
                                                          </Text>
                                                        </List.Item>
                                                      )}
                                                    {partDetails?.restaurant
                                                      ?.contact &&
                                                      partDetails.restaurant
                                                        .contact !== "N/A" &&
                                                      partDetails.restaurant
                                                        .contact !== "" && (
                                                        <List.Item>
                                                          <Text className="vacation-text ">
                                                            <span className="title-detail-item">
                                                              Phone Number:{" "}
                                                            </span>
                                                            {
                                                              partDetails
                                                                .restaurant
                                                                .contact
                                                            }
                                                          </Text>
                                                        </List.Item>
                                                      )}

                                                    {partDetails?.restaurant
                                                      ?.price_range &&
                                                      partDetails.restaurant
                                                        .price_range !== "" &&
                                                      partDetails.restaurant
                                                        .price_range !==
                                                        "N/A" && (
                                                        <List.Item>
                                                          <Text
                                                            className="vacation-text vacation"
                                                            mt={5}
                                                            mb={5}
                                                          >
                                                            <span
                                                              className={
                                                                "title-detail-item vacation"
                                                              }
                                                            >
                                                              Price range:
                                                            </span>{" "}
                                                            {
                                                              partDetails
                                                                .restaurant
                                                                .price_range
                                                            }
                                                          </Text>
                                                        </List.Item>
                                                      )}
                                                    {partDetails?.restaurant
                                                      ?.recommended_dish &&
                                                      partDetails.restaurant
                                                        .recommended_dish !==
                                                        "N/A" &&
                                                      partDetails.restaurant
                                                        .recommended_dish !==
                                                        "" && (
                                                        <List.Item>
                                                          <Text className="vacation-text ">
                                                            <span
                                                              className={
                                                                "title-detail-item"
                                                              }
                                                            >
                                                              Recommended dish:
                                                            </span>{" "}
                                                            {
                                                              partDetails
                                                                .restaurant
                                                                .recommended_dish
                                                            }
                                                          </Text>
                                                        </List.Item>
                                                      )}
                                                    {partDetails?.restaurant
                                                      ?.website_link &&
                                                      partDetails.restaurant
                                                        .website_link !==
                                                        "N/A" &&
                                                      partDetails.restaurant
                                                        .website_link !==
                                                        "" && (
                                                        <List.Item>
                                                          <Anchor
                                                            className="vacation-text link"
                                                            c={"black"}
                                                            href={` ${partDetails.restaurant.website_link}`}
                                                            target="_blank"
                                                          >
                                                            <span
                                                              className="title-detail-item vacation"
                                                              mt={5}
                                                              mb={5}
                                                            >
                                                              Website link:
                                                              <HiGlobeAlt />
                                                            </span>
                                                            {
                                                              partDetails
                                                                .restaurant
                                                                .website_link
                                                            }
                                                          </Anchor>
                                                        </List.Item>
                                                      )}
                                                  </List>
                                                </Container>
                                              </List.Item>
                                            </Grid.Col>
                                            {partDetails?.restaurant?.name &&
                                              partDetails.restaurant.name !==
                                                "N/A" &&
                                              partDetails.restaurant.name !==
                                                "" &&
                                              partDetails?.restaurant
                                                ?.address &&
                                              partDetails.restaurant.address !==
                                                "N/A" &&
                                              partDetails.restaurant.address !==
                                                "" &&
                                              partDetails.restaurant.images && (
                                                <Grid.Col
                                                  span={matches ? 12 : 5}
                                                >
                                                  <Center>
                                                    <ImagesCarousel
                                                      width={"100%"}
                                                      images={
                                                        partDetails.restaurant
                                                          .images
                                                      }
                                                      q={
                                                        "restaurant " +
                                                        partDetails.restaurant
                                                          .name +
                                                        partDetails.restaurant
                                                          .address
                                                      }
                                                    />
                                                  </Center>
                                                </Grid.Col>
                                              )}
                                          </Grid>
                                        )}
                                    </List>
                                  </div>
                                )
                              ) : (
                                <p>
                                  No details available for this part of the day.
                                </p>
                              )}
                              {props.data?.locations &&
                                partOfDay === "Evening" &&
                                mapStates[dayIndex] && (
                                  <div>
                                    <Maps
                                      locations={locations}
                                      key={dayIndex}
                                    />
                                  </div>
                                )}
                            </>
                          ) : partDetails !== "N/A" &&
                            partOfDay === "transport_options" ? (
                            <>
                              <Title
                                className="part-day-title "
                                order={2}
                                mt={5}
                              >
                                Transportation options:
                              </Title>
                              {partDetails &&
                                partDetails !== "N/A" &&
                                partDetails !== "" && (
                                  <List>
                                    <List.Item>
                                      <Container>
                                        <Text
                                          mt={5}
                                          mb={5}
                                          className="vacation-text "
                                        >
                                          {partDetails}
                                        </Text>
                                      </Container>
                                    </List.Item>
                                  </List>
                                )}
                              <List>
                                {partDetails?.flight &&
                                  partDetails.flight !== "N/A" &&
                                  partDetails.flight !== "" && (
                                    <List.Item>
                                      <Container>
                                        <Text
                                          mt={5}
                                          mb={5}
                                          className="vacation-text "
                                        >
                                          <span className={"title-list-item "}>
                                            Flight <LuPlane /> :
                                          </span>
                                          {partDetails.flight}
                                        </Text>
                                      </Container>
                                    </List.Item>
                                  )}
                                {partDetails?.mode &&
                                  partDetails.mode !== "N/A" &&
                                  partDetails.mode !== "" && (
                                    <List.Item>
                                      <Container>
                                        <Text
                                          mt={5}
                                          mb={5}
                                          className="vacation-text "
                                        >
                                          <span className={"title-list-item "}>
                                            Mode:
                                          </span>
                                          {partDetails.mode}
                                        </Text>
                                      </Container>
                                    </List.Item>
                                  )}
                                {partDetails?.time_frames &&
                                  partDetails.time_frames !== "N/A" &&
                                  partDetails.time_frames !== "" && (
                                    <List.Item>
                                      <Container>
                                        <Text
                                          mt={5}
                                          mb={5}
                                          className="vacation-text "
                                        >
                                          <span className={"title-list-item "}>
                                            Time frame:
                                          </span>
                                          {partDetails.time_frames}
                                        </Text>
                                      </Container>
                                    </List.Item>
                                  )}{" "}
                              </List>
                            </>
                          ) : partOfDay === "flight" &&
                            partDetails !== "N/A" &&
                            partDetails !== "" ? (
                            <>
                              <Title
                                className="part-day-title "
                                order={2}
                                mt={5}
                              >
                                {partOfDay.charAt(0).toUpperCase() +
                                  partOfDay.slice(1)}{" "}
                                <LuPlane />
                              </Title>
                              <List>
                                <List.Item>
                                  <Container>
                                    <Text
                                      mt={5}
                                      mb={5}
                                      className="vacation-text "
                                    >
                                      {partDetails}
                                    </Text>
                                  </Container>
                                </List.Item>
                              </List>
                            </>
                          ) : partOfDay === "Full day activities" &&
                            partDetails !== "N/A" &&
                            partDetails !== "" ? (
                            <>
                              <Title
                                className="part-day-title"
                                order={2}
                                mt={5}
                              >
                                {partOfDay.charAt(0).toUpperCase() +
                                  partOfDay.slice(1)}
                              </Title>
                              <Text mt={5} mb={5} className="vacation-text">
                                {partDetails}
                              </Text>
                            </>
                          ) : null}
                        </Accordion.Panel>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Accordion.Item>
              );
            }
          )}
      </div>
      {/* ========ACCOMMODATIONS SECTIONS ========= */}
      {props.data?.accommodations &&
        props.data.accommodations !== "N/A" &&
        props.data.accommodations !== "" && (
          <Accordion.Item value="hotels" className="vacation-accordion-item">
            <Accordion.Control className="vacation-accordion-control">
              <Group wrap="nowrap">
                <Avatar src={hotel} radius="xl" size={isMobile ? "md" : "lg"} />
                <div>
                  <Title className="vacation-title" order={2}>
                    Hotel Recommendations
                  </Title>
                  <Text size="sm" c="dimmed" fw={400}>
                    Explore our recommended hotel options
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <List>
                {props.data?.accommodations?.name &&
                  props.data.accommodations.name !== "N/A" &&
                  props.data.accommodations.name !== "" && (
                    <List.Item>
                      <Text className="vacation-text" mt={5} mb={5}>
                        <span className="title-list-item">Name:</span>{" "}
                        {props.data.accommodations.name}
                      </Text>
                    </List.Item>
                  )}
                {props.data?.accommodations?.address &&
                  props.data.accommodations.address !== "N/A" &&
                  props.data.accommodations.address !== "" && (
                    <List.Item>
                      <Text className="vacation-text" mt={5} mb={5}>
                        <span className="title-list-item">Address:</span>{" "}
                        {props.data.accommodations.address}
                      </Text>
                    </List.Item>
                  )}
                {props.data?.accommodations?.contact &&
                  props.data.accommodations.contact !== "N/A" &&
                  props.data.accommodations.contact !== "" && (
                    <List.Item>
                      <Text className="vacation-text" mt={5} mb={5}>
                        <span className="title-list-item">Contact:</span>{" "}
                        {props.data.accommodations.contact}
                      </Text>
                    </List.Item>
                  )}
                {props.data?.accommodations?.price_range &&
                  props.data.accommodations.price_range !== "N/A" &&
                  props.data.accommodations.price_range !== "" && (
                    <List.Item>
                      <Text className="vacation-text" mt={5} mb={5}>
                        <span className="title-list-item">Price Range:</span>{" "}
                        {props.data.accommodations.price_range}
                      </Text>
                    </List.Item>
                  )}
                {props.data?.accommodations?.reviews &&
                  props.data.accommodations.reviews !== "N/A" &&
                  props.data.accommodations.reviews !== "" && (
                    <List.Item>
                      <Text className="vacation-text" mt={5} mb={5}>
                        <span className="title-list-item">Reviews:</span>{" "}
                        {props.data.accommodations.reviews}
                      </Text>
                    </List.Item>
                  )}
                {props.data?.accommodations?.website_link &&
                  props.data.accommodations.website_link !== "N/A" &&
                  props.data.accommodations.website_link !== "" && (
                    <List.Item>
                      <Anchor
                        c={"black"}
                        className="vacation-text "
                        href={props.data.accommodations.website_link}
                        target="_blank"
                      >
                        <span mt={5} mb={5} className={"title-detail-item"}>
                          Website link: <HiGlobeAlt size={24} />
                        </span>
                        {props.data.accommodations.website_link}
                      </Anchor>
                    </List.Item>
                  )}
              </List>
            </Accordion.Panel>
          </Accordion.Item>
        )}
      {/* ========ESSENTIAL APPS SECTIONS ========= */}
      <Accordion.Item value="apps" className="vacation-accordion-item">
        <Accordion.Control className="vacation-accordion-control">
          <Group wrap="nowrap">
            <Avatar src={apps} radius="xl" size={isMobile ? "md" : "lg"} />
            <div>
              <Title className="vacation-title" order={2}>
                Essential Applications
              </Title>
              <Text size="sm" c="dimmed" fw={400}>
                Top travel applications to consider{" "}
              </Text>
            </div>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          {props.data?.essential_apps &&
            props.data.essential_apps !== "N/A" &&
            props.data.essential_apps !== "" && (
              <Text className="vacation-text" mt={5} mb={5}>
                {props.data.essential_apps}
              </Text>
            )}
          <EssentialApps saveable={props.data?.saveable} />
        </Accordion.Panel>
      </Accordion.Item>
      {/* ========ADDITIONAL RECOMMENDATION SECTIONS ========= */}
      {props.data?.additional_recommendations &&
        props.data.additional_recommendations !== "N/A" &&
        props.data.additional_recommendations !== "" && (
          <Accordion.Item
            value="recommendation"
            className="vacation-accordion-item"
          >
            <Accordion.Control className="vacation-accordion-control">
              <Group wrap="nowrap">
                <Avatar
                  src={coconut}
                  radius="xl"
                  size={isMobile ? "md" : "lg"}
                />
                <div>
                  <Title className="vacation-title" order={2}>
                    Additional Recommendations
                  </Title>
                  <Text size="sm" c="dimmed" fw={400}>
                    Here are some more recommendations for you
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Text className="vacation-text">
                {props.data.additional_recommendations}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        )}
      {/* ========SUMMARY SECTIONS ========= */}
      {props.data?.summary &&
        props.data.summary !== "N/A" &&
        props.data.summary !== "" && (
          <Accordion.Item value="summary" className="vacation-accordion-item">
            <Accordion.Control className="vacation-accordion-control">
              <Group wrap="nowrap">
                <Avatar
                  src={summary}
                  radius="xl"
                  size={isMobile ? "md" : "lg"}
                />
                <div>
                  <Title className="vacation-title" order={2}>
                    Summary
                  </Title>
                  <Text size="sm" c="dimmed" fw={400}>
                    Travel summary
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Text className="vacation-text" mt={5} mb={5}>
                {props.data.summary}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        )}
    </Accordion>
  );
};

export default VacationAccordion;
