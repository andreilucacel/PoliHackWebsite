import { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";

interface NavItem {
  label: string;
  url: string;
  exact?: boolean;
}

interface NavBarProps {
  imageSrcPath: string;
  navItems: NavItem[];
  dropdownTitle: string;
  dropdownItems: NavItem[];
  brandUrl?: string;
  onSearch?: (query: string) => void;
}

function NavBar({
  imageSrcPath,
  navItems,
  dropdownTitle,
  dropdownItems,
  brandUrl = "#",
}: NavBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className="navbar navbar-expand-md shadow-sm sticky-top" style={{backgroundColor: '#2d3748' }}>
      <div className="container">
        <NavLink className="navbar-brand" to={brandUrl}>
          <img
            src={imageSrcPath}
            width="100"
            height="100"
            className="d-inline-block align-center rounded-circle"
            alt="Logo"
          />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`collapse navbar-collapse ${isExpanded ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li key={item.label} className="nav-item mx-2">
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `nav-link nav-link-custom ${isActive ? "active fw-bold" : ""}`
                  }
                  end={item.exact}
                  onClick={() => setIsExpanded(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle nav-link-custom"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {dropdownTitle}
              </a>
              <ul className="dropdown-menu dropdown-menu-custom" aria-labelledby="navbarDropdown">
                {dropdownItems.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `dropdown-item ${isActive ? "active fw-bold" : ""}`
                      }
                      end={item.exact}
                      onClick={() => setIsExpanded(false)}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;