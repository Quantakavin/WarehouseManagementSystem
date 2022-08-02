import WarningIcon from "@mui/icons-material/Warning";
import { useEffect } from "react";
import {
  FieldError,
  Path,
  PathValue,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
import ReactQuill from "react-quill";
import styled from "styled-components";

const Input = styled.textarea`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 15px;
  flex-grow: 1;
  color: #0a2540;
`;

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
  //const [value, setValue] = useState('');

  useEffect(() => {
    register(name, rules);
    if (defaultvalue) {
      setValue(name, defaultvalue);
    }
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue(name, editorState);
  };
  console.log("default is " + defaultvalue);

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
        {/* <Input
          {...(register && register(name, rules))}
          defaultValue={defaultvalue}
          rows={5}
        ></Input> */}
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
