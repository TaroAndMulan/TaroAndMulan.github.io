import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ScheduleIcon from "@mui/icons-material/Schedule";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
const Sign = () => {
  return <>{"SIGN"}</>;
};
const Homepage = ({}) => {
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <Stack direction="row" spacing={2}>
            <Sign /> <Sign />
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Homepage;
