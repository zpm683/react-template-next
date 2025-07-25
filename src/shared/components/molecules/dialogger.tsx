import {
  PropsWithChildren,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useMemoizedFn } from "ahooks";

import { createSingletonFC, withRefFC } from "shared/hooks";
import { isArray, isString } from "shared/utils";

type OpenOption = {
  title: string;
  body: React.ReactNode | string[];
  onOK: () => void;
  onNG: () => void;
  autoClose: boolean;
  ngText: string;
  okText: string;
};

export type DialogerHandler = {
  open: (option?: Partial<OpenOption>) => void;
  close: () => void;
};

const DEF_OPEN_OPTION: OpenOption = {
  autoClose: true,
  body: null,
  onOK: () => undefined,
  onNG: () => undefined,
  title: "Dialoger",
  okText: "YES",
  ngText: "NO",
};

const Dialoger = withRefFC<DialogerHandler, PropsWithChildren>((ref) => {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState<OpenOption>(DEF_OPEN_OPTION);

  const body = useMemo(() => {
    if (isString(option.body)) {
      return <Typography>{option.body}</Typography>;
    }

    if (isArray(option.body)) {
      return (
        <Box>
          {option.body.map((msg, index) => (
            <Typography key={index}>{msg}</Typography>
          ))}
        </Box>
      );
    }

    return option.body;
  }, [option.body]);

  useImperativeHandle(ref, () => ({
    open: (opt) => {
      setOption({ ...DEF_OPEN_OPTION, ...opt });
      setOpen(true);
    },
    close: () => {
      setOption({ ...DEF_OPEN_OPTION });
      setOpen(false);
    },
  }));

  const handleClickOK = useMemoizedFn(() => {
    option.onOK();
    if (option.autoClose) setOpen(false);
  });

  const handleClickNG = useMemoizedFn(() => {
    option.onNG();
    if (option.autoClose) setOpen(false);
  });

  if (!open) return null;

  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          width: "300px",
          height: "auto",
          overflow: "hidden",
          backgroundColor: "#F4F4F4",
          padding: "0",
          margin: "0",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        },
        "& .MuiDialogContent-root": {
          padding: "0",
        },
      }}
    >
      <DialogTitle
        id="article-dialog-title"
        sx={{ padding: "0", border: "none", textAlign: "center" }}
      >
        {option.title}
      </DialogTitle>
      <DialogContent
        sx={{
          overflowY: "auto",
          backgroundColor: "#FFFFFF",
          fontSize: "14px",
          minHeight: "104px",
        }}
      >
        <Box padding={"12px 24px"}>{body}</Box>
      </DialogContent>
      <DialogActions
        sx={{
          padding: "0",
          width: "100%",
          height: "74px",
          backgroundColor: "#ffffff",
        }}
      >
        <Box
          padding={"12px"}
          display={"flex"}
          alignContent={"center"}
          justifyContent={"space-around"}
          width={"100%"}
          borderTop={"1px solid #F4F4F4"}
          sx={{
            backgroundColor: "#ffffff",
          }}
        >
          <Button variant="contained" onClick={handleClickNG}>
            {option.ngText}
          </Button>
          <Button variant="contained" onClick={handleClickOK}>
            {option.okText}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
});

const [DialogerProvider, useDialoger] = createSingletonFC(Dialoger);

// eslint-disable-next-line react-refresh/only-export-components
export { DialogerProvider, useDialoger, Dialoger };
