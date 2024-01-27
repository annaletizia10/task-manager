"use client";
import React, { useEffect, useState } from "react";
import { Button, Heading, TextArea, TextField } from "@radix-ui/themes";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "@/app/components/TextInput/page";

const validationSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string(),
});

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "COMPLETED" | "IN_PROGRESS";
  createdAt: Date;
};

export default function CreateTask() {
  const [tasks, setTasks] = useState([] as Task[]);

  useEffect(() => {
    const currentTasks = JSON.parse(localStorage.getItem("tasks") as string);
    if (currentTasks) {
      setTasks(currentTasks);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit(values) {
      tasks.push({
        id: Date.now().toString(),
        ...values,
        createdAt: new Date(),
        status: "IN_PROGRESS",
      });

      const tasksStr = JSON.stringify(tasks);
      localStorage.setItem("tasks", tasksStr);
    },
  });

  return (
    <div>
      <Heading as="h1">New task</Heading>
      <form id="task" onSubmit={formik.handleSubmit}>
        <TextInput
          placeholder="Title"
          id="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          error={
            formik.touched.title && formik.errors.title
              ? formik.errors.title
              : ""
          }
        />
        <TextArea
          placeholder="description"
          id="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          onBlur={formik.handleBlur}
        />
      </form>
      <Button form="task" disabled={!formik.isValid}>
        Create
      </Button>
    </div>
  );
}
