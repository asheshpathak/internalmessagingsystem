import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { SideNav } from "./HomePage";
import { HomePage } from "./HomePage";
import { Inbox } from "./Inbox";
import { Drafts } from "./Drafts";
import { Trash } from "./Trash";
import { Settings } from "./Settings";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LightTheme } from "../src/Theme/LightTheme";

import "@fontsource/source-sans-pro";
import "@fontsource/raleway";

const mails = [
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
  {
    from: "ashesh.cosmid@gmail.com",
    to: "vismay@gmail.com",
    subject: "This is the first email",
    body: "This is the subject body of the email",
  },
];

export const App = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <Box sx={{ display: "flex", width: "100vw" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
              <Route index element={<Inbox mails={mails} />} />
              <Route path="/drafts" element={<Drafts />} />
              <Route path="/trash" element={<Trash />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};
