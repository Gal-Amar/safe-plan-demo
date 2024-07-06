import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-flagpack/styles.css";
import "./index.css";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
  fontFamily: "Fredoka, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: { fontFamily: "Fredoka, sans-serif", fontWeight: "500" },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MantineProvider theme={theme}>
    <Notifications />

    <App />
  </MantineProvider>
);
