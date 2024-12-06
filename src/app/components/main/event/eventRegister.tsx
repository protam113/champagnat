'use client'; // Ensures this is a client component

import React from 'react';
import { Form, Input, Button } from 'antd';
import { FaUser, FaPhone, FaEnvelope, FaIdCard } from 'react-icons/fa'; // React Icons
import Container from '../blog/container';
import { useEventRegistion } from '@/hooks/event/useEventRegister';

const EventRegister = ({ eventId }: { eventId: string }) => {
  const [form] = Form.useForm();
  const { mutate } = useEventRegistion(eventId);

  const onFinish = (values: any) => {
    const formattedValues = {
      ...values,
    };
    // Gửi yêu cầu đăng ký sự kiện
    mutate(formattedValues);
  };

  return (
    <Container>
      <div className="mt-12 p-6 bg-primary-500 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Đăng ký nhận bản tin</h2>
        <p className="mt-4 text-sm">
          Nhận thông báo về các bài viết mới nhất và cập nhật blog!
        </p>
        <div className="mt-4 flex">
          <Form
            name="event-register"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            layout="vertical"
            form={form}
          >
            <Form.Item
              label="Họ và tên"
              name="first_name"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
            >
              <Input
                prefix={<FaUser className="text-gray-500 mr-2" />}
                placeholder="Nhập họ và tên"
                className="border-gray-300 rounded-md"
              />
            </Form.Item>
            <Form.Item
              label="Tên"
              name="last_name"
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <Input
                prefix={<FaIdCard className="text-gray-500 mr-2" />}
                placeholder="Nhập tên"
                className="border-gray-300 rounded-md"
              />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone_number"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                { pattern: /^[0-9]+$/, message: 'Số điện thoại không hợp lệ!' },
              ]}
            >
              <Input
                prefix={<FaPhone className="text-gray-500 mr-2" />}
                placeholder="Nhập số điện thoại"
                className="border-gray-300 rounded-md"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input
                prefix={<FaEnvelope className="text-gray-500 mr-2" />}
                placeholder="Nhập email"
                className="border-gray-300 rounded-md"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Đăng Ký
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default EventRegister;
