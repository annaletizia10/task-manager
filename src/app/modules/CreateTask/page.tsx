"use client";
import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DropdownMenu,
  Flex,
  Grid,
  TextArea,
  Tooltip,
} from "@radix-ui/themes";
import { IconPlus } from "@tabler/icons-react";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

import { useFormik } from "formik";

import TextInput from "@/app/components/TextInput/page";
import { capitalize, setStorage } from "@/app/utils/functions";

import * as yup from "yup";

import "react-day-picker/dist/style.css";
import "./style.css";

const validationSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string(),
  deadlineAt: yup.date(),
});

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "COMPLETED" | "IN_PROGRESS";
  createdAt: Date;
  updatedAt: Date | undefined;
  deadlineAt: Date | undefined;
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
      deadlineAt: editTask?.deadlineAt ?? undefined,
    },
    validationSchema,
    onSubmit(values) {
      if (!isEditing) {
        tasks.push({
          id: Date.now().toString(),
          title: capitalize(values.title),
          description: capitalize(values.description),
          createdAt: new Date(),
          status: "IN_PROGRESS",
          updatedAt: undefined,
          deadlineAt: values.deadlineAt ?? undefined,
        });
      } else {
        tasks.map((task) => {
          if (task.id === id) {
            (task.title = capitalize(values.title)),
              (task.description = capitalize(values.description)),
              (task.updatedAt = new Date());
            task.deadlineAt = values.deadlineAt ?? undefined;
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
          <p style={{ fontSize: "0.9rem" }}>Edit</p>
        ) : (
          <Button radius="full">
            <Tooltip content="Create a task">
              <IconPlus />
            </Tooltip>
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Content className="modal">
        <Dialog.Title
          style={{
            letterSpacing: "0.1rem",
            fontWeight: "500",
          }}
        >
          {isEditing ? "Edit" : "New"} task
        </Dialog.Title>
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
              style={{ padding: "3px" }}
            />
            <DropdownMenu.Root>
              <DropdownMenu.Trigger
                className={!formik.values.deadlineAt ? "description" : ""}
              >
                <Button variant="soft">Add a deadline</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DayPicker
                  mode="single"
                  id="deadlineAt"
                  selected={formik.values.deadlineAt}
                  onDayClick={(e) => formik.setFieldValue("deadlineAt", e)}
                />
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            {formik.values.deadlineAt && (
              <p className={formik.values.deadlineAt ? "description" : ""}>
                Task deadline:{" "}
                {new Date(formik.values.deadlineAt).toDateString()}
              </p>
            )}
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
