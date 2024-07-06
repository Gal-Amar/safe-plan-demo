import { Flex, Button, Input, Grid } from "@mantine/core";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const btns = [
  ["Hotel", "Specify Hotel Name", "hotel"],
  ["Parking", "Have a parking preference?", "parking"],
  ["Beach", "Have preference for a beach in your vacation?", "beach"],
  ["Restaurant/s", "Specify preferred restaurant/s name/s", "restaurants"],
  ["Bars", "Specify preferred bar/s name/s", "bars"],
  ["Cities", "Specify preferred cities you want to visit", "cities"],
  [
    "Car rental company",
    "Specify preferred Car rental company",
    "carRentalCompany",
  ],
  [
    "Dietary preferences",
    "Do you have any dietary preference?",
    "dietaryPreferences",
  ],
  ["Special preference", "Anything else to add?", "additionalData"],
];

//All the btns in the main- form that are presenting special preferences that the user might have
const AdditionalData = (props) => {
  const [btnActive, setBtnActive] = useState(Array(btns.length).fill(false));
  btnActive[0] = true;
  // handler for add data btns, to set wether they are displayed or not
  const btnHandler = (index) => {
    setBtnActive((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const addItem = (newItem) => {
    const updatedAdditionalData = [...props.form.additionalData, newItem];
    props.setForm({ ...props.form, additionalData: updatedAdditionalData });
  };

  const removeItem = (indexToRemove) => {
    const updatedAdditionalData = props.form.additionalData.filter(
      (_, index) => index !== indexToRemove
    );
    props.setForm({ ...props.form, additionalData: updatedAdditionalData });
  };

  //If the array of special preferences is not empty- display it on the screen
  const specialPreferenceFields = props.form.additionalData.map(
    (item, index) => (
      <Flex key={[item.key, index]} align="end" justify={"left"} gap={5}>
        <Input.Wrapper mt={10} ml={15} w="80%">
          Anything else to add?
          <Flex gap={10}>
            <Input
              w={"100%"}
              radius={15}
              disabled
              classNames={{ input: "add-data-input" }}
              onChange={(val) => {
                const updatedAdditionalData = [...props.form.additionalData];
                updatedAdditionalData[index] = val.currentTarget.value;
                props.setForm({
                  ...props.form,
                  additionalData: updatedAdditionalData,
                });
              }}
            />

            <Button
              radius={15}
              className="add-data-btn input-btn"
              variant="transparent"
              onClick={() => removeItem(index)}
            >
              <FaTrash size={18} color="red" />
            </Button>
          </Flex>
        </Input.Wrapper>
      </Flex>
    )
  );
  //Creates the input fields of all additional data
  const additionalDataFields = btns.map((item, index) => (
    <Flex
      key={[item.key, index]}
      align="center"
      justify={"left"}
      gap={5}
      className={
        btnActive[index]
          ? "add-data-input-flex"
          : "add-data-input-flex flex-none-active"
      }
    >
      <Input.Wrapper mt={10} ml={15} w="80%">
        {`${item[1]}`}
        <Flex gap={10}>
          <Input
            w={"100%"}
            disabled
            radius={15}
            placeholder={
              index === 0 ? "Hotel fits to families with little children" : ""
            }
            classNames={{ input: "add-data-input" }}
            onChange={(val) =>
              props.setForm((prevState) => ({
                ...prevState,
                [item[2]]: val.currentTarget.value,
              }))
            }
          />
          <Button
            radius={15}
            className="add-data-btn input-btn"
            variant="transparent"
            disabled={index === 0 ? true : false}
            onClick={() => {
              btnHandler(index);
              props.setForm((prevState) => ({
                ...prevState,
                [item[2]]: "",
              }));
            }}
          >
            <FaTrash size={18} color="red" />
          </Button>
        </Flex>
      </Input.Wrapper>
    </Flex>
  ));

  return (
    <Grid>
      <Grid.Col>
        {specialPreferenceFields.length > 0 ? specialPreferenceFields : null}
        {additionalDataFields}
      </Grid.Col>
      <Grid.Col>
        {/* Creates all the btns */}
        <Flex mt={10} ml={15} gap={2} wrap="wrap">
          {btns.map((btn, index) =>
            btn[0] === "Special preference" ? (
              <Button
                key={[btn.key, index]}
                variant="light"
                size="sm"
                radius="xl"
                className={"add-data-btn"}
                onClick={() => addItem("")}
              >
                <FiPlus size={17} />
                &nbsp;
                {` ${btn[0]} `}
              </Button>
            ) : (
              <Button
                key={[btn.key, index]}
                variant="light"
                size="sm"
                radius="xl"
                className={
                  btnActive[index]
                    ? "add-data-btn add-btn-none-active"
                    : "add-data-btn "
                }
                onClick={() => btnHandler(index)}
              >
                <FiPlus size={17} />
                &nbsp;
                {` ${btn[0]} `}
              </Button>
            )
          )}
        </Flex>
      </Grid.Col>
    </Grid>
  );
};

export default AdditionalData;
