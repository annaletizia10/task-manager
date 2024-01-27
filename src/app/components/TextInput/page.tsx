import { TextField } from "@radix-ui/themes";
import React from "react";
import type { CSSProperties, ChangeEvent, FocusEvent } from "react";

type Props = {
  placeholder?: string;
  id?: string;
  value?: string;
  style?: CSSProperties;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<any, Element>) => void;
  error?: string;
};

function TextInput(props: Props) {
  const { placeholder, id, value, onChange, error, onBlur } = props;
  return (
    <div>
      <TextField.Root>
        <TextField.Input
          placeholder={placeholder}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        ></TextField.Input>
      </TextField.Root>
      {Boolean(error) && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default TextInput;
