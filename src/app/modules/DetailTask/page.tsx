"use client";
import React from "react";

import {
  Button,
  Dialog,
  DialogClose,
  Flex,
  Grid,
  Link,
} from "@radix-ui/themes";

import { Task } from "../CreateTask/page";
import { usePathname } from "next/navigation";

function DetailTask({ task }: { task: Task }) {
  const currentPath = usePathname();
  const isDashboard = currentPath !== "/tasks";

  return (
    <Dialog.Root>
      <Dialog.Trigger style={{ cursor: "pointer" }}>
        <p>{task.title}</p>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: "350px" }}>
        <Dialog.Title
          align="center"
          style={{
            letterSpacing: "0.1rem",
            fontWeight: "500",
          }}
        >
          {task.title}
        </Dialog.Title>
        <Dialog.Description style={{ marginBottom: "26px" }}>
          <div style={{ marginBottom: "16px" }}>
            <p style={{ fontWeight: "bold" }}>Description: </p>
            <p>{task.description}</p>
          </div>
          <Grid columns={"2"}>
            <div>
              <p style={{ fontWeight: "bold" }}>Created:</p>
              <p>{new Date(task.createdAt).toDateString()}</p>
            </div>
            {Boolean(task.updatedAt) && (
              <div>
                <p style={{ fontWeight: "bold" }}>Last updated:</p>
                <p>{new Date(task.updatedAt ?? "").toDateString()}</p>
              </div>
            )}
          </Grid>
        </Dialog.Description>
        <Flex justify={!isDashboard ? "end" : "between"}>
          <Dialog.Close>
            <Button color="crimson" variant="soft" radius="full">
              Close
            </Button>
          </Dialog.Close>
          {isDashboard && (
            <DialogClose>
              <Button variant="soft" radius="full">
                <Link href={"/tasks"}>Edit</Link>
              </Button>
            </DialogClose>
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default DetailTask;
