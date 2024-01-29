"use client";

import React, { useEffect, useState } from "react";

import { Flex, Grid, Heading, Link } from "@radix-ui/themes";
import { IconPoint, IconSparkles } from "@tabler/icons-react";

import { Task } from "../modules/CreateTask/page";

import "./styles.css";

function Dashboard() {
  const [tasks, setTasks] = useState([] as Task[]);

  useEffect(() => {
    const currentTasks = JSON.parse(localStorage.getItem("tasks") as string);
    if (currentTasks) {
      setTasks(currentTasks);
    }
  }, []);

  const completed = tasks.filter((task) => task.status === "COMPLETED");
  const incompleted = tasks.filter((task) => task.status === "IN_PROGRESS");

  return (
    <Flex direction="column" style={{ padding: "30px 15px" }}>
      <Heading align="center" style={{ margin: "30px 0px" }}>
        <Link href="/tasks">Tasks</Link>
      </Heading>
      <Flex justify="between" className="card-container">
        <Flex direction={"column"} align={"center"} className="card">
          <Heading>Completed</Heading>
          <span className="page-title" />
          <Grid gap="3" className="card-content">
            {completed.length > 0
              ? completed.map((task) => {
                  return (
                    <Flex gap="2" key={task.id} className="task">
                      <IconSparkles />
                      <p>{task.title}</p>
                    </Flex>
                  );
                })
              : "You havent completed any tasks"}
          </Grid>
        </Flex>
        <Flex direction={"column"} align={"center"} className="card">
          <Heading>Incompleted</Heading>
          <span className="page-title" />
          <Grid gap="3" className="card-content">
            {incompleted.length > 0
              ? incompleted.map((task) => {
                  return (
                    <Flex gap="2" key={task.id} className="task">
                      <IconPoint />
                      <p>{task.title}</p>
                    </Flex>
                  );
                })
              : "Nice work, you have acomplished everything in you list"}
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Dashboard;
