import { Route, Switch } from "wouter";
import { AppProvider } from "./contexts/AppContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import BookingStatusPage from "./pages/BookingStatusPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <Navbar />
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/status" component={BookingStatusPage} />
          <Route path="/admin" component={AdminPage} />
          <Route>
            <div className="min-h-screen flex items-center justify-center pt-16">
              <div className="text-center">
                <div className="text-6xl mb-4">404</div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Page not found</h2>
                <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">← Go home</a>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </AppProvider>
  );
}
