import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import image from "./assets/404image.svg";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      className="error-page-root"
      m={40}
      align={"center"}
      justify={"center"}
    >
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <div>
          <Title className="error-page-title">Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className="error-page-btn"
            radius={"lg"}
            c={"#57333d"}
            style={{ border: "3px solid #57333d" }}
            onClick={() => {
              navigate("/", { replace: true });
            }}
          >
            Get back to home page
          </Button>
        </div>
        <div>
          <Image src={image} className="error-page-img" />
        </div>
      </SimpleGrid>
    </Container>
  );
};

export default NotFoundPage;
