import { IconXboxX } from "@tabler/icons-react";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Text,
  Group,
  Button,
  Modal,
  Stack,
  Flex,
} from "@mantine/core";
import TermAndConditions from "./TermsAndConditions";
import { useState } from "react";
import { submitHandler } from "./LoginHandler";

const Login = (props) => {
  const [type, toggle] = useToggle(["login", "register", "terms"]);
  const [message, setMessage] = useState("");

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      fullName: "",
      password: "",
      terms: true,
    },
    validate: {
      fullName: (val) =>
        val.length < 2 ? "Name must have at least 2 letters" : null,
      email: (val) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(val)
          ? null
          : "Invalid email",
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 7 characters"
          : null,
      term: (val) =>
        val === false ? "You must approve with our terms and conditions" : null,
    },
  });

  return (
    <Modal
      opened={props.open}
      onClose={() => {
        toggle("login");
        props.close();
      }}
      radius="lg"
      size={type === "terms" ? "lg" : "md"}
      closeButtonProps={{
        icon: <IconXboxX size={30} stroke={2} />,
      }}
      classNames={{
        header: "login-modal-root",
        body: "login-modal-root",
      }}
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      {type !== "terms" && (
        <Paper radius="md" p="xl" withBorder className="login-paper">
          <Text size="lg" fw={500} align={"center"}>
            Welcome to Safe Plan
          </Text>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (
                (type === "login" &&
                  (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(
                    form.values.email
                  ) ||
                    form.values.password.length <= 6)) ||
                (type === "register" &&
                  (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(
                    form.values.email
                  ) ||
                    form.values.password.length <= 6 ||
                    form.values.fullName.length <= 2))
              ) {
                setMessage("please fill all the mandatory fields!");

                setTimeout(() => {
                  setMessage(null);
                }, 5000);
              } else {
                submitHandler(
                  event,
                  form,
                  type,
                  setMessage,
                  props.close,
                  props.setIsLoggedIn,
                  toggle
                );
              }
            }}
          >
            <Stack>
              {type === "register" && (
                <TextInput
                  label="Full Name"
                  placeholder="Your full name"
                  value={form.values.fullName}
                  size="md"
                  onChange={(event) =>
                    form.setFieldValue("fullName", event.currentTarget.value)
                  }
                  error={form.errors.fullName}
                  radius="md"
                />
              )}

              <TextInput
                required
                label="Email"
                size="md"
                placeholder="safeplan@gmail.com"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email}
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                size="md"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={form.errors.password}
                radius="md"
              />

              {type === "register" && (
                <Flex>
                  <Checkbox
                    required
                    checked={form.values.terms}
                    label="&nbsp;"
                    color="#57333d"
                    onChange={(event) =>
                      form.setFieldValue("terms", event.currentTarget.checked)
                    }
                    error={form.errors.terms}
                  />
                  <Anchor
                    underline="never"
                    c={"black"}
                    onClick={() => toggle("terms")}
                  >
                    I accept{" "}
                    <span className="term-and-condition">
                      terms and conditions
                    </span>
                  </Anchor>
                </Flex>
              )}
            </Stack>

            <Group justify="space-between" mt="md">
              <Flex direction={"column"} gap={5}>
                <Anchor
                  component="button"
                  type="button"
                  c="dimmed"
                  onClick={() =>
                    toggle(type === "register" ? "login" : "register")
                  }
                  size="sm"
                >
                  {type === "register"
                    ? "Already have an account? Login"
                    : "Don't have an account? Register"}
                </Anchor>
                {message && (
                  <Text
                    c={
                      message === "Successfully signed in!" ||
                      message === "Successfully logged in!"
                        ? "#57333d"
                        : "red"
                    }
                  >
                    {message}
                  </Text>
                )}
              </Flex>
              <Button type="submit" radius="xl" mt={5} color="#57333d">
                {upperFirst(type)}
              </Button>
            </Group>
          </form>
        </Paper>
      )}
      {type === "terms" && <TermAndConditions toggle={toggle} />}
    </Modal>
  );
};

export default Login;
