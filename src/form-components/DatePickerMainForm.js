import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useState } from "react";

const DatePickerMainForm = (props) => {
  const [dirty, setDirty] = useState(false);
  return (
    <DatePickerInput
      required
      type="range"
      label="Pick travel dates "
      leftSection={<IconCalendar stroke={1.5} />}
      placeholder="08/05/24 - 12/05/24"
      disabled
      value={props.form.dates}
      onChange={(val) => {
        props.setForm((prevState) => ({
          ...prevState,
          dates: val,
        }));
        setDirty(true);
        props.setEmpty(false);
      }}
      withAsterisk
      valueFormat="DD MMM YYYY"
      radius={10}
      size="lg"
      hideOutsideDates
      minDate={new Date()}
      allowDeselect
      classNames={{
        label: "date-picker-main-form-label",
        input: "date-picker-main-form-input",
        placeholder: "date-picker-main-form-place-holder",
        day: "date-day",
        weekday: "date-day",
      }}
      error={
        (dirty &&
          (props.form.dates[0] === 0 || props.form.dates[0]) === 0 &&
          "Please add dates") ||
        (props.empty && "Please enter dates")
      }
    />
  );
};

export default DatePickerMainForm;
