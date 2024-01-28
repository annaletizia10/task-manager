"use client";

import React, { useEffect, useState } from "react";

import { Box, Card, Checkbox, Flex, Heading } from "@radix-ui/themes";
import { IconTrash } from "@tabler/icons-react";

import CreateTaskModal, { Task } from "../modules/CreateTask/page";
import DeleteTaskModal from "../modules/DeleteTask/page";

import { setStorage } from "../utils/functions";

import "./styles.css";

function Tasks() {
  const [tasks, setTasks] = useState([] as Task[]);
  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    getStorage("tasks");
  }, [hasUpdated]);

  function getStorage(value: string) {
    const currentTasks = JSON.parse(localStorage.getItem(value) as string);
    if (currentTasks) {
      setTasks(currentTasks);
    }
  }

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
      <div className="button">
        <CreateTaskModal
          type="CREATE"
          onClose={() => setHasUpdated((prevState) => !prevState)}
          updatedTasks={tasks}
        />
      </div>
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
                <div className="button">
                  <CreateTaskModal
                    type="EDIT"
                    onClose={() => setHasUpdated((prevState) => !prevState)}
                    updatedTasks={tasks}
                    id={task.id}
                    editTask={task}
                  />
                  {task.status === "COMPLETED" ? (
                    <IconTrash onClick={() => handleDelete(task.id)} />
                  ) : (
                    <DeleteTaskModal onClick={handleDelete} id={task.id} />
                  )}
                </div>
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
