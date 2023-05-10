import React, { useEffect, useState } from "react";
import axios from "axios";
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

export const MailBody = (props: any) => {
  return (
    <Box p={4} sx={{ width: "100%" }}>
      <Box p={2}>
        <List>
          <ListItem button>
            <Avatar style={{ marginRight: "10px" }} />
            {/* <ListItemText primary={props.mailBody.receiver} /> */}
            <ListItemText primary="From: Adj" />
          </ListItem>
          <Divider />
        </List>
        <Box>
          <Typography variant="h6">{`Appointee: ${props.mailBody.receiver}`}</Typography>
          <Typography variant="h4">{props.mailBody.subject}</Typography>
          <Typography>{props.mailBody.messageBody}</Typography>
          {/* <img src="../logo65.png" alt="logo" /> */}
        </Box>
      </Box>
    </Box>
  );
};

export const PlaceHolder = () => {
  return (
    <Box>
      <Typography variant="h2">Nothing here! Open a message.</Typography>
    </Box>
  );
};

export const Inbox: React.FC<Props> = (props: Props) => {
  const [mailList, setMailList] = useState([]);
  const [mailBody, setMailBody] = useState("");
  const [isMBodyRendered, setIsMBodyRendered] = useState(false);

  const loadMail = (payload: any) => {
    setMailBody(payload);
    setIsMBodyRendered(true);
  };

  const loadAppointments = () => {
    axios
      .get("http://localhost:5000/api/getFiles")
      .then((res) => {
        // console.log(res);
        setMailList(res.data.files);
        console.log(res.data.files);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadAppointments();
  }, [mailBody]);

  const generateMailList = mailList.map((mail: any) => {
    return (
      <Box key={Math.random()}>
        <ListItem button onClick={() => loadMail(mail.payload)}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6">{mail.payload.receiver}</Typography>
            <Typography variant="body1">{mail.payload.subject}</Typography>
            {/* <ListItemText primary={mail.subject} /> */}
          </Box>
        </ListItem>
        <Divider />
      </Box>
    );
  });

  // console.log(generateMailList);
  return (
    <Grid container>
      <Grid item lg={4}>
        <Box sx={{ height: "100vh", overflow: "scroll", bgcolor: "#F2F4F4" }}>
          <Typography sx={{ m: 1 }} variant="h4">
            All Appointments
          </Typography>
          <Box>
            <List>{generateMailList}</List>
          </Box>
        </Box>
      </Grid>
      <Grid item lg={8}>
        {isMBodyRendered ? <MailBody mailBody={mailBody} /> : <PlaceHolder />}
      </Grid>
    </Grid>
  );
};
