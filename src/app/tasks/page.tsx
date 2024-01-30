"use client";

import React, { useEffect, useState } from "react";

import { Box, Checkbox, Flex, Heading, Tooltip } from "@radix-ui/themes";
import { IconTrash } from "@tabler/icons-react";

import CreateTaskModal, { Task } from "../modules/CreateTask/page";
import DeleteTaskModal from "../modules/DeleteTask/page";
import DetailTask from "../modules/DetailTask/page";

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
    <Flex
      direction="column"
      style={{
        padding: "20px",
      }}
    >
      <div className="button">
        <CreateTaskModal
          type="CREATE"
          onClose={() => setHasUpdated((prevState) => !prevState)}
          updatedTasks={tasks}
        />
      </div>
      <div className="list-container">
        <Heading className="heading">To-do List</Heading>
        {tasks.length !== 0 ? (
          tasks.map((task) => (
            <Tooltip content="Task detail">
              <Flex className="card">
                <Checkbox
                  checked={task.status === "COMPLETED"}
                  style={{
                    alignSelf: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleChangeStatus(task.id)}
                />
                <Box className="text-container">
                  <p className="bold">
                    <DetailTask task={task} />
                  </p>
                  <p>{task.description}</p>
                </Box>
                <Flex direction="column" className="button">
                  <CreateTaskModal
                    type="EDIT"
                    onClose={() => setHasUpdated((prevState) => !prevState)}
                    updatedTasks={tasks}
                    id={task.id}
                    editTask={task}
                  />
                  {task.status === "COMPLETED" ? (
                    <IconTrash
                      onClick={() => handleDelete(task.id)}
                      size={19}
                    />
                  ) : (
                    <DeleteTaskModal onClick={handleDelete} id={task.id} />
                  )}
                </Flex>
              </Flex>
            </Tooltip>
          ))
        ) : (
          <p>No registered tasks, create one</p>
        )}
      </div>
    </Flex>
  );
}

export default Tasks;
