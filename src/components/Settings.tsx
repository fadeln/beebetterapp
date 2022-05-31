import { Slider } from "@mui/material";
import { useSettings } from "../helpers/SettingsContext";

export default function Settings(p: any) {
  const settingsInfo = useSettings();
  return (
    <>
     
      <label>Work : {settingsInfo.workMinutes}:00</label>
      <Slider
        size="small"
        value={settingsInfo.workMinutes}
        onChange={(event, newValue: number | number[]) =>
          settingsInfo.setWorkMinutes(newValue as number)
        }
        aria-label="Small"
        valueLabelDisplay="auto"
        min={15}
        max={120}
      />
      <label>Break : {settingsInfo.breakMinutes}:00</label>
      <Slider
        size="small"
        value={settingsInfo.breakMinutes}
        onChange={(event, newValue: number | number[]) =>
          settingsInfo.setBreakMinutes(newValue as number)
        }
        aria-label="Small"
        valueLabelDisplay="auto"
        min={5}
        max={120}
      />
    </>
  );
}
