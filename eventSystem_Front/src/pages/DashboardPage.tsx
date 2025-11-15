import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  if (!user) {
    // en teoria PrivateRoute lo evita, pero por si acaso
    return <div className="fullpage-center">Sin sesion...</div>;
  }

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-sidebar-title">EventSystem</div>
        <div className="app-sidebar-sub">
          Sesion: <strong>{user.name || user.username}</strong>
          <br />
          Perfil {user.profileId}
        </div>

        <nav className="app-nav">
          <button
            className="app-nav-btn primary"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          {/* cuando tengamos mas vistas las agregamos aqui */}
          {/* <button className="app-nav-btn" onClick={() => navigate("/events")}>
            Eventos
          </button> */}
          <button className="app-nav-btn danger" onClick={handleLogout}>
            Cerrar sesion
          </button>
        </nav>
      </aside>

      <main className="app-main">
        <div className="app-main-header">
          <div>
            <h1 style={{ margin: 0, fontSize: "1.75rem" }}>
              Dashboard de eventos
            </h1>
            <p style={{ opacity: 0.8, marginTop: "0.35rem" }}>
              Resumen general del sistema. Desde aqui abriremos eventos, staff,
              pagos y reportes.
            </p>
          </div>
        </div>

        <section className="app-main-card">
          <h2 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
            Estado del sistema
          </h2>
          <p style={{ opacity: 0.9, marginBottom: "0.5rem" }}>
            La sesion esta activa en el backend y protegida por el dispatcher
            de seguridad. Este dashboard solo es accesible si el usuario esta
            autenticado.
          </p>
          <p style={{ opacity: 0.8, fontSize: "0.9rem" }}>
            Proximo paso: conectar BOs reales como{" "}
            <code>Events.list</code>, <code>Venues.list</code>,{" "}
            <code>Staff.list</code>, etc., siempre usando transacciones
            <code> Objeto.metodo </code> via <code>POST /api</code>.
          </p>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
