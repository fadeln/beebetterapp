import { ChangeEvent, useState } from "react";
import {
  AppBar,
  Divider,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AlertDialog from "../components/CreateProjectDialog";
import ProjectsData from "../components/DataGrid/ProjectsData";
import { Box } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import MenuIcon from "@mui/icons-material/Menu";
const drawerWidth = 240;

const Task = ({
  tasks,
  addTask,
  deleteTask,
  handleDrawerToggle,
}: any) => {
  let { projectId } = useParams();
  let isProjectId = () => {
    if (projectId != undefined) {
      return false;
    } else {
      return true;
    }
  };

  const [stat, setStat] = useState<string>("");
  const [tostring, setTostring] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [olddeadline, setDeadline] = useState<Date | null>(new Date());

  const remainingTask = tasks.length;
  const [value, setValue] = React.useState<Date | null>(new Date());
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const deadline = olddeadline!.toDateString();
    if (!title) {
      alert("Please add a task");
      return;
    }

    addTask({ title, desc, deadline, stat, tostring });
    setDeadline(new Date());
    setTitle("");
    setDesc("");
    setTostring(0);
    setStat("");
  };

  return (
    <>
      <Box height="89.9vh">
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
              Projects
            </Typography>

            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <div>
              <AlertDialog onSubmit={onSubmit}>
                <form className=" flex  flex-col  gap-2">
                  <div className="flex flex-row justify-between"></div>
                  <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setTitle(event.target.value)
                    }
                  />
                  <Divider />
                  <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows="5"
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                      setDesc(event.target.value)
                    }
                  />
                  <Divider />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Due date"
                      value={olddeadline}
                      onChange={(newValue) => {
                        setDeadline(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </form>
              </AlertDialog>
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ height: 400, width: "100%" }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <ProjectsData task={tasks} Delete={deleteTask} />
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};
export default Task;
