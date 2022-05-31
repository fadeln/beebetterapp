import { Button } from "@mui/material";
import { useSettings } from "../../helpers/SettingsContext";

export default function MyButton(p: any) {
  const settingsInfo = useSettings();
  return (
    <Button
      variant={p.variant}
      color={p.color}
      sx={{ width: "200px", marginY: p.mx }}
      onClick={p.onClick}
    >
      {p.children}
    </Button>
  );
}
