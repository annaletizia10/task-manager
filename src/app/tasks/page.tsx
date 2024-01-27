"use client";

import { Box, Button, Card, Checkbox, Flex, Heading } from "@radix-ui/themes";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { task } from "./new/page";
import "./styles.css";

function Tasks() {
  const [tasks, setTasks] = useState([] as task[]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks") as string));
  }, []);

  return (
    <Flex direction="column" style={{ padding: "30px 30px 0px 0px" }}>
      <Button className="button">
        <Link href={"/tasks/new"}>
          <IconPlus />
        </Link>
      </Button>
      <div className="list-container">
        <Heading className="heading">To-do List:</Heading>
        {tasks.map((task) => (
          <Card key={`${task?.title} ${task.description}`}>
            <Flex>
              <Checkbox defaultChecked style={{ alignSelf: "center" }} />
              <Box className="text-container">
                <p className="bold">{task?.title}</p>
                <p>{task.description}</p>
              </Box>
              <IconTrash className="button" />
            </Flex>
          </Card>
        ))}
      </div>
    </Flex>
  );
}

export default Tasks;
