'use client'; // Ensures this is a client component

import React from 'react';
import { Form, Input, Button, DatePicker, Upload } from 'antd';
import { FaUser, FaPhone, FaEnvelope, FaIdCard } from 'react-icons/fa'; // React Icons
import { UploadOutlined } from '@ant-design/icons';
import { useEventRegistion } from '@/hooks/event/useEventRegister';
import dayjs from 'dayjs';
import Container from '../../Container/container';

const OnGoiRegister = ({ eventId }: { eventId: string }) => {
  const [form] = Form.useForm();
  const { mutate } = useEventRegistion(eventId);

  const onFinish = (values: any) => {
    const formattedValues = {
      ...values,
      baptism_day:
        values.baptism_day && dayjs(values.dob).isValid()
          ? dayjs(values.dob).format('YYYY-MM-DD')
          : null,
      confirmation_mass:
        values.confirmation_mass && dayjs(values.dob).isValid()
          ? dayjs(values.dob).format('YYYY-MM-DD')
          : null,
      dob:
        values.dob && dayjs(values.dob).isValid()
          ? dayjs(values.dob).format('YYYY-MM-DD')
          : null,
      first_communion_day:
        values.first_communion_day && dayjs(values.dob).isValid()
          ? dayjs(values.dob).format('YYYY-MM-DD')
          : null,
      brothers_and_sisters_year:
        values.brothers_and_sisters_year &&
        dayjs(values.brothers_and_sisters_year).isValid()
          ? dayjs(values.brothers_and_sisters_year).format('YYYY-MM-DD')
          : null,
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
            <Form.Item label="Hình ảnh" name="image" valuePropName="fileList">
              <Upload listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Tải lên</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Họ và tên đệm"
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
            <Form.Item
              label="Ngày sinh"
              name="dob"
              rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
            >
              <DatePicker format="YYYY-MM-DD" className="w-full" />
            </Form.Item>
            <Form.Item
              label="Địa Chỉ"
              name="location"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
            <Form.Item
              label="Họ và tên đệm của bố"
              name="dad_first_name"
              rules={[
                { required: true, message: 'Vui lòng nhập tên người đỡ đầu!' },
              ]}
            >
              <Input placeholder="Nhập tên người đỡ đầu" />
            </Form.Item>
            <Form.Item
              label="Tên của bố "
              name="dad_last_name"
              rules={[
                { required: true, message: 'Vui lòng nhập tên người đỡ đầu!' },
              ]}
            >
              <Input placeholder="Nhập tên người đỡ đầu" />
            </Form.Item>
            <Form.Item
              label="Họ và tên đệm của mẹ"
              name="mom_first_name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ và tên đệm của mẹ!',
                },
              ]}
            >
              <Input placeholder="Nhập họ và tên đệm của mẹ" />
            </Form.Item>
            <Form.Item
              label="Tên của mẹ"
              name="mom_last_name"
              rules={[{ required: true, message: 'Vui lòng nhập tên của mẹ!' }]}
            >
              <Input placeholder="Nhập tên của mẹ" />
            </Form.Item>
            <Form.Item
              label="Giáo Xứ"
              name="parish_hometown"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập giáo Xứ!',
                },
              ]}
            >
              <Input placeholder="Nhập giáo Xứ!" />
            </Form.Item>
            <Form.Item
              label="Tên anh chị em"
              name="brothers_and_sisters_name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên anh chị em!',
                },
              ]}
            >
              <Input placeholder="Nhập tên anh chị em" />
            </Form.Item>
            <Form.Item
              label="năm sinh của anh chị em"
              name="brothers_and_sisters_year"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập năm sinh!',
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" className="w-full" />
            </Form.Item>
            <Form.Item
              label="Ngày rửa tội"
              name="baptism_day"
              rules={[{ required: true, message: 'Vui lòng ngày rửa tội!' }]}
            >
              <DatePicker format="YYYY-MM-DD" className="w-full" />
            </Form.Item>
            <Form.Item
              label="Người đỡ đầu rửa tội"
              name="baptismal_sponsor"
              rules={[
                { required: true, message: 'Vui lòng nhập tên người đỡ đầu!' },
              ]}
            >
              <Input placeholder="Nhập tên người đỡ đầu" />
            </Form.Item>
            <Form.Item
              label="Người rửa tội"
              name="pardoner"
              rules={[
                { required: true, message: 'Vui lòng nhập tên người rửa tội!' },
              ]}
            >
              <Input placeholder="Nhập tên người đỡ đầu" />
            </Form.Item>
            <Form.Item
              label="Người rửa tội"
              name="baptism_day_form"
              rules={[
                { required: true, message: 'Vui lòng nhập tên người rửa tội!' },
              ]}
            >
              <Input placeholder="Nhập tên người đỡ đầu" />
            </Form.Item>
            <Form.Item
              label="Nơi Rửa Tội"
              name="baptismal_at"
              rules={[
                { required: true, message: 'Vui lòng nhập tên người đỡ đầu!' },
              ]}
            >
              <Input placeholder="Nhập tên người đỡ đầu" />
            </Form.Item>
            <Form.Item
              label="Ngày Lần đầu nhận Mình Thánh Chúa"
              name="first_communion_day"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng ngày Lần đầu nhận Mình Thánh Chúa!',
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" className="w-full" />
            </Form.Item>

            <Form.Item
              label="Người đỡ đầu thêm sức"
              name="confirmation_sponsor"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập người đỡ đầu thêm sức!',
                },
              ]}
            >
              <Input placeholder="Nhập người đỡ đầu thêm sức" />
            </Form.Item>
            <Form.Item
              label="Cha thêm sức"
              name="confirmation_form"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập Cha thêm sức!',
                },
              ]}
            >
              <Input placeholder="Nhập Cha thêm sức" />
            </Form.Item>
            <Form.Item
              label="Nơi thêm sức"
              name="confirmation_at"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập nơi thêm sức!',
                },
              ]}
            >
              <Input placeholder="Nhập nơi thêm sức thêm sức" />
            </Form.Item>
            <Form.Item
              label="Ngày thêm sức"
              name="confirmation_mass"
              rules={[{ required: true, message: 'Vui lòng ngày thêm sức!' }]}
            >
              <DatePicker format="YYYY-MM-DD" className="w-full" />
            </Form.Item>

            <Form.Item label="Quá trình học giáo lý" name="learning_process">
              <Input placeholder="Quá trình học giáo lý" />
            </Form.Item>

            <Form.Item
              label="Mã ơn gọi tu sĩ (nếu có)"
              name="religious_vocation_id"
            >
              <Input placeholder="Mã ơn gọi tu sĩ (nếu có)" />
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

export default OnGoiRegister;
