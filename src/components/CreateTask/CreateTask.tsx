"use client";

import { Task, TaskStatus } from "@/server/types";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import { createTaskAction } from './createTaskAction';
import { useNotification } from '@/hooks';

type Values = Omit<Task, "id" | "status">;

type Props = {
  tasks: Task[];
}

export const CreateTask = ({ tasks }: Props) => {
  const [form] = Form.useForm<Values>();
  const [open, setOpen] = useState(false);
  useNotification(tasks);

  const onCreate = async (values: Values) => {
    const dayjs = (await import('dayjs')).default;
    const deadline = dayjs(values.deadline).toDate().toUTCString();
    await createTaskAction({ ...values, status: TaskStatus.OPEN, deadline });

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <PlusCircleOutlined /> Создать задачу
      </Button>
      <Modal
        open={open}
        title="Создать новую задачу"
        okText="Создать"
        cancelText="Отмена"
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="create_task"
            initialValues={{ status: TaskStatus.OPEN }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <FormItem
          name="name"
          label="Название задачи"
          rules={[
            { required: true, message: "Поле обязательно для заполнения" },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="deadline"
          label="Срок выполнения"
          rules={[
            {
              required: true,
              message: "Поле обязательно для заполнения",
            },
          ]}
        >
          <DatePicker format='DD.MM.YYYY' />
        </FormItem>
        <FormItem
          name="points"
          label="Количество баллов"
          rules={[
            { required: true, message: "Поле обязательно для заполнения" },
          ]}
        >
          <Input type="number" min={0} step={1} />
        </FormItem>
      </Modal>
    </div>
  );
};
