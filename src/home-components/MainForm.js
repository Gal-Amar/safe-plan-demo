import DatePickerMainForm from "../form-components/DatePickerMainForm";
import AgesSelect from "../form-components/AgesSelect";
import CountrySelectCreatable from "../form-components/CountrySelectCreatable";
import BudgetRange from "../form-components/BudgetRange";
import AdditionalData from "../form-components/AdditionalData";
import MySegmentedControl from "../form-components/MySegmentedControl";
import TravelersAmount from "../form-components/TravelersAmount";
import CancelModal from "../vacation-components/CancelModal";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import {
  Container,
  Title,
  Group,
  Center,
  Checkbox,
  Flex,
  Grid,
  Card,
  Button,
  Rating,
  Text,
  Blockquote,
} from "@mantine/core";
import { useState } from "react";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { IconPlane } from "@tabler/icons-react";
import { PiExclamationMarkBold } from "react-icons/pi";

import "@mantine/notifications/styles.css";
import { submitForm } from "../vacation-components/VacationHandler";

const MainForm = (props) => {
  const navigate = useNavigate();

  const matches = useMediaQuery("(max-width: 48em)");
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);

  const [empty0, setEmpty0] = useState(false);
  const [empty1, setEmpty1] = useState(false);
  const [empty2, setEmpty2] = useState(false);
  const [empty3, setEmpty3] = useState(false);
  const [empty4, setEmpty4] = useState(false);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    ages: "0 - 3",
    adultsAmount: 2,
    childrenAmount: null,
    vacationType: "Family Vacation",
    originCountry: "Israel, Tel Aviv",
    destCountry: "Hungary, Budapest",
    dates: [new Date(2024, 4, 8), new Date(2024, 4, 12)],
    returnCountry: "As destination country",
    budget: [0, 8000],
    stars: 3,
    hotel: "",
    parking: "",
    beach: "",
    restaurants: "",
    bars: "",
    cities: "",
    carRentalCompany: "",
    dietaryPreferences: "",
    additionalData: [],
  });

  function validate() {
    let isInvalid = false;

    if (form.ages === null) {
      setEmpty0(true);
      isInvalid = true;
    }

    if (form.dates[0] === 0 || form.dates[1] === 0) {
      setEmpty1(true);
      isInvalid = true;
    }

    if (form.originCountry.length < 2) {
      setEmpty2(true);
      isInvalid = true;
    }

    if (form.destCountry.length < 2) {
      setEmpty3(true);
      isInvalid = true;
    }

    if (form.returnCountry.length < 2) {
      setEmpty4(true);
      isInvalid = true;
    }

    // Return true if everything is valid, false if any condition failed
    return !isInvalid;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      // submitForm(form, props.setData);
      navigate("/details", { replace: true });
    } else {
      setMessage("please fill all the mandatory fields!");

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("formData")) {
      localStorage.removeItem("formData");
    }
  }, []);
  return (
    <section className="main-form-section">
      <Notifications position="bottom-right" />
      <Container
        size="responsive"
        maw={"1700"}
        className="responsive-container"
        id="main-form"
      >
        <Title size={45} className="main-form-title">
          Plan your next trip!
        </Title>
        <form noValidate onSubmit={(event) => handleSubmit(event)}>
          <Grid
            grow
            gutter="sm"
            justify="center"
            classNames={{
              root: "main-form-grid-root",
              inner: "main-form-grid-inner",
              col: "main-form-grid-col",
            }}
          >
            <Grid.Col span={{ sm: 3, xs: 12 }}>
              <Center>
                <Flex direction={"column"} align={"center"}>
                  <Blockquote
                    classNames={{ icon: "blockquote-icon" }}
                    color="#57333d"
                    cite="- SafePlan team"
                    m={"lg"}
                    style={{ display: matches ? "block" : "none" }}
                    iconSize={50}
                    icon={<PiExclamationMarkBold />}
                  >
                    Here you can fill out your desired trip preferences. Please
                    feel free to include anything you want in the additional
                    data section!
                  </Blockquote>
                  <Card
                    radius={30}
                    className="main-form-menu-card"
                    style={matches ? { width: "max-content", margin: 0 } : {}}
                  >
                    <MySegmentedControl
                      form={form}
                      setForm={setForm}
                      matches={matches}
                    />
                  </Card>
                  <Blockquote
                    classNames={{ icon: "blockquote-icon" }}
                    color="#57333d"
                    cite="- SafePlan team"
                    m={"lg"}
                    style={{ display: matches ? "none" : "block" }}
                    mt={40}
                    iconSize={50}
                    icon={<PiExclamationMarkBold />}
                  >
                    Here you can fill out your desired trip preferences. Please
                    feel free to include anything you want in the additional
                    data section!
                  </Blockquote>
                </Flex>
              </Center>
            </Grid.Col>
            <Grid.Col span={{ sm: 8, xs: 12 }}>
              <Card
                radius={30}
                classNames={{
                  root: "main-form-form-card-root",
                }}
              >
                <Title size={20}>Fill trip details:</Title>
                <Center>
                  <Flex
                    gap="lg"
                    justify="center"
                    align="flex-start"
                    direction="column"
                    wrap="wrap"
                  >
                    <Group gap="lg" ml={15} mt={15} align="start">
                      <AgesSelect
                        form={form}
                        setForm={setForm}
                        empty={empty0}
                        setEmpty={setEmpty0}
                      />
                      {form["vacationType"] !== "Solo Vacation" && (
                        <TravelersAmount
                          field="adultsAmount"
                          form={form}
                          setForm={setForm}
                        />
                      )}
                      {form["vacationType"] === "Family Vacation" && (
                        <TravelersAmount
                          field="childrenAmount"
                          form={form}
                          setForm={setForm}
                        />
                      )}
                      <DatePickerMainForm
                        form={form}
                        setForm={setForm}
                        empty={empty1}
                        setEmpty={setEmpty1}
                      />
                    </Group>

                    <Group gap="lg" ml={15} mt={15} align="center">
                      <CountrySelectCreatable
                        setForm={setForm}
                        form={form}
                        empty={empty2}
                        setEmpty={setEmpty2}
                        field="originCountry"
                      />
                      <CountrySelectCreatable
                        setForm={setForm}
                        form={form}
                        empty={empty3}
                        setEmpty={setEmpty3}
                        field="destCountry"
                      />
                      <Checkbox
                        disabled
                        classNames={{
                          body: "main-form-checkbox-body",
                          input: "main-form-checkbox-input",
                        }}
                        color="rgb(255, 216, 76)"
                        checked={checked}
                        onChange={(event) => {
                          setChecked(event.currentTarget.checked);
                          if (checked === false) {
                            setForm({
                              ...form,
                              returnCountry: "As destination country",
                            });
                          }
                        }}
                        labelPosition="right"
                        mt={25}
                        label="Return from another city?"
                        radius="md"
                        size="md"
                      />
                      {checked && (
                        <CountrySelectCreatable
                          setForm={setForm}
                          form={form}
                          empty={empty4}
                          setEmpty={setEmpty4}
                          field="returnCountry"
                        />
                      )}
                    </Group>
                  </Flex>
                </Center>
                <BudgetRange form={form} setForm={setForm} />
                <Flex direction={"row"} mt={30} align={"center"}>
                  <Text>Specify number of stars for the hotel</Text>
                  <Rating
                    defaultValue={2}
                    ml={20}
                    color={"#fac814"}
                    value={form.stars}
                    onChange={(val) => {
                      setForm((prevState) => ({
                        ...prevState,
                        stars: val, // Use computed property name to update specific field
                      }));
                    }}
                    classNames={{ symbolGroup: "hotel-stars" }}
                  />
                </Flex>
                <Title size={20}>More to add?</Title>
                <AdditionalData form={form} setForm={setForm} />

                <div className="main-form-btn-group">
                  <Group>
                    <Button
                      onClick={open}
                      className="cancel-btn"
                      radius={10}
                      variant="outline"
                      size="lg"
                      disabled
                    >
                      Clear
                    </Button>
                    <CancelModal
                      opened={opened}
                      close={close}
                      form={form}
                      setForm={setForm}
                      toggle={props.toggle}
                      message={"You are about to delete everything you typed!"}
                    />
                    <Button
                      size="lg"
                      type="submit"
                      className="btn submit-btn"
                      radius={10}
                      variant="gradient"
                      justify="space-between"
                      rightSection={<IconPlane />}
                      gradient={{ from: "#57333d", to: "#f4976c", deg: 90 }}
                      w={"fit-content"}
                    >
                      I'm Ready!
                    </Button>
                  </Group>
                  {message && <Text c={"red"}>{message}</Text>}
                </div>
              </Card>
            </Grid.Col>
          </Grid>
        </form>
      </Container>
    </section>
  );
};

export default MainForm;
