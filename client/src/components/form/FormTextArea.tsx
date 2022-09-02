import React, { useEffect } from "react";
import WarningIcon from "@mui/icons-material/Warning";
import {
  FieldError,
  Path,
  PathValue,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import ReactQuill from "react-quill";

interface FormFieldProps<T> {
  label: string;
  name: Path<T>;
  defaultvalue?: PathValue<T, Path<T>>;
  error?: FieldError;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions;
  setValue?: UseFormSetValue<T>;
  watch?: UseFormWatch<T>;
}

const FormTextArea = <T,>({
  label,
  name,
  defaultvalue,
  error,
  register,
  rules,
  setValue,
  watch,
}: FormFieldProps<T>) => {
  // const [value, setValue] = useState('');

  useEffect(() => {
    register(name, rules);
    if (defaultvalue) {
      setValue(name, defaultvalue);
    }
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue(name, editorState);
  };

  const editorContent = watch(name) as string;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p className="formlabels"> {label} </p>
      <div className="formfieldcontainer" style={{ alignSelf: "center" }}>
        <ReactQuill
          theme="snow"
          style={{ width: "100%", borderRadius: "10px" }}
          value={editorContent ?? ""}
          onChange={onEditorStateChange}
          preserveWhitespace
        />
      </div>
      <p className="errormsg">
        {error && (
          <>
            <WarningIcon sx={{ fontSize: "15px", marginBottom: "2px" }} />{" "}
            {error?.message}
          </>
        )}
      </p>
    </div>
  );
};

export default FormTextArea;
