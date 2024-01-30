import React from "react";

import { Flex } from "@radix-ui/themes";
import Link from "next/link";

import { IconChecklist, IconDashboard } from "@tabler/icons-react";

import "./styles.css";

function Nav() {
  return (
    <nav className="nav-bar">
      <Flex className="nav-container">
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
      </Flex>
    </nav>
  );
}

export default Nav;
