"use client";
import React, { useEffect, useState } from "react";

import { Button, Dialog, Flex, Grid, TextArea } from "@radix-ui/themes";
import { IconPlus } from "@tabler/icons-react";

import { useFormik } from "formik";

import TextInput from "@/app/components/TextInput/page";
import { setStorage } from "@/app/utils/functions";

import * as yup from "yup";
import "./style.css";

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
  updatedAt: Date | undefined;
};

export default function CreateTaskModal({
  onClose,
  type,
  id,
  updatedTasks,
  editTask,
}: {
  onClose?: () => void;
  type: "EDIT" | "CREATE";
  id?: string;
  updatedTasks: Task[];
  editTask?: Task;
}) {
  const [tasks, setTasks] = useState([] as Task[]);
  const isEditing = type === "EDIT";

  useEffect(() => {
    setTasks(updatedTasks);
  }, [updatedTasks.length !== tasks.length]);

  const formik = useFormik({
    initialValues: {
      title: editTask?.title ?? "",
      description: editTask?.description ?? "",
    },
    validationSchema,
    onSubmit(values) {
      if (!isEditing) {
        tasks.push({
          id: Date.now().toString(),
          ...values,
          createdAt: new Date(),
          status: "IN_PROGRESS",
          updatedAt: undefined,
        });
      } else {
        tasks.map((task) => {
          if (task.id === id) {
            (task.title = values.title),
              (task.description = values.description),
              (task.updatedAt = new Date());
          }
        });
      }

      setStorage(tasks as [], "tasks");
      formik.resetForm();
      onClose?.();
    },
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        {isEditing ? (
          <p>Edit</p>
        ) : (
          <Button radius="full">
            <IconPlus />
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Content className="modal">
        <Dialog.Title>{isEditing ? "Edit" : "New"} task</Dialog.Title>
        <form id="task" onSubmit={formik.handleSubmit}>
          <Grid gap="3">
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
              className="description"
            />
          </Grid>
        </form>
        <Flex justify="between">
          <Dialog.Close>
            <Button
              color="crimson"
              variant="soft"
              radius="full"
              onClick={() => formik.resetForm()}
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              type="submit"
              form="task"
              disabled={!formik.isValid || !formik.dirty}
              variant="soft"
              radius="full"
            >
              {isEditing ? "Save" : "Create"}
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
