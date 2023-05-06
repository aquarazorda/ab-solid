import { FileRoutes, Routes } from "solid-start";
import { Popup } from "./states/popup";

export const App = () => {
  return (
    <Routes>
      <FileRoutes />
      <Popup />
    </Routes>
  );
};
