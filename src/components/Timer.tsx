import { Box } from "@mui/material";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { updateJsxAttribute } from "typescript";
import MyButton from "../components/reusable/MyButton";
import Popup from "../components/reusable/Popup";
import Settings from "../components/Settings";
import { auth, db } from "../firebase-config";
import SettingsContext, { useSettings } from "../helpers/SettingsContext";

export default function Timer({ getDocId }: any) {
  // updateStatus
  const settingsInfo = useSettings();

  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("work");
  const [first, setfirst] = useState<number>();

  // const timeStatRef = useRef(timeStat)
  const sec = useRef(0);
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
    asd();
    // updateStatus()
    testt();
  }
  const asd = async () => {
    sec.current++;
    console.log("asdsadas" + sec.current);
  };
  const testt = () => {
    setfirst(Math.floor(Math.random() * 10));
  };

  // const docSnap = async() =>{
  //   return(

  //   )
  // }

  const [data, setData] = useState<number | null>(null);

  const [user, setUser] = useState<User | null>();

  const updateStatus = async () => {
    // console.log(data)

    // setInterval(async () => {
    // console.log(docSnap)
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data().stat);
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
    // const docSnap = await getDoc(doc(db, `users/${user!.uid}/todos/NnBI7WxPqOoZm16QWhOR`));
    //   const docRef = doc(db, `users/${user!.uid}/todos/NnBI7WxPqOoZm16QWhOR`);
    //   onSnapshot(docRef, (doc) => {
    //   console.log("data asdasd:",{...doc.data()})
    //   setData(doc.data()!.tostring)
    // });
    if (data != null) {
      const currentStatus = data! + sec.current;
      const currentStatusToString = currentStatus.toString() + " second(s)";
      await updateDoc(doc(db, `users/${user!.uid}/todos/${getDocId}`), {
        tostring: currentStatus,
        stat: currentStatusToString,
      });
      console.log(data!);
    } else {
      return;
    }

    // }, 1000);
  };
  // useEffect(() => {
  //   onAuthStateChanged(auth, async (currentUser) => {
  //     if (currentUser?.uid == null) {
  //       setUser(null);
  //     } else {
  //       setUser(currentUser);

  //       const docRef = doc(db, `users/${user!.uid}/todos/NnBI7WxPqOoZm16QWhOR`);
  //       onSnapshot(docRef, (doc) => {
  //       console.log("data asdasd:",{...doc.data()})
  //       setData(doc.data()!.tostring)
  //     });
  //     }

  //   });
  // }, [])

  useEffect(() => {
    console.log("doc id: ", getDocId);
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.uid == null) {
        setUser(null);
      } else {
        setUser(currentUser);

        const docRef = doc(db, `users/${currentUser!.uid}/todos/${getDocId}`);
        onSnapshot(docRef, (doc) => {
          console.log("Current Data:", { ...doc.data() });
          setData(doc.data()!.tostring);
        });
      }
    });
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds: string | number = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;
  return (
    <>
      <div onClick={() => console.log(minutes)} className="noselect">
        <CircularProgressbar
          value={percentage}
          text={minutes + ":" + seconds}
          styles={buildStyles({
            textColor: mode === "work" ? "#d32f2f" : "#388e3c",
            pathColor: mode === "work" ? "#d32f2f" : "#388e3c",
          })}
          className="cursor-pointer"
        />
        
      </div>

      <div className="mt-4 flex flex-col items-center ">
        {isPaused ? (
          <MyButton
            variant="contained"
            color="primary"
            mx="10px"
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          >
            Start
          </MyButton>
        ) : (
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <MyButton
              variant="contained"
              color="myAwesomeColor"
              mx="10px"
              sx={{ marginRight: "100px" }}
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            >
              Pause
            </MyButton>
            <div style={{ width: "10px" }}></div>
            <MyButton
              sx={{ marginLeft: "100px" }}
              variant="contained"
              color="success"
              mx="10px"
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
                updateStatus();
                sec.current = 0;
              }}
            >
              Save
            </MyButton>
          </Box>
        )}

        <MyButton
          variant="contained"
          color="secondary"
          onClick={() => settingsInfo.setOpenPopup(true)}
        >
          Settings
        </MyButton>
      </div>
    </>
  );
}
