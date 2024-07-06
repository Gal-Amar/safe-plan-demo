import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  Box,
  Stack,
  Loader,
} from "@mantine/core";

import { IconMail, IconSun } from "@tabler/icons-react";
import emailjs from "@emailjs/browser";
import { useEffect, useState, useRef } from "react";

const contactsWays = [
  { title: "Email", description: "safe.plan.caps@gmail.com", icon: IconMail },
  { title: "Working hours", description: "24/7", icon: IconSun },
];
function ContactIcon(props) {
  return (
    <div className="contacts-ways-wrapper">
      <Box mr="md">
        <props.contact.icon />
      </Box>
      <div className="contact-info-wrapper">
        <Text size="md" fw={500} className="contacts-ways-title">
          {props.contact.title}
        </Text>
        <Text size="lg" fw={700} className="contacts-ways-des">
          {props.contact.description}
        </Text>
      </div>
    </div>
  );
}

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [message, setMessage] = useState("");

  const form = useRef();

  useEffect(() => emailjs.init("_qM8LhFnv7oLM8s7E"), []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedValue = capitalizeFirstLetter(inputValue);
    setInputText(capitalizedValue);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  //sending mail
  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceId = "service_85t6hdv";
    const templateId = "template_np1ayig";

    const submitted_form = {
      name: form.current.name.value,
      mail: form.current.mail.value,
      subject: form.current.subject.value,
      message: form.current.message.value,
    };

    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, submitted_form);
      setMessage("Email was sent successfully!");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      setMessage("Error sending message, please try again later");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setLoading(false);
      form.current.reset();
      setInputText("");
    }
  };

  return (
    <div className="contact-us-section" id="contact-us">
      <Paper shadow="md" radius="lg" className="contact-us-wrapper">
        <div className="contacts-ways">
          <Text fz="xl" fw={700} className="contact-us-title">
            Contact information
          </Text>
          <Stack className="contacts-stack">
            <ContactIcon contact={contactsWays[0]} />
            <ContactIcon contact={contactsWays[1]} />
          </Stack>
        </div>

        <form ref={form} className="contact-us-form" onSubmit={handleSubmit}>
          <Text fz="lg" fw={700} className="contact-us-title">
            Get in touch
          </Text>

          <div className="contact-us-fields">
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                name="name"
                label="Your name"
                radius={10}
                placeholder="Your name"
              />
              <TextInput
                name="mail"
                label="Your email"
                radius={10}
                placeholder="safeplan@gmail.com"
                required
              />
            </SimpleGrid>

            <TextInput
              mt="md"
              name="subject"
              label="Subject"
              radius={10}
              placeholder="Subject"
              required
            />

            <Textarea
              mt="md"
              radius={10}
              label="Your message"
              onChange={handleInputChange}
              value={inputText}
              name="message"
              placeholder="Please include all relevant information"
              minRows={3}
            />

            <Group justify="center" mt="md">
              <Button
                type="submit"
                variant="filled"
                c={"#57333d"}
                radius={10}
                className="contact-us-submit-btn"
                disabled={loading}
              >
                Send message
              </Button>
              {loading && <Loader color="#57333d" type="dots" />}
              {message && <div className="message">{message}</div>}
            </Group>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default ContactUs;
