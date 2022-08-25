import styled from "@emotion/styled";
import { indigo, grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";

export const CustomizedTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: indigo[900],
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: indigo[900],
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: grey[400],
    },
    "&:hover fieldset": {
      borderColor: indigo[900],
    },
    "&.Mui-focused fieldset": {
      borderColor: indigo[900],
    },
  },
});
