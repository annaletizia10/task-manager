"use client";
import React from "react";
import { Button, Heading, TextArea, TextField } from "@radix-ui/themes";

export default function CreateTask() {
  return (
    <div>
      <Heading as="h1">New task</Heading>
      <TextField.Root>
        <TextField.Input placeholder="Title"></TextField.Input>
      </TextField.Root>
      <TextArea placeholder="description" />
      <Button>Create</Button>
    </div>
  );
}
