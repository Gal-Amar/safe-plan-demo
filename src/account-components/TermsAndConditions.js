import { Paper, Title, Text, Container, Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

const TermAndConditions = (props) => {
  return (
    <Container>
      <Paper className="term-paper">
        <div className="term-title">
          <Button
            className="term-back-btn"
            onClick={() => props.toggle("register")}
          >
            <IconArrowLeft size={30} />
          </Button>
          <Title size="h4" c="#57333d">
            Safe Plan Term And Conditions
          </Title>
        </div>
        <Text p={20}>
          <span className="term-text-title">
            Acceptance of Terms:
            <br />
          </span>
          By accessing or using our website (hereinafter referred to as "the
          Site"), you agree to comply with and be bound by these terms and
          conditions. If you do not agree with any part of these terms, you may
          not access the Site.
          <span className="term-text-title">
            <br />
            <br />
            Use of the Service:
            <br />
          </span>
          The Site provides a platform for users to plan road trips based on
          their preferences and save their trip history. By using the service,
          you agree to provide accurate information and to use the it only for
          lawful purposes.
          <span className="term-text-title">
            <br />
            <br />
            Privacy Policy:
            <br />
          </span>
          Your use of the service is also governed by our Privacy Policy, which
          outlines how we collect, use, and disclose your information. By using
          the service, you consent to the terms of our privacy policy.
          <span className="term-text-title">
            <br />
            <br />
            Account Registration:
            <br />
          </span>
          In order to access certain features of the service, you may be
          required to register for an account. You are responsible for
          maintaining the confidentiality of your account credentials and for
          all activities that occur under your account.
          <span className="term-text-title">
            <br />
            <br />
            Trip Planning:
            <br />
          </span>
          The Site provides tools and resources to help users plan road trips
          based on their preferences. While we strive to provide accurate
          information, we do not guarantee the accuracy or reliability of any
          content provided on the site.
          <span className="term-text-title">
            <br />
            <br />
            Trip History:
            <br />
          </span>
          Users have the option to save their trip history on the Site. While we
          make every effort to protect your data, we cannot guarantee the
          security of your trip history and recommend that you regularly back up
          your information.
          <span className="term-text-title">
            <br />
            <br />
            User Conduct:
            <br />
          </span>
          You agree not to use the Service to: <br />
          (a) Violate any applicable laws or regulations; <br />
          (b) Infringe upon the rights of others; <br />
          (c) Upload or transmit any harmful, unlawful, or inappropriate
          content; <br />
          (d) Interfere with the operation of the Service; <br />
          (e) Attempt to gain unauthorized access to any portion of the service.
          <span className="term-text-title">
            <br />
            <br />
            Intellectual Property:
            <br />
          </span>
          All content and materials provided on the site, including but not
          limited to text, graphics, logos, and images, are the property of the
          Site or its licensors and are protected by copyright and other
          intellectual property laws. You agree not to reproduce, distribute, or
          create derivative works based on such content without our prior
          written consent.
          <span className="term-text-title">
            <br />
            <br />
            Disclaimer of Warranties:
            <br />
          </span>
          The service is provided on an "as is" and "as available" basis,
          without any warranties of any kind, express or implied. We do not
          warrant that the service will be uninterrupted or error-free, or that
          any defects will be corrected.
          <span className="term-text-title">
            <br />
            <br />
            Limitation of Liability:
            <br />
          </span>
          In no event shall the site or its affiliates be liable for any
          indirect, incidental, special, or consequential damages arising out of
          or in any way connected with your use of the service.
          <span className="term-text-title">
            <br />
            <br />
            Indemnification:
            <br />
          </span>
          You agree to indemnify and hold harmless the Site and its affiliates,
          officers, directors, employees, and agents from any and all claims,
          damages, losses, liabilities, costs, and expenses (including
          reasonable attorneys' fees) arising out of or in any way related to
          your use of the service or violation of these terms and conditions.
          <span className="term-text-title">
            <br />
            <br />
            Changes to Terms:
            <br />
          </span>
          We reserve the right to modify or revise these terms and conditions at
          any time, and your continued use of the service following any such
          changes constitutes your acceptance of the revised terms.
          <span className="term-text-title">
            <br />
            <br />
            Governing Law:
            <br />
          </span>
          These Terms and Conditions shall be governed by and construed in
          accordance with the laws of Israel, without regard to its conflict of
          laws principles.
          <span className="term-text-title">
            <br />
            <br />
            Contact Us:
            <br />
          </span>
          If you have any questions or concerns about these Terms and
          Conditions, please contact us at safe.plane.caps@gmail.com
        </Text>
      </Paper>
    </Container>
  );
};

export default TermAndConditions;
