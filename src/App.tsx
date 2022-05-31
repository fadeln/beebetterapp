import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Task from "./pages/Todos";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthPage from "./pages/Login";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth, db, provider } from "./firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import Pomodoro from "./pages/Pomodoro";
import { purple, red } from "@mui/material/colors";
import { Box, IconButton } from "@mui/material";
import LayoutTest from "./components/LayoutTest";


declare module "@mui/material/styles" {
  interface Palette {
    myAwesomeColor: Palette["primary"];
  }
  interface PaletteOptions {
    myAwesomeColor?: Palette["primary"];
  }
}
// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    myAwesomeColor: true;
  }
}
const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function MyApp() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const setBgColor = () => {
    if (theme.palette.mode === "dark") {
      return "#353535";
    } else {
      return "inherit";
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(255, 0, 0, 0)",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
        zIndex: 99,
      }}
    >
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon sx={{ fontSize: "40px" }} />
        ) : (
          <Brightness4Icon sx={{ fontSize: "40px" }} />
        )}
      </IconButton>
    </Box>
  );
}
//change app theme
const App: FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          myAwesomeColor: {
            main: red[600],
            dark: "#9a0007",
            light: "#ff6659",
            contrastText: "#fff",
          },
          primary: {
            main: "#ff6f00",
            dark: "#c56000",
            light: "#ffc046",
          },
          secondary: {
            main: "#d32f2f",
            dark: "#9a0007",
            light: "#ff6659",
          },
        },
        typography: {
          h1: {
            lineHeight: 1.79,
          },
        },
      }),
    [mode]
  );
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>();

  const [tasks, setTasks] = useState<DocumentData[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.uid == null) {
        setUser(null);
      } else {
        setUser(currentUser);
        const tasksCollectionRef = collection(
          db,
          "users",
          `${currentUser.uid}`,
          "todos"
        );
        onSnapshot(tasksCollectionRef, (snapshot) => {
          let tasks: any = [];
          snapshot.docs.forEach((doc) => {
            console.log({ ...doc.data() });
            tasks.push({ ...doc.data(), id: doc.id });
          });
          setTasks(tasks);
        });
      }
    });
  }, []);

  const addTask = async (task: {
    title: string;
    desc: string;
    deadline: string;
    tostring: number;
    stat: string;
  }) => {
    const newTask = {
      title: task.title,
      desc: task.desc,
      deadline: task.deadline,
      tostring: task.tostring,
      stat: task.stat,
    };
    const queryData = doc(collection(db, "users", `${user!.uid}`, "todos"));
    await setDoc(doc(db, `users/${user!.uid}`), {
      userId: user!.uid,
      userData: user!.providerData,
    });
    await setDoc(queryData, { ...newTask });
  };

  const deleteTask = async (id: any) => {
    console.log(id);

    await id.map((i: any) => {
      deleteDoc(doc(db, `users/${user!.uid}/todos`, i));
    });
  };

  const Logout = async () => {
    await signOut(auth);
    setTasks([]);
    navigate("/");
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/projects");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Register = async (userData: any) => {
    try {
      const CreateUser = await createUserWithEmailAndPassword(
        auth,
        userData.registerEmail,
        userData.registerPassword
      );
      navigate("/projects");
    } catch (error) {}
  };

  const Login = async (userData: any) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userData.loginEmail,
        userData.loginPassword
      );
      navigate("/projects");
    } catch (error) {}
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={
                <AuthPage
                  Login={Login}
                  Register={Register}
                  signInWithGoogle={signInWithGoogle}
                />
              }
            />

            <Route
              element={
                <LayoutTest
                  user={user}
                  Logout={Logout}
                  handleDrawerToggle={handleDrawerToggle}
                  mobileOpen={mobileOpen}
                />
              }
            >
              <Route
                path="/projects"
                element={
                  <Task
                    tasks={tasks}
                    user={user}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    Logout={Logout}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                }
              ></Route>

              <Route
                path="/pomodoro"
                element={
                  <Pomodoro
                    tasks={tasks}
                    handleDrawerToggle={handleDrawerToggle}
                  />
                }
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
