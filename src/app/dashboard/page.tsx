"use client";

import React, { useEffect, useState } from "react";

import { Flex, Grid, Heading, Link, Tooltip } from "@radix-ui/themes";
import { IconPoint, IconSparkles } from "@tabler/icons-react";

import DetailTask from "../modules/DetailTask/page";
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

  const missingTasks = completed.length === 0 && incompleted.length === 0;

  return (
    <Flex className="container">
      <Tooltip content="Go to your tasks">
        <Heading align="center" style={{ margin: "30px 0px" }}>
          <Link href="/tasks" className="title">
            Tasks
          </Link>
        </Heading>
      </Tooltip>
      <Flex className="card-container">
        {missingTasks ? (
          <p>
            There are no tasks,yet.{" "}
            <span>
              <Link href={"/tasks"} className="link">
                Create one
              </Link>
            </span>
          </p>
        ) : (
          <>
            <Flex direction={"column"} align={"center"} className="card">
              <Heading
                style={{
                  letterSpacing: "0.1rem",
                  fontWeight: "500",
                }}
              >
                Completed
              </Heading>
              <span className="page-title" />
              <Grid gap="3" className="card-content">
                {completed.length > 0 ? (
                  completed.map((task) => {
                    return (
                      <Tooltip content="Task detail">
                        <Flex gap="2" key={task.id} className="task">
                          <IconSparkles />
                          <DetailTask task={task} />
                        </Flex>
                      </Tooltip>
                    );
                  })
                ) : (
                  <p>
                    You havent completed any{" "}
                    <span>
                      <Link href={"/tasks"} className="link">
                        tasks
                      </Link>
                    </span>
                  </p>
                )}
              </Grid>
            </Flex>
            <Flex direction={"column"} align={"center"} className="card">
              <Heading
                style={{
                  letterSpacing: "0.1rem",
                  fontWeight: "500",
                }}
              >
                Incompleted
              </Heading>
              <span className="page-title" />
              <Grid gap="3" className="card-content">
                {incompleted.length > 0
                  ? incompleted.map((task) => {
                      return (
                        <Tooltip content="Task detail">
                          <Flex gap="2" key={task.id} className="task">
                            <IconPoint />
                            <DetailTask task={task} />
                          </Flex>
                        </Tooltip>
                      );
                    })
                  : "Nice work, you have acomplished everything in you list"}
              </Grid>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default Dashboard;
