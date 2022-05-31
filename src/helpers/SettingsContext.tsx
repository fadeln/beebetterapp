import { createContext, useContext, useState } from "react";

type settingsContent = {
  openPopup: boolean;
  workMinutes: number;
  breakMinutes: number;

  setWorkMinutes: React.Dispatch<React.SetStateAction<number>>;
  setBreakMinutes: React.Dispatch<React.SetStateAction<number>>;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export const settingsContext = createContext<settingsContent>({
  workMinutes: 50,
  setWorkMinutes: () => {},
  openPopup: false,
  setOpenPopup: () => {},
  breakMinutes: 15,
  setBreakMinutes: () => {},
});

export function useSettings() {
  return useContext(settingsContext);
}

export default function SettingsContext(p: any) {
  const [openPopup, setOpenPopup] = useState(false);
  const [workMinutes, setWorkMinutes] = useState<number>(25);
  const [breakMinutes, setBreakMinutes] = useState<number>(5);

  return (
    <settingsContext.Provider
      value={{
        openPopup,
        setOpenPopup,
        workMinutes,
        setWorkMinutes,
        breakMinutes,
        setBreakMinutes,
      }}
    >
      {p.children}
    </settingsContext.Provider>
  );
}
