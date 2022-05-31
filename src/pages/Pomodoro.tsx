import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import Popup from "../components/reusable/Popup";
import Settings from "../components/Settings";
import Timer from "../components/Timer";
import { auth, db } from "../firebase-config";
import SettingsContext from "../helpers/SettingsContext";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import MenuIcon from "@mui/icons-material/Menu";
const drawerWidth = 240;
export default function Pomodoro({ tasks, handleDrawerToggle }: any) {
  const [age, setAge] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    console.log("asdadasd", event.target.value as string);
    console.log("2asdad ", age);
  };


  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        

          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, color: "white" }}
          >
            Pomodoro
          </Typography>
          <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-label">Working on</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                {tasks.map((task: any) => (
                  <MenuItem key={task.id} value={task.id}>
                    {task.title + " for    "}
                    {task.tostring + " second(s)"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
      <SettingsContext>
        <main className="mx-auto min-h-[571px] max-w-sm pt-6">
          
          <Timer getDocId={age} />
          <Popup title={"Pomodoro settings"}>
            <Settings />
          </Popup>
        </main>
      </SettingsContext>
    </>
  );
}
