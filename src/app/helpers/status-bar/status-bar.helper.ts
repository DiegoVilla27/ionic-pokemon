import { StatusBar, Style } from "@capacitor/status-bar";

export const setStatusBar = async (mode: "light" | "dark") => {
  await StatusBar.setStyle({
    style: mode === "light" ? Style.Dark : Style.Light
  });
};
