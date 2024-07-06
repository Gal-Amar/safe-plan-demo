import React from "react";
import { Modal, Text } from "@mantine/core";

//modal that pops up when the user is already logged in and press on the btn If you wish to view your saved trips... Log in! that located in the first menu component
const LoggedInModal = (props) => {
  return (
    <Modal
      centered
      opened={props.open}
      onClose={() => {
        props.close(false);
      }}
      radius="lg"
      size="sm"
      withCloseButton={false}
      classNames={{
        body: "login-modal-root",
        header: "login-modal-root",
      }}
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <Text
        align="center"
        fw={550}
        size={"30px"}
        className="logged-in-modal-title"
      >
        You can't login in demo version!
      </Text>
    </Modal>
  );
};

export default LoggedInModal;
