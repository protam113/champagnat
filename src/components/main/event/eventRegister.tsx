'use client'; // Ensures this is a client component

import React from 'react';
import { Form, Input, Button } from 'antd';
import { FaUser, FaPhone, FaEnvelope, FaIdCard } from 'react-icons/fa'; // React Icons
import { useEventRegistion } from '@/hooks/event/useEventRegister';
import Container from '../../Container/container';

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
      <div className="mt-12 p-8 bg-primary-500  text-white rounded-lg  max-w-xl mx-auto">
        <h2 className="text-24 font-bold text-center">Đăng Ký Sự Kiện</h2>
        <div className="mt-6 text-white">
          <Form
            name="event-register"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            layout="vertical"
            form={form}
          >
            <Form.Item
              label={<span className="text-white">Họ và tên</span>}
              name="first_name"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
            >
              <Input
                prefix={<FaUser className="text-gray-400 mr-3" />}
                placeholder="Nhập họ và tên"
                className="border-gray-300 rounded-md p-3"
              />
            </Form.Item>
            <Form.Item
              label={<span className="text-white">Tên</span>}
              name="last_name"
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <Input
                prefix={<FaIdCard className="text-gray-400 mr-3" />}
                placeholder="Nhập tên"
                className="border-gray-300 rounded-md p-3"
              />
            </Form.Item>
            <Form.Item
              label={<span className="text-white">Số điện thoại</span>}
              name="phone_number"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                { pattern: /^[0-9]+$/, message: 'Số điện thoại không hợp lệ!' },
              ]}
            >
              <Input
                prefix={<FaPhone className="text-gray-400 mr-3" />}
                placeholder="Nhập số điện thoại"
                className="border-gray-300 rounded-md p-3"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Email</span>}
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' },
              ]}
            >
              <Input
                prefix={<FaEnvelope className="text-gray-400 mr-3" />}
                placeholder="Nhập email"
                className="border-gray-300 rounded-md p-3"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-m bg-blue-600 hover:bg-blue-700 transition-all duration-300 p-3 rounded-md text-white font-semibold"
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
