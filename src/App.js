import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import TicketSelection from "./pages/ticketSelection";
import TicketGenerate from "./pages/ticketGenerate";
import AttendeeDetail from "./pages/attendeeDetail";
import HomePage from "./pages/homePage";
import DesktopNav from "./components/desktopNav";
import useMediaQuery from "./hooks/useMediaQuery";
import ProtectedRoute from "./hooks/protectedRoute";

function App() {
  const aboveMediumScreen = useMediaQuery("(min-width:1060px)");

  return (
    <Router>
      <div className="px-[20px] py-[64px] ssm:py-[112px]">
        <DesktopNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/selectionPage" element={<TicketSelection />} />
          <Route path="/attendeePage" element={<AttendeeDetail />} />
          <Route
            path="/ticketPage"
            element={
              <ProtectedRoute>
                <TicketGenerate />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
