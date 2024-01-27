"use client";
import React from "react";
import { Button, Heading, TextArea, TextField } from "@radix-ui/themes";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
});

export default function CreateTask() {
  const tasks = localStorage.getItem("tasks");

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit(values) {
      const tasksArr = [];

      if (!tasks) {
        tasksArr.push({ ...values });
      } else {
        const existingTasks = JSON.parse(tasks);
        tasksArr.push(...existingTasks, { ...values });
      }

      const tasksStr = JSON.stringify(tasksArr);
      localStorage.setItem("tasks", tasksStr);
    },
  });

  return (
    <div>
      <Heading as="h1">New task</Heading>
      <form id="task" onSubmit={formik.handleSubmit}>
        <TextField.Root>
          <TextField.Input
            placeholder="Title"
            id="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          ></TextField.Input>
        </TextField.Root>
        <TextArea
          placeholder="description"
          id="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
      </form>
      <Button form="task">Create</Button>
    </div>
  );
}
