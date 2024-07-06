import { SegmentedControl, Center, rem } from "@mantine/core";
import { IconFriends } from "@tabler/icons-react";
import { MdFamilyRestroom, MdMan4 } from "react-icons/md";
import { GiThreeFriends } from "react-icons/gi";

function MySegmentedControl(props) {
  return (
    <SegmentedControl
      orientation={props.matches ? "horizontal" : "vertical"}
      radius={10}
      disabled
      value={props.form.vacationType}
      onChange={(value) =>
        props.setForm({ ...props.form, vacationType: value })
      }
      size={props.matches ? "xm" : "md"}
      data={[
        {
          value: "Couple Vacation",
          label: (
            <Center style={{ gap: 10 }}>
              <div>
                <IconFriends style={{ width: rem(23), height: rem(23) }} />
                <br />
                Couple Vacation
              </div>
            </Center>
          ),
        },
        {
          value: "Family Vacation",
          label: (
            <Center style={{ gap: 10 }}>
              <div>
                <MdFamilyRestroom style={{ width: rem(23), height: rem(23) }} />
                <br /> Family Vacation
              </div>
            </Center>
          ),
        },
        {
          value: "Friends Vacation",
          label: (
            <Center style={{ gap: 10 }}>
              <div>
                <GiThreeFriends style={{ width: rem(23), height: rem(23) }} />
                <br />
                Friends Vacation
              </div>
            </Center>
          ),
        },
        {
          value: "Solo Vacation",
          label: (
            <Center style={{ gap: 10 }}>
              <div>
                <MdMan4 style={{ width: rem(23), height: rem(23) }} />
                <br />
                Solo Vacation
              </div>
            </Center>
          ),
        },
      ]}
      classNames={{
        root: "segmented-control-main-form-root",
        indicator: "segmented-control-main-form-indicator ",
        control: "segment-control-main-form-control",
        label: "segment-control-main-form-label",
        input: "segment-control-main-form-input",
      }}
    />
  );
}

export default MySegmentedControl;
