"use client";

import { Box, Button, Card, Checkbox, Flex, Heading } from "@radix-ui/themes";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Task } from "./new/page";
import { setStorage } from "../utils/functions";
import "./styles.css";

function Tasks() {
  const [tasks, setTasks] = useState([] as Task[]);
  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    const currentTasks = JSON.parse(localStorage.getItem("tasks") as string);
    if (currentTasks) {
      setTasks(currentTasks);
    }
  }, [hasUpdated]);

  function handleDelete(id: string) {
    const currentTasks = tasks.filter((task) => task.id !== id);

    setTasks(currentTasks);
    setStorage(currentTasks as [], "tasks");
  }
  function handleChangeStatus(id: string) {
    tasks.map((task) => {
      if (task.id === id) {
        task.status === "COMPLETED"
          ? (task.status = "IN_PROGRESS")
          : (task.status = "COMPLETED");
      }
    });
    setStorage(tasks as [], "tasks");
    setHasUpdated((prevState) => !prevState);
  }

  return (
    <Flex direction="column" style={{ padding: "30px 30px 0px 0px" }}>
      <Button className="button">
        <Link href={"/tasks/new"}>
          <IconPlus />
        </Link>
      </Button>
      <div className="list-container">
        <Heading className="heading">To-do List:</Heading>
        {tasks.length !== 0 ? (
          tasks.map((task) => (
            <Card key={`${task.id} ${task.description}`}>
              <Flex>
                <Checkbox
                  checked={task.status === "COMPLETED"}
                  style={{ alignSelf: "center" }}
                  onClick={() => handleChangeStatus(task.id)}
                />
                <Box className="text-container">
                  <p className="bold">{task?.title}</p>
                  <p>{task.description}</p>
                </Box>
                <IconTrash
                  className="button"
                  onClick={() => handleDelete(task.id)}
                />
              </Flex>
            </Card>
          ))
        ) : (
          <p>No registered tags</p>
        )}
      </div>
    </Flex>
  );
}

export default Tasks;
