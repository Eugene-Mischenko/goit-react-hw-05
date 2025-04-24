import { Routes, Route } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
