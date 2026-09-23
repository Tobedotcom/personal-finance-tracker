import { useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import babyrome from "../../assets/images/babyrome.jpeg";

import overviewIcon from "../../assets/images/icon-nav-overview.svg";
import transactionsIcon from "../../assets/images/icon-nav-transactions.svg";
import budgetsIcon from "../../assets/images/icon-nav-budgets.svg";
import potsIcon from "../../assets/images/icon-nav-pots.svg";
import { getLoggedInUser } from "../../utils/auth";

import LogoutButton from "../authentication/LogoutButton";

import "../../css/layouts/sidebar.css";

const navigation = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: overviewIcon,
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: transactionsIcon,
  },
  {
    title: "Budgets",
    path: "/budgets",
    icon: budgetsIcon,
  },
  {
    title: "Pots",
    path: "/pots",
    icon: potsIcon,
  },
];

function Sidebar() {
  const user = getLoggedInUser();

  const [isOpen, setIsOpen] = useState(false);

  function closeSidebar() {
    setIsOpen(false);
  }

  return (
    <>
      {/* Mobile-only top bar: shows the logo and the menu toggle when the
          fixed sidebar is off-canvas on small screens. Hidden on desktop. */}
      <div className="sidebar-mobile-topbar">
        <img src={logo} alt="Heritage Ledger" />

        <button
          type="button"
          className="sidebar-toggle"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      <aside className={isOpen ? "sidebar open" : "sidebar"}>
        <div className="sidebar-top">
          <img src={logo} alt="Heritage Ledger" className="sidebar-logo" />

          <nav className="sidebar-nav">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <img src={item.icon} alt="" />
                <span>{item.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <NavLink to="/profile" className="profile-card" onClick={closeSidebar}>
            <img src={babyrome} alt="Tobechukwu Ajaeze" />

            <div>
              <h4>{user?.name || "User"}</h4>
              <p>Personal Finance</p>
            </div>
          </NavLink>

          <LogoutButton />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
