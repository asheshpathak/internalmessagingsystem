import {
  Drawer,
  Box,
  Typography,
  Avatar,
  Icon,
  makeStyles,
  IconButton,
  ListItemIcon,
  Grid,
  Container,
  Button,
  Modal,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import React, { RefObject, useState } from "react";
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

// const useStyles = makeStyles({
//   root: {
//     ListItem: { marginLeft: "10px" },
//   },
// });

export const SideNav = () => {
  // const classes = useStyles;
  // const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [subject, setSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [fileSource, setFileSource] = useState<File | null>(null);
  const fileSelected: RefObject<any> = React.createRef();

  const payload = {
    receiver: receiver,
    subject: subject,
    messageBody: messageBody,
    file: fileSource,
  };
  const formData: any = new FormData();

  const handleInputEvent = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // console.log(event.target.name);
    if (event.target.name === "to") {
      setReceiver(event.target.value);
    }
    if (event.target.name === "subject") {
      setSubject(event.target.value);
    }
    if (event.target.name === "body") {
      setMessageBody(event.target.value);
    }
    console.log(payload);
  };

  const handleFileSelection = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    try {
      if (e.target.files != null) {
        setFileSource(e.target.files[0]);
        const fileName = e.target.files[0].name;
        alert(`Selected file: ${fileName}`);
        // const appendValue =
        //   fileSource === null ? JSON.parse("{}") : JSON.parse(fileSource);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
      } else console.log("Unexpected error occured");
    }
    // console.log(e.target.value);
  };

  const handleSubmit = () => {
    console.log(payload);
    formData.append("file", JSON.stringify(fileSource));
    axios
      .post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-rapidapi-host": "file-upload8.p.rapidapi.com",
          "x-rapidapi-key": "your-rapidapi-key-here",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
        },
      })
      .then((response) => {
        // handle the response
        console.log(response);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  return (
    <Container disableGutters={true} maxWidth={false}>
      <Grid container>
        <Grid item lg={2}>
          <Box
            style={{}}
            sx={{
              height: "100vh",
              color: "#FFF",
              // bgcolor: "#2C3E50",
              bgcolor: "#17202A",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
            p={0}
            m={0}
          >
            <List>
              <Box sx={{ display: "flex", justifyContent: "center" }} p={2}>
                <Typography variant="h4">IMS Client</Typography>
              </Box>
              <Divider />
            </List>
            <List
              style={{ height: "100%" }}
              component="nav"
              aria-label="mailbox folders"
            >
              <ListItem>
                <Button
                  fullWidth
                  onClick={() => setIsModalOpen(true)}
                  variant="contained"
                  color="primary"
                  endIcon={<AddCircleOutlineIcon />}
                >
                  Create Mail
                </Button>
              </ListItem>
              <Link style={{ textDecoration: "none", color: "#EBEDEF" }} to="/">
                <ListItem button>
                  <ListItemIcon>
                    <MailIcon style={{ color: "#6366F1" }} />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                </ListItem>
              </Link>
              {/* <Divider /> */}
              <Link
                style={{ textDecoration: "none", color: "#EBEDEF" }}
                to="/drafts"
              >
                <ListItem button>
                  <ListItemIcon>
                    <DraftsIcon style={{ color: "#FFF" }} />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItem>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "#EBEDEF" }}
                to="/trash"
              >
                <ListItem button>
                  <ListItemIcon>
                    <DeleteIcon style={{ color: "#FFF" }} />
                  </ListItemIcon>
                  <ListItemText primary="Trash" />
                </ListItem>
              </Link>
              {/* <Divider light /> */}
            </List>
            <List>
              <Divider />
              <Link
                style={{ textDecoration: "none", color: "#EBEDEF" }}
                to="/settings"
              >
                <ListItem button>
                  <ListItemIcon>
                    <SettingsIcon style={{ color: "#FFF" }} />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              </Link>
            </List>
          </Box>
        </Grid>
        <Grid item lg={10}>
          <Outlet />
        </Grid>
      </Grid>
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "70%",
            height: "70%",
            bgcolor: "#fff",
          }}
          p={2}
        >
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <FormControl sx={{ width: "100%" }}>
            <TextField
              name="to"
              onChange={handleInputEvent}
              fullWidth
              sx={{ m: 1 }}
              id="outlined-basic"
              label="To"
              variant="outlined"
            />
            <TextField
              name="subject"
              onChange={handleInputEvent}
              fullWidth
              sx={{ m: 1 }}
              id="outlined-basic"
              label="Subject"
              variant="outlined"
            />
            <TextField
              name="body"
              onChange={handleInputEvent}
              sx={{ m: 1 }}
              id="standard-multiline-static"
              label="Body"
              multiline
              rows={8}
              variant="outlined"
            />
            {/* <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" /> */}
            {/* <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText> */}
            {/* <input type="file" /> */}
            <Input
              sx={{ m: 1 }}
              type="file"
              ref={fileSelected}
              // onInput={() => handleFileSelection()}
              onChange={handleFileSelection}
            />
            <Button onClick={handleSubmit} variant="contained">
              Send
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </Container>
  );
};

export const HomePage = () => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <SideNav />
    </Box>
  );
};
