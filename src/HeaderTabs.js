import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";

import {
  Image,
  Container,
  UnstyledButton,
  Group,
  Text,
  Menu,
  rem,
  Anchor,
} from "@mantine/core";

import {
  IconLogout,
  IconSwitchHorizontal,
  IconChevronDown,
} from "@tabler/icons-react";
import { FaRegHeart } from "react-icons/fa";

import safePlane from "./assets/safeplanelogo.png";

import {
  handleChangeAccount,
  handleLogOut,
  handleLoginButtonClick,
} from "./account-components/LoginHandler";

import { decodeMail } from "./vacation-components/VacationHandler";

export default function HeaderTabs(props) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [user, setUser] = useState({ fullName: "", email: "" }); // Initialize state variable
  const navigate = useNavigate();
  //Fetch user information from DB
  useEffect(() => {
    const encodeEmail = localStorage.getItem("email");

    if (encodeEmail !== null) {
      props.setIsLoggedIn(true);
      const decodeEmail = decodeMail(encodeEmail);
      const fetchData = async () => {
        // try {
        //   const response = await fetch(
        //     `https://safeplane-78a3982e4d7a.herokuapp.com/get-user/${decodeEmail}`,
        //     {
        //       method: "GET",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //     }
        //   );
        //   if (!response.ok) {
        //     throw new Error("Failed to fetch data");
        //   }
        //   const data = await response.json();
        //   setUser(data);
        // } catch (error) {
        //   console.error("Error fetching data:", error);
        // }
      };

      fetchData();
    } else {
      setUser({ name: "", email: "" });
    }
  }, [props]);
  return (
    <div className="header">
      <Container size="xl">
        <Group justify="space-between">
          <Group>
            <HashLink to="/">
              <Image src={safePlane} w={120} />
            </HashLink>

            <Container size="md" pt={15}>
              <Group radius={10} color="#57333d" className={"tabs"}>
                <Anchor href="/" className="tab">
                  Home
                </Anchor>
                <HashLink to="/#about-us" className="tab">
                  About
                </HashLink>
              </Group>
            </Container>
          </Group>

          {user.name !== "" ? (
            <Menu
              width={260}
              size={rem(5)}
              position="bottom-end"
              radius={"lg"}
              color="#fef6ec"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
              classNames={{
                dropdown: "header-dropdown",
              }}
            >
              <Menu.Target>
                <UnstyledButton>
                  <Group gap={7}>
                    <Text fw={500} size="md" lh={1} mr={3}>
                      {user.fullName}
                    </Text>
                    <IconChevronDown
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  className="header-item"
                  leftSection={
                    <FaRegHeart
                      style={{ width: rem(16), height: rem(16) }}
                      color={"#e34646"}
                      stroke={1.5}
                    />
                  }
                  onClick={() => {
                    navigate("/saved-tours", { replace: true });
                  }}
                >
                  Saved Tours
                </Menu.Item>

                <Menu.Divider />
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item
                  onClick={() => {
                    handleChangeAccount(
                      "email",
                      props.setIsLoggedIn,
                      props.open
                    );
                    navigate("/", { replace: true });
                  }}
                  color="red"
                  leftSection={
                    <IconSwitchHorizontal
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Change account
                </Menu.Item>
                <Menu.Item
                  color="red"
                  onClick={() => {
                    handleLogOut("email", props.setIsLoggedIn);
                    navigate("/", { replace: true });
                  }}
                  leftSection={
                    <IconLogout
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Anchor
              c="#57333d"
              fw={600}
              mt={15}
              size={"lg"}
              underline="hover"
              onClick={() =>
                handleLoginButtonClick(props.open, props.openLoggedIn)
              }
            >
              Log in
            </Anchor>
          )}
        </Group>
      </Container>
    </div>
  );
}
