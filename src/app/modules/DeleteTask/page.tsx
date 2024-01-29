"use client";
import React from "react";

import { Button, Dialog, Flex } from "@radix-ui/themes";
import { IconTrash } from "@tabler/icons-react";

function DeleteTaskModal({
  onClick,
  id,
}: {
  onClick: (id: string) => void;
  id: string;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconTrash size={19} />
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: "350px" }}>
        <Dialog.Title>Delete uncompleted task</Dialog.Title>
        <Dialog.Description style={{ marginBottom: "15px" }}>
          Are you sure? This action cannot be undone
        </Dialog.Description>
        <Flex justify={"between"}>
          <Dialog.Close>
            <Button color="crimson" variant="soft" radius="full">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button variant="soft" radius="full" onClick={() => onClick(id)}>
              Delete
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default DeleteTaskModal;
