import { IconInfoCircle } from "@tabler/icons-react";
import { Tooltip, Center, Text, Select } from "@mantine/core";
import { useState } from "react";

const AgesSelect = (props) => {
  const [dirty, setDirty] = useState(false);
  //data changes, if its not a family vacation, no need young ages
  const data =
    props.form["vacationType"] === "Family Vacation"
      ? [
          "0-3",
          "4-7",
          "8-10",
          "10-13",
          "14-17",
          "18-35",
          "35-50",
          "50-65",
          "65+",
        ]
      : ["15-18", "18-35", "35-50", "50-65", "65+"];

  const leftSection = (
    <Tooltip
      label="Select the youngest/Oldest traveler's age"
      position="top-end"
      withArrow
      transitionProps={{ transition: "pop-bottom-right" }}
    >
      <Text component="div" c="dimmed" style={{ cursor: "help" }}>
        <Center>
          <IconInfoCircle stroke={2} />
        </Center>
      </Text>
    </Tooltip>
  );

  return (
    <Select
      label={"Youngest/ Oldest Age"}
      data={data}
      onChange={(val) => {
        props.setForm((prevState) => ({
          ...prevState,
          ages: val,
        }));
        setDirty(true);
        props.setEmpty(false);
      }}
      leftSection={leftSection}
      radius={10}
      withAsterisk
      size="lg"
      required
      disabled
      placeholder={"0 - 3"}
      value={props.form["ages"]}
      classNames={{
        input: "ages-select-input",
        label: "ages-select-label",
        wrapper: "ages-select-wrapper",
      }}
      error={
        (dirty && props.form["ages"] === null && "Please enter age") ||
        (props.empty && "Please enter ages")
      }
    />
  );
};

export default AgesSelect;
