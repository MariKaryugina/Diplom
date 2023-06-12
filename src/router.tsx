import { Route, Routes } from "react-router";

import {
  Main,
  Earth,
  NoMatch,
  Simulator,
} from "./screens";

export const AllRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />

    <Route path="earth" element={<Earth />} />

    <Route path="simulate" element={<Simulator />} />

    <Route path="*" element={<NoMatch />} />
  </Routes>
);