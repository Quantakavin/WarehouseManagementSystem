// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import { Path, RegisterOptions, UseFormRegister } from "react-hook-form";
// import styled from "styled-components";
// import useTogglePasword from "../../hooks/useTogglePassword";

// type AllowedInputs = "email" | "password" | "text" | "number";

// const Input = styled.input<{ $password: boolean }>`
//   padding-top: 8px;
//   padding-bottom: 8px;
//   padding-left: 10px;
//   border: 1px solid #d3d3d3;
//   border-radius: ${(props) => (props.$password ? "15px 0 0 15px" : "15px")};
//   flex-grow: ${(props) => (props.$password ? 11 : 1)};
//   color: #0a2540;
// `;

// interface FormFieldProps<T> {
//   label: string;
//   name: Path<T>;
//   defaultvalue?: string;
//   errormsg?: string;
//   type: AllowedInputs;
//   register?: UseFormRegister<T>;
//   rules?: RegisterOptions;
// }

// const FormField = <T,>({
//   label,
//   name,
//   defaultvalue,
//   errormsg,
//   type,
//   register,
//   rules,
// }: FormFieldProps<T>) => {
//   const { toggle, passwordType, showPassword } = useTogglePasword();
//   let field = null;

//   if (type === "password") {
//     field = (
//       <>
//         <Input
//           $password
//           type={passwordType}
//           defaultValue={defaultvalue}
//           {...(register && register(name, rules))}
//         />
//         <div className="passwordicon flexcontainer" onClick={toggle}>
//           {showPassword ? (
//             <VisibilityIcon style={{ color: "#0A2540" }} />
//           ) : (
//             <VisibilityOffIcon style={{ color: "#0A2540" }} />
//           )}
//         </div>
//       </>
//     );
//   } else {
//     field = (
//       <Input
//         $password={false}
//         type={type}
//         defaultValue={defaultvalue}
//         {...(register && register(name, rules))}
//       />
//     );
//   }
//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <p className="formlabels"> {label} </p>
//       <div className="formfieldcontainer" style={{ alignSelf: "center" }}>
//         {field}
//       </div>
//       <p className="errormsg">{errormsg}</p>
//     </div>
//   );
// };

// export default FormField;

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import WarningIcon from "@mui/icons-material/Warning";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField
} from "@mui/material";
import {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister
} from "react-hook-form";
import useTogglePasword from "../../hooks/useTogglePassword";

type AllowedInputs = "email" | "password" | "text" | "number";

interface FormFieldProps<T> {
  label: string;
  name: Path<T>;
  defaultvalue?: string;
  type: AllowedInputs;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions;
  error?: FieldError;
  readOnly?;
}

const inputProps = {
  style: {
    paddingTop: 5,
    paddingBottom: 12,
    paddingLeft: 15,
    paddingRight: 15,
  },
};

const FormField = <T,>({
  label,
  name,
  defaultvalue,
  type,
  register,
  rules,
  error,
  readOnly
}: FormFieldProps<T>) => {
  const { toggle, passwordType, showPassword } = useTogglePasword();

  const field = (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      type={type === "password" ? passwordType : type}
      {...(register && register(name, rules))}
      InputProps={{
        endAdornment: type === "password" && (
          <InputAdornment position="end" sx={{}}>
            <IconButton
              aria-label="toggle password visibility"
              onClick={toggle}
            >
              {showPassword ? (
                <VisibilityOff sx={{ color: "#0A2540" }} />
              ) : (
                <Visibility sx={{ color: "#0A2540" }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    // <OutlinedInput
    //   size="small"
    //   type={type === "password" ? passwordType : type}
    //   className="textfield"
    //   defaultValue={defaultvalue}
    //   // sx={{
    //   //   borderRadius: 3
    //   // }}
    //   inputProps={inputProps}
    //   {...(register && register(name, rules))}

    //   endAdornment={
    //     type === "password" &&
    //     <InputAdornment position="end" sx={{}}>
    //       <IconButton
    //         aria-label="toggle password visibility"
    //         onClick={toggle}
    //       >
    //         {showPassword ? <VisibilityOff sx={{ color: "#0A2540" }} /> : <Visibility sx={{ color: "#0A2540" }} />}
    //       </IconButton>
    //     </InputAdornment>
    //   }
    //   label={label}
    // />
  );

  // if (type === "password") {
  //   field = (
  //     <OutlinedInput
  //           type={passwordType}
  //           className="textfield"
  //           defaultValue = {defaultvalue}
  //           sx={{
  //             borderRadius: 3
  //           }}
  //           inputProps={inputProps}
  //           {...(register && register(name, rules))}

  //           endAdornment={
  //             type==="password" &&
  //             <InputAdornment position="end" sx={{marginBottom: 0.5}}>
  //             <IconButton
  //               aria-label="toggle password visibility"
  //               onClick={toggle}
  //             >
  //               {showPassword ? <VisibilityOff sx={{color: "#0A2540"}}/> : <Visibility sx={{color: "#0A2540"}}/>}
  //             </IconButton>
  //           </InputAdornment>
  //           }
  //           label="Password"
  //         />
  //   );
  // } else {
  //   field = (
  //     <OutlinedInput
  //       className="textfield"
  //       sx={{
  //         borderRadius: 3
  //       }}
  //       type={type}
  //       defaultValue = {defaultvalue}
  //       inputProps={inputProps}
  //       {...(register && register(name, rules))}
  //     />
  //   );
  // }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p className="formlabels"> {label} </p>
      <div className="formfieldcontainer">
        <OutlinedInput
          size="small"
          type={type === "password" ? passwordType : type}
          className="textfield"
          defaultValue={defaultvalue}
          sx={{
            borderRadius: 3,
          }}
          inputProps={inputProps}
          {...(register && register(name, rules))}
          endAdornment={
            type === "password" && (
              <InputAdornment position="end" sx={{ marginBottom: "5px" }}>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggle}
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "#0A2540" }} />
                  ) : (
                    <Visibility sx={{ color: "#0A2540" }} />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }
          label={label}
          readOnly={readOnly}
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

export default FormField;
