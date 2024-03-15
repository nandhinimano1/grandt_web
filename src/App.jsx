import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Dashboard from "./components/Dashboard";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import OnBoarding from "./pages/OnBoarding/OnBoarding";
import ResultSummary from "./pages/ResultSummary/ResultSummary";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="onboard" element={<OnBoarding />}></Route>
            <Route path="result-summary" element={<ResultSummary />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
