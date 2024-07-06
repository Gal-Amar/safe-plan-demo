import React, { useState } from "react";
import { Combobox, InputBase, useCombobox } from "@mantine/core";
import {
  IconMap,
  IconPinFilled,
  IconBulbFilled,
  IconGlobeFilled,
} from "@tabler/icons-react";
import countries from "./../assets/countries.min.json"; //list of the most visited countries and cities
import MyLocation from "./MyLocation";

//Combobox input selection feature allows to add new values dynamically. It consists of three sections within the form: origin, destination and return country
export default function CountrySelectCreatable(props) {
  const combobox = useCombobox({});

  const [icon, setIcon] = useState(<IconMap />);
  const [dirty, setDirty] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState([
    props.field === "originCountry" ? "Use my location" : "Feeling spontaneous",
    ...countries,
  ]);
  const [search, setSearch] = useState(
    props.field === "returnCountry" ? props.form.destCountry : ""
  ); //if the return value hasn't entered value, than it as the destination country

  const exactOptionMatch = data.some(
    (item) => item.toLowerCase() === search.toLowerCase()
  );

  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase().trim())
      );

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));
  //handles knew value, inserting it to the form
  const handleCountryChange = (value) => {
    if (value === "Feeling spontaneous") {
      setIcon(<IconBulbFilled />);
    } else if (value === "Use my location") {
      setIcon(<IconPinFilled />);
      MyLocation(props.setForm, props.form, setSearch, setValue); //get the current location of the user
    } else {
      setIcon(<IconGlobeFilled />);
    }

    if (props.field === "originCountry") {
      if (value !== "Use my location") {
        props.setForm({ ...props.form, originCountry: value });
      }
      props.setEmpty(false);
    } else if (props.field === "destCountry") {
      props.setForm({ ...props.form, destCountry: value });
      props.setEmpty(false);
    } else {
      props.setForm({ ...props.form, returnCountry: value });
      props.setEmpty(false);
    }
  };

  return (
    <Combobox
      store={combobox}
      w={280}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (val === "$create") {
          //adds new val to options
          setData((current) => [
            ...current,
            search[0].toUpperCase() + search.slice(1),
          ]);
          //set value as the new value
          setValue(search);
          handleCountryChange(search);
        } else {
          setValue(val);
          setSearch(val);
          handleCountryChange(val);
        }
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          required
          disabled
          w={280}
          classNames={{
            input: "country-combobox-input",
            label: "country-combobox-label",
          }}
          size="lg"
          label={
            props.field === "originCountry"
              ? "Select origin country"
              : props.field === "destCountry"
              ? "Select destination country"
              : "Select return country"
          }
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
            setDirty(true);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(value);
          }}
          placeholder={
            props.field === "destCountry"
              ? "Hungary, Budapest"
              : "Israel, Tel Aviv"
          }
          rightSectionPointerEvents="none"
          leftSection={icon}
          radius={10}
          error={
            (dirty &&
              !/^(?:\uD83C[\uDDE6-\uDDFF]){2}\s+[a-zA-Z\s]+$/.test(value) &&
              "invalid value") ||
            (props.empty && "please enter country name")
          }
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options mah={200} style={{ overflowY: "auto" }}>
          {options}
          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">
              + Create {search[0].toUpperCase() + search.slice(1)}
            </Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
