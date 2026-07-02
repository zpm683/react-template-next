import {
  PropsWithChildren,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import { Dialog as DialogPrimitive } from "radix-ui";

import { createSingletonFC, withRefFC } from "shared/hooks";
import { isArray, isString } from "shared/utils";

import { Button } from "./button";

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

  const closeDialog = () => {
    setOption({ ...DEF_OPEN_OPTION });
    setOpen(false);
  };

  const body = useMemo(() => {
    if (isString(option.body)) {
      return <p className="text-sm leading-6 text-foreground">{option.body}</p>;
    }

    if (isArray(option.body)) {
      return (
        <div className="space-y-2">
          {option.body.map((msg, index) => (
            <p
              key={`${msg}-${index}`}
              className="text-sm leading-6 text-foreground"
            >
              {msg}
            </p>
          ))}
        </div>
      );
    }

    return option.body;
  }, [option.body]);

  useImperativeHandle(ref, () => ({
    open: (opt) => {
      setOption({ ...DEF_OPEN_OPTION, ...opt });
      setOpen(true);
    },
    close: closeDialog,
  }));

  const handleClickOK = () => {
    option.onOK();
    if (option.autoClose) closeDialog();
  };

  const handleClickNG = () => {
    option.onNG();
    if (option.autoClose) closeDialog();
  };

  if (!open) return null;

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          closeDialog();
        }
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 z-50 w-[300px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <DialogPrimitive.Title className="border-b border-border bg-muted px-6 py-4 text-center text-base font-semibold text-foreground">
            {option.title}
          </DialogPrimitive.Title>
          <div className="min-h-[104px] bg-background px-6 py-4">{body}</div>
          <div className="border-t border-border bg-card p-3">
            <div className="flex justify-around gap-3">
              <Button variant="outline" onClick={handleClickNG}>
                {option.ngText}
              </Button>
              <Button onClick={handleClickOK}>{option.okText}</Button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

const [DialogerProvider, useDialoger] = createSingletonFC(Dialoger);

// eslint-disable-next-line react-refresh/only-export-components
export { DialogerProvider, useDialoger, Dialoger };
