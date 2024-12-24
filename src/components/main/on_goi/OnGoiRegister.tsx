'use client';
import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  Image,
  UploadFile,
  UploadProps,
} from 'antd';
import { FaUser, FaPhone, FaEnvelope, FaIdCard } from 'react-icons/fa';
import { useEventRegistion } from '@/hooks/event/useEventRegister';
import dayjs from 'dayjs';
import Container from '../../Container/container';
import { RcFile } from 'antd/es/upload';
import { PiPlusDuotone } from 'react-icons/pi';
import ContentSection from '../ContentSection';

const OnGoiRegister = ({ ongoiId }: { ongoiId: string }) => {
  const [form] = Form.useForm();
  const { mutate } = useEventRegistion(ongoiId);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [blogData, setBlogData] = useState<any>({});
  const [content, setContent] = useState('');

  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    setFileList(fileList);
    setBlogData({
      ...blogData,
      image: fileList.map((file) => file.originFileObj as RcFile),
      learning_process: content,
    });
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file.originFileObj as RcFile);
    } else {
      setPreviewImage(file.url || file.preview || '');
    }
    setPreviewOpen(true);
  };

  const uploadButton = (
    <div>
      <PiPlusDuotone />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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

    mutate(formattedValues);
  };

  return (
    <Container>
      <div className="mt-6 md:mt-12 p-3 md:p-6 bg-primary-500 text-white rounded-lg shadow-lg">
        <h2 className="text-20 md:text-24 text-center font-bold mb-4">
          Đăng Ký Nhận Ơn Gọi
        </h2>
        <div className="mt-2 md:mt-4">
          <Form
            name="event-register"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            layout="vertical"
            form={form}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
              <Form.Item
                label={<span className="text-white">Hình ảnh chính</span>}
                className="col-span-1 md:col-span-2 lg:col-span-4"
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={() => false}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    alt="Hình ảnh xem trước bài viết"
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                    }}
                    src={previewImage}
                  />
                )}
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Họ và tên đệm</span>}
                name="first_name"
                rules={[
                  { required: true, message: 'Vui lòng nhập họ và tên!' },
                ]}
              >
                <Input
                  prefix={<FaUser className="text-gray-500 mr-2" />}
                  placeholder="Nhập họ và tên"
                  className="border-gray-300 rounded-md"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Tên</span>}
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
                label={<span className="text-white">Số điện thoại</span>}
                name="phone_number"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại!' },
                  {
                    pattern: /^[0-9]+$/,
                    message: 'Số điện thoại không hợp lệ!',
                  },
                ]}
              >
                <Input
                  prefix={<FaPhone className="text-gray-500 mr-2" />}
                  placeholder="Nhập số điện thoại"
                  className="border-gray-300 rounded-md"
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
                  prefix={<FaEnvelope className="text-gray-500 mr-2" />}
                  placeholder="Nhập email"
                  className="border-gray-300 rounded-md"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Ngày sinh</span>}
                name="dob"
                rules={[
                  { required: true, message: 'Vui lòng chọn ngày sinh!' },
                ]}
              >
                <DatePicker format="YYYY-MM-DD" className="w-full" />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Địa Chỉ</span>}
                name="location"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Họ và tên đệm của bố</span>}
                name="dad_first_name"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập họ và tên đệm của bố!',
                  },
                ]}
              >
                <Input placeholder="Nhập họ và tên đệm của bố" />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Tên của bố</span>}
                name="dad_last_name"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên của bố!' },
                ]}
              >
                <Input placeholder="Nhập tên của bố" />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Họ và tên đệm của mẹ</span>}
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
                label={<span className="text-white">Tên của mẹ</span>}
                name="mom_last_name"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên của mẹ!' },
                ]}
              >
                <Input placeholder="Nhập tên của mẹ" />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Giáo Xứ</span>}
                name="parish_hometown"
                rules={[{ required: true, message: 'Vui lòng nhập giáo Xứ!' }]}
              >
                <Input placeholder="Nhập giáo Xứ" />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Tên anh chị em</span>}
                name="brothers_and_sisters_name"
                rules={[
                  { required: true, message: 'Vui lòng nhập tên anh chị em!' },
                ]}
              >
                <Input placeholder="Nhập tên anh chị em" />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-white">Năm sinh của anh chị em</span>
                }
                name="brothers_and_sisters_year"
                rules={[{ required: true, message: 'Vui lòng nhập năm sinh!' }]}
              >
                <DatePicker format="YYYY-MM-DD" className="w-full" />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Ngày rửa tội</span>}
                name="baptism_day"
                rules={[
                  { required: true, message: 'Vui lòng nhập ngày rửa tội!' },
                ]}
              >
                <DatePicker format="YYYY-MM-DD" className="w-full" />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Người đỡ đầu rửa tội</span>}
                name="baptismal_sponsor"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên người đỡ đầu!',
                  },
                ]}
              >
                <Input placeholder="Nhập tên người đỡ đầu" />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Người rửa tội</span>}
                name="pardoner"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên người rửa tội!',
                  },
                ]}
              >
                <Input placeholder="Nhập tên người rửa tội" />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Người rửa tội</span>}
                name="baptism_day_form"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên người rửa tội!',
                  },
                ]}
              >
                <Input placeholder="Nhập tên người rửa tội" />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Nơi Rửa Tội</span>}
                name="baptismal_at"
                rules={[
                  { required: true, message: 'Vui lòng nhập nơi rửa tội!' },
                ]}
              >
                <Input placeholder="Nhập nơi rửa tội" />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-white">
                    Ngày Lần đầu nhận Mình Thánh Chúa
                  </span>
                }
                name="first_communion_day"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập ngày Lần đầu nhận Mình Thánh Chúa!',
                  },
                ]}
              >
                <DatePicker format="YYYY-MM-DD" className="w-full" />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-white">Người đỡ đầu thêm sức</span>
                }
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
                label={<span className="text-white">Cha thêm sức</span>}
                name="confirmation_form"
                rules={[
                  { required: true, message: 'Vui lòng nhập Cha thêm sức!' },
                ]}
              >
                <Input placeholder="Nhập Cha thêm sức" />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Nơi thêm sức</span>}
                name="confirmation_at"
                rules={[
                  { required: true, message: 'Vui lòng nhập nơi thêm sức!' },
                ]}
              >
                <Input placeholder="Nhập nơi thêm sức" />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">Ngày thêm sức</span>}
                name="confirmation_mass"
                rules={[
                  { required: true, message: 'Vui lòng nhập ngày thêm sức!' },
                ]}
              >
                <DatePicker format="YYYY-MM-DD" className="w-full" />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-white">Mã ơn gọi tu sĩ (nếu có)</span>
                }
                name="religious_vocation_id"
              >
                <Input placeholder="Mã ơn gọi tu sĩ (nếu có)" />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-white">Quá trình học giáo lý</span>
                }
                name="learning_process"
                className="col-span-1 md:col-span-2 lg:col-span-4"
              >
                <ContentSection
                  onChange={setContent}
                  initialContent={content}
                />
              </Form.Item>
            </div>

            <Form.Item className="mt-4">
              <Button
                type="primary"
                htmlType="submit"
                className="w-m md:w-auto bg-blue-500 hover:bg-blue-600"
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
