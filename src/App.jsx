import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/context";
import { Privateroute } from "./routes/PrivateRoute";

import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Account } from "./pages/Account";
import { Notfound } from "./pages/NotFound";
import { NoteForm } from "./pages/NoteForm";

import "./styles/index.scss";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <Privateroute>
                <Home />
              </Privateroute>
            }
          />

          <Route
            path="add"
            element={
              <Privateroute>
                <NoteForm />
              </Privateroute>
            }
          />

          <Route
            path="edit/:noteId"
            element={
              <Privateroute>
                <NoteForm />
              </Privateroute>
            }
          />
        </Route>
        <Route path="/login" element={<Account />} />
        <Route path="/signup" element={<Account isLogin={false} />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
