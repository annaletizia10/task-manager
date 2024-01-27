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

export type task = {
  title: string;
  description: string;
};

export default function CreateTask() {
  const [tasks, setTasks] = useState([] as task[]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks") as string));
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit(values) {
      tasks.push({ ...values });

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
