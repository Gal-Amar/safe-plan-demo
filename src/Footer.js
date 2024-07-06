import { Container, Group, Image } from "@mantine/core";
import { HashLink } from "react-router-hash-link";

import safePlan from "./assets/safeplanelogo.png";

const links = [
  { link: "/#contact-us", label: "Contact" },
  { link: "/#about-us", label: "About us" },
];

export default function Footer() {
  const items = links.map((link, index) => (
    <HashLink className="footer-btns" to={link.link} key={index}>
      {link.label}
    </HashLink>
  ));

  return (
    <div className="footer-section">
      <Container className="footer-wrapper">
        <Image src={safePlan} w={120} />
        <Group className="footer-links">{items}</Group>
      </Container>
    </div>
  );
}
