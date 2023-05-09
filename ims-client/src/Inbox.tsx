import React, { useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  ListItemIcon,
  Avatar,
  Container,
} from "@mui/material";

interface mails {
  from: String;
  to: String;
  subject: String;
  body: String;
}

interface Props {
  mails: mails[];
}

export const MailBody = () => {
  const [mailBody, setMailBody] = useState("");

  return (
    <Box p={4} sx={{ width: "100%" }}>
      <Box p={2}>
        <List>
          <ListItem button>
            <Avatar style={{ marginRight: "10px" }} />
            <ListItemText primary="This is the e-mail subject" />
          </ListItem>
          <Divider />
        </List>
        <Box>
          <Typography variant="h4">Email Subject</Typography>
          <Typography>{mailBody}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const Inbox: React.FC<Props> = (props: Props) => {
  const generateMailList = props.mails.map((mail: any) => {
    return (
      <Box key={Math.random()}>
        <ListItem>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6">{mail.subject}</Typography>
            <Typography variant="body1">{mail.subject}</Typography>
            {/* <ListItemText primary={mail.subject} /> */}
          </Box>
        </ListItem>
        <Divider />
      </Box>
    );
  });

  console.log(generateMailList);
  return (
    <Grid container>
      <Grid item lg={4}>
        <Box sx={{ height: "100vh", overflow: "scroll", bgcolor: "#F2F4F4" }}>
          <Typography sx={{ m: 1 }} variant="h4">
            All Mails
          </Typography>
          <Box>
            <List>{generateMailList}</List>
          </Box>
        </Box>
      </Grid>
      <Grid item lg={8}>
        <MailBody />
      </Grid>
    </Grid>
  );
};
