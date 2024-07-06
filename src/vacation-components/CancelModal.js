import { Modal, Title, Text, Group, Button, Anchor } from "@mantine/core";
//handles reset of the form and cancel call to server
const CancelModal = (props) => {
  const initialValues = {
    ages: null,
    adultsAmount: 1,
    childrenAmount: null,
    vacationType: "Couple Vacation",
    originCountry: "",
    destCountry: "",
    dates: [0, 0],
    returnCountry: "As destination country",
    budget: [0, 1000],
    stars: 3,
    hotel: "",
    parking: "",
    beach: "",
    restaurants: "",
    bars: "",
    cities: "",
    carRentalCompany: "",
    dietaryPreferences: "",
    additionalData: [],
  };
  return (
    <Modal
      centered
      withCloseButton={false}
      size="md"
      radius={15}
      opened={props.opened}
      onClose={props.close}
      transitionProps={{ transition: "fade", duration: 200 }}
      classNames={{
        content: "cancel-modal",
      }}
    >
      <Title align="center" fw={800}>
        Warning!
      </Title>
      <Text align="center" fs={"lg"} mt={30} mb={30} fw={500}>
        {props.message}
      </Text>
      <Group justify="center">
        <Button
          className="cancel-modal-btn"
          radius={10}
          onClick={props.close}
          variant="outline"
          size="lg"
          fw={600}
          style={{ border: "3px solid #8c0a17" }}
          color="#8c0a17"
        >
          cancel
        </Button>
        <Anchor
          className="cancel-modal-btn"
          variant="filled"
          size="lg"
          fw={600}
          p={10}
          c="white"
          bg="#8c0a17"
          href="/"
          onClick={() => {
            if (props.form !== null);
            props.setForm(initialValues);
            props.close();
          }}
        >
          Yes Im sure
        </Anchor>
      </Group>
    </Modal>
  );
};

export default CancelModal;
