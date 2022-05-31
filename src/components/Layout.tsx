import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import beeImage from "./Images/bee.png";
import {
  Avatar,
  Chip,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Tooltip,
} from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MyApp } from "../App";
// import { theme } from "../App";

const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme: any }) => ({
  display: "flex",
  alignItems: "center",
  // padding: theme.spacing(0, 1),
  // // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Layout({ children, user, Logout }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let navigate = useNavigate();
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="temporary"
          anchor="left"
        >
          {/* <DrawerHeader></DrawerHeader> */}

          <Toolbar sx={{ justifyContent: "space-around" }}>
            <Avatar
              alt="Remy Sharp"
              src={beeImage}
              sx={{ marginRight: "10px" }}
            />
            <Typography variant="h4" sx={{ marginRight: "10px" }}>
              <Box component="span" sx={{ color: "#ff6f00" }}>
                Bee
              </Box>
              Better
            </Typography>
          </Toolbar>
          <Divider></Divider>

          <List>
            <ListItem disableGutters>
              {user == null ? (
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate("/")}
                >
                  <ListItemText primary="Please Login to continue" />
                </Button>
              ) : (
                <>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    disableRipple
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{ width: 32, height: 32 }}
                        src={user?.photoURL}
                      >
                        {" "}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user?.displayName}
                      secondary={user?.email}
                      sx={{ textTransform: "lowercase" }}
                    />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={Logout}>Logout</MenuItem>
                  </Menu>{" "}
                </>
              )}
            </ListItem>

            <Divider>
              <Typography sx={{ opacity: "0.6" }} variant="subtitle2">
                TRACK
              </Typography>
            </Divider>
            {[
              { title: "Pomodoro", nav: "/pomodoro" },
              { title: "Projects", nav: "/projects" },
            ].map((e, index) => (
              <>
                <ListItem key={index} disablePadding>
                  <NavLink to={e.nav} style={{ width: "100%" }}>
                    {({ isActive }) => (
                      <div style={{ background: isActive ? "#ff6f00" : "" }}>
                        <ListItemButton>
                          <ListItemText primary={e.title} />
                        </ListItemButton>
                      </div>
                    )}
                  </NavLink>
                </ListItem>
              </>
            ))}
            <ListItem>
              <MyApp />
            </ListItem>
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default" }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default Layout;
