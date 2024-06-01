import { StatusBar, Style } from "@capacitor/status-bar";

export const setStatusBar = async (mode: "light" | "dark") => {
  StatusBar.setOverlaysWebView({ overlay: true });
  await StatusBar.setStyle({
    style: mode === "light" ? Style.Dark : Style.Light
  });
};
