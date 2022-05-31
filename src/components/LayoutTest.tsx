import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { MyApp } from "../App";
import { Avatar, Button, ListItemAvatar, Menu, MenuItem } from "@mui/material";
import beeImage from "../components/Images/bee.png";
const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let navigate = useNavigate();
  const { window } = props;

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: "space-around" }}>
        <Avatar alt="Remy Sharp" src={beeImage} sx={{ marginRight: "10px" }} />
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
          {props.user == null ? (
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
                    src={props.user?.photoURL}
                  >
                    {" "}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={props.user?.displayName}
                  secondary={props.user?.email}
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
                
                <MenuItem onClick={props.Logout}>Logout</MenuItem>
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
        <ListItem >
          <MyApp />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline />
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
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default" }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
