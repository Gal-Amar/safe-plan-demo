import { NumberInput } from "@mantine/core";
//changes with the vacation types, for couples its couples amount and for family its adults/ children...
const TravelersAmount = (props) => {
  return (
    <NumberInput
      classNames={{
        input: "main-form-number-input",
        error: "main-form-number-input-error",
        label: "main-form-number-input-label",
      }}
      value={props.form[props.field]}
      onChange={(value) =>
        props.setForm((prevState) => ({
          ...prevState,
          [props.field]: value,
        }))
      }
      withAsterisk
      size="lg"
      radius="md"
      max={50}
      // min={1}
      disabled
      clampBehavior="strict"
      allowNegative={false}
      label={
        props.field === "adultsAmount"
          ? props.form["vacationType"] === "Couple Vacation"
            ? "Couple Amount"
            : props.form["vacationType"] === "Family Vacation"
            ? "Adults Amount"
            : "Travelers Amount"
          : "kids Amount"
      }
      placeholder={
        props.field === "adultsAmount" ? 2 : 3
        // ? props.form["vacationType"]
        //   ? "Couple"
        //   : "Adults"
        // : "kids"
      }
    />
  );
};

export default TravelersAmount;
