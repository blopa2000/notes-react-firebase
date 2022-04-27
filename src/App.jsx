import { Route, Routes } from "react-router-dom";
import { Privateroute } from "./PrivateRoute";
import { AuthProvider } from "./context/context";

import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Account } from "./pages/Account";
import { Notfound } from "./pages/NotFound";

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
