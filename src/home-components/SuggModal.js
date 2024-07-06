import {
  Title,
  Modal,
  Container,
  CloseButton,
  Flex,
  Center,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import VacationDetails from "../vacation-components/VacationDetails";
const SuggModal = (props) => {
  const isMobile = useMediaQuery("(max-width: 60em)");

  return (
    <Modal
      fullScreen={isMobile}
      opened={props.opened}
      onClose={props.close}
      radius="xl"
      size={"100%"}
      overlayProps={{
        backgroundOpacity: 0.15,
      }}
      classNames={{
        root: "sugg-modal-root",
        body: "sugg-modal-body",
        header: "sugg-modal-header",
        content: "sugg-modal-body",
      }}
    >
      <Container pt={15} size={"responsive"}>
        <Flex justify={"flex-end"}>
          <CloseButton
            size="lg"
            variant="transparent"
            onClick={props.close}
            className="sugg-modal-close-btn"
          />
        </Flex>
        <Center>
          <Title size={isMobile ? "2.5rem" : "3rem"} mb={15}>
            Trip suggestion
          </Title>
        </Center>
        <VacationDetails
          data={props.data}
          riddle={null}
          setRiddle={null}
          saved={false}
          isLoggedIn={true}
          setData={null}
          id={null}
          setId={null}
        />
      </Container>
    </Modal>
  );
};

export default SuggModal;
