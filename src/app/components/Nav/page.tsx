import { IconChecklist, IconDashboard } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import "./styles.css";

function Nav() {
  return (
    <nav className="nav-bar">
      <Link href={"/dashboard"}>
        <div className="list-item">
          <IconDashboard />
          <p className="list-title">Dashboard</p>
        </div>
      </Link>
      <Link href={"/tasks"}>
        <div className="list-item">
          <IconChecklist />
          <p className="list-title">Tasks</p>
        </div>
      </Link>
    </nav>
  );
}

export default Nav;
