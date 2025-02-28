import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, MenuItemProps } from "@mui/material";
import type { Meta } from "@storybook/react";
import { z } from "zod";

import { Form, FormItem } from ".";
import { CheckboxProps, RadioProps } from "../../atoms";

const meta = {
  title: "organisms/Form",
  component: Form,
} satisfies Meta<typeof Form>;

export default meta;

const schema = z.object({
  kana: z.string().nullable(),
  name: z
    .string()
    .min(1, { message: "必須項目" })
    .max(8, { message: "最大値超過" }),
  age: z
    .string()
    .min(1, { message: "必須項目" })
    .max(3, { message: "最大値超過" }),
  comment: z.string().optional(),
  sex: z.string().min(1, { message: "必須項目" }),
  type: z.string().min(1, { message: "必須項目" }),
  isFirst: z.boolean(),
  interest: z.string().array(),
  date: z
    .string()
    .nullable()
    .refine((date) => date !== null, "必須項目"),
});

type Inputs = z.infer<typeof schema>;

const formKey = schema.keyof().Values;

const defaultValue: Inputs = {
  kana: "",
  name: "",
  age: "",
  comment: undefined,
  sex: "2",
  type: "A",
  isFirst: true,
  interest: ["1", "2"],
  date: "",
};

const SEX_RADIOS: RadioProps[] = [
  { value: "1", children: "男" },
  { value: "2", children: "女" },
];

const TYPE_SELECTS: MenuItemProps[] = [
  { value: "A", children: "院内" },
  { value: "B", children: "院外" },
];

const CHECKBOXS: CheckboxProps[] = [
  { value: "1", children: "美味しいものを食べる" },
  { value: "2", children: "ゲームをやる" },
  { value: "3", children: "寝る" },
];

export const Basic = () => {
  const form = useForm({
    defaultValues: defaultValue,
    resolver: zodResolver(schema),
  });

  // 提交事件回调
  const handleSuccess: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  // 校验错误事件回调
  const handleError: SubmitErrorHandler<Inputs> = (err) => {
    console.warn(err);
  };

  return (
    <Form
      form={form}
      onSuccess={handleSuccess}
      onError={handleError}
      display="flex"
      flexDirection="column"
      width="50%"
      alignWidth={170}
    >
      <FormItem.TextField
        name={formKey.kana}
        label="カタカナ"
        maxLength={6}
        inputTypes={["katakana"]}
      />
      <FormItem.TextField name={formKey.name} label="姓名" required />
      <FormItem.TextField
        name={formKey.age}
        label="年齢"
        required
        maxLength={3}
        inputTypes={["number"]}
      />
      <br />
      <FormItem.RadioGroup
        label="性別"
        name={formKey.sex}
        options={SEX_RADIOS}
        required
      />
      <br />
      <FormItem.Select
        label="種別"
        name={formKey.type}
        options={TYPE_SELECTS}
      />
      <br />
      <FormItem.Checkbox label="状況" name={formKey.isFirst}>
        初めて？
      </FormItem.Checkbox>
      <br />
      <FormItem.CheckboxGroup
        label="趣味"
        name={formKey.interest}
        options={CHECKBOXS}
      />
      <br />
      <FormItem.DatePicker label="生年月日" name={formKey.date} />
      <FormItem.TextField name={formKey.comment} label="コメント" multiline />
      <Button type="submit">確定</Button>
    </Form>
  );
};
