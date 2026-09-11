import { useEffect, useState } from "react";
import Auth from "./Auth";
import TaskManager from "./TaskManager";
import { supabase } from "./supabaseClient";
import "./App.css";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error restoring session:", error);
      }

      setSession(data.session);
      setLoading(false);
    }

    restoreSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error);
    }
  }

  if (loading) {
    return (
      <main className="app-container">
        <section className="loading-container">
          <h1>Task Manager</h1>
          <p>Restoring your session...</p>
        </section>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="app-container">
        <header className="app-header">
          <h1>Task Manager</h1>
          <p>Securely manage your personal tasks.</p>
        </header>

        <Auth />
      </main>
    );
  }

  return (
    <main className="app-container">
      <header className="app-header">
        <div>
          <h1>Task Manager</h1>
          <p>Welcome, {session.user.email}</p>
        </div>

        <button type="button" onClick={handleLogout}>
          Log Out
        </button>
      </header>

      <TaskManager user={session.user} />
    </main>
  );
}
//Note: our code handles a loading state while restoring the session,
// my code handles that with : Restoring your session...
// then the application displays: task manager securely manage your personal tasts. and create an Account / Log in
// and does not display the tasks
// When logged in The application displays : Task manager Welcome, user's-email@example.com and Log out
// an then shows the Task Manager. This gives us the protected interface requested for the assignment.
