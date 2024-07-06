import Login from "./Login";
import { useDisclosure } from "@mantine/hooks";
//login-signin-modal
const ModalHandler = () => {
  const [opened, { open, close }] = useDisclosure(false);
  if (localStorage.getItem("email") !== null) {
    open();
    return <Login open={opened} close={close} />;
  } else return null;
};

export default ModalHandler;
