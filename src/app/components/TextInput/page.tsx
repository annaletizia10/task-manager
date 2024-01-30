import React from "react";
import type { CSSProperties, ChangeEvent, FocusEvent } from "react";

import { TextField } from "@radix-ui/themes";

import "./styles.css";

export default function TextInput({
  placeholder,
  id,
  value,
  onChange,
  error,
  onBlur,
}: {
  placeholder?: string;
  id?: string;
  value?: string;
  style?: CSSProperties;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<any, Element>) => void;
  error?: string;
}) {
  return (
    <div>
      <TextField.Root style={{ padding: "5px" }}>
        <TextField.Input
          placeholder={placeholder}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
      </TextField.Root>
      <p className="error-message">{error ? error : ""}</p>
    </div>
  );
}
