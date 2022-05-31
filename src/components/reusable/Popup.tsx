import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useSettings } from "../../helpers/SettingsContext";

export default function Popup(p: any) {
  const infoSettings = useSettings();
  return (
    <Dialog
      open={infoSettings.openPopup}
      fullWidth
      onClose={() => infoSettings.setOpenPopup(!infoSettings.openPopup)}
    >
      <DialogTitle>
        <div>
          <Typography variant="h6" component="div">
            {p.title}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers>{p.children}</DialogContent>
    </Dialog>
  );
}
