import { RangeSlider, Box, Text, Center } from "@mantine/core";

const BudgetRange = (props) => {
  return (
    <Center>
      <Box maw={400} mt={"xl"} className="slider-wrapper">
        <Text fw={500} size="sm">
          {" "}
          Your Budget in NIS
        </Text>
        <RangeSlider
          classNames={{
            label: "range-slider-label",
            root: "range-slider-root",
            track: "range-slider-track",
          }}
          color="rgb(255, 216, 76)"
          min={0}
          max={10000}
          defaultValue={(200, 8000)}
          thumbSize={26}
          disabled
          value={props.form.budget}
          onChange={(value) =>
            props.setForm((prevState) => ({
              ...prevState,
              budget: value,
            }))
          }
          size={"lg"}
          marks={[
            { value: 1000, label: "" },
            { value: 2000, label: "2000" },
            { value: 3000, label: "" },
            { value: 4000, label: "4000" },
            { value: 5000, label: "" },
            { value: 6000, label: "6000" },
            { value: 7000, label: "" },
            { value: 8000, label: "8000" },
            { value: 9000, label: "" },
            { value: 10000, label: "10000+" },
          ]}
        />
      </Box>
    </Center>
  );
};

export default BudgetRange;
