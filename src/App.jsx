import { Route, Routes } from "react-router-dom";
import { Privateroute } from "./routes/PrivateRoute";
import { AuthProvider } from "./context/context";

import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Account } from "./pages/Account";
import { Notfound } from "./pages/NotFound";
import { FormNote } from "./pages/FormNote";

import "./styles/app.scss";

function App() {
  return (
    <>
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
                  <FormNote />
                </Privateroute>
              }
            />

            <Route
              path="edit"
              element={
                <Privateroute>
                  <FormNote />
                </Privateroute>
              }
            />
          </Route>
          <Route path="/login" element={<Account />} />
          <Route path="/signup" element={<Account isLogin={false} />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
