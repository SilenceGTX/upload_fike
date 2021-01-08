import React, { useState, useEffect } from 'react';
import { 
    Upload, 
    Form, 
    Button, 
    Input, 
    Space,
    message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import UploadSvc from "./UploadSvc";

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}; //表单的整体布局
const tailLayout = {
    wrapperCol: { offset: 16, span: 8 },
}; //取消和确定按钮的布局

const { TextArea } = Input;

export default function UploadFile(props) {
    const [form] = Form.useForm(); //用于之后取数据
    const [fileList, setFileList] = useState(null); //文件列表
    const [fileName, setFileName] = useState(null); //文件名
    const [extName, setExtName] = useState(null); //扩展名
    const [uploadName, setUploadName] = useState(null); //文件全名（包含扩展名）
    const [uploading, setUploading] = useState(false); //是否在上传中

    console.log(uploadName)

    const handleSubmit = values => {
        //处理表单提交
        console.log(values)
        props.handleCancel();
    }

    const handleChange = (info) => {
        //处理文件名一栏根据上传文件改变自动变化
        let files = [...info.fileList];
        files = files.slice(-1);
        setFileList(files);

        if (files && files.length > 0) {
            const [fname, fextname] =  files[0]["name"].split(/\.(?=[^\.]+$)/); //分割文件名
            setFileName(fname); //设置文件名
            setExtName(fextname); //设置扩展名
            setUploadName(files[0]["name"]); //设置全名
        }
    }

    const handleUpload = () => {
        //处理手动上传
        const formData = new FormData();
        if (fileList && fileName !== "") {
            let file = fileList[0]
            formData.append('file', file.originFileObj, uploadName); //一定要用file.originFileObj！！！
            setUploading(true) //设置状态为上传中

            UploadSvc.uploadDataset(formData)
            .then(response => {
                message.success(`文件 ${uploadName} 已上传`, 2) //成功的提示消息将持续2秒
                setUploading(false) //重置上传状态
                form.setFieldsValue({
                    file: true //满足data的required: true
                })
            })
        } 
    }

    useEffect(() => {
        //实时更新
        form.setFieldsValue({
            name: fileName,
        });
    }, [fileName]);

    return (
        <>
            <Form.Provider
            onFormChange={
                () => uploadName && setUploadName(form.getFieldValue('name') + '.' + extName)
            }>
                <Form 
                {...layout}
                form={form}
                name="upload_file"
                onFinish={handleSubmit}>

                    <Form.Item
                    label="文件名称"
                    name="name"
                    rules={[{ required: true,
                        message: "请输入文件名" }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item
                    label="备注"
                    name="desc"
                    rules={[{ required: false,
                        message: "请输入备注" }]}>
                        <TextArea rows={4}/>
                    </Form.Item>

                    <Form.Item
                    label="上传文件"
                    name="file"
                    rules={[{ required: true,
                        message: "请上传文件" }]}>
                        <Upload
                        onChange={handleChange}
                        beforeUpload={file => {
                            fileList && setFileList([...fileList, file])
                            return false;
                        }}
                        fileList={fileList}>
                            <Button icon={<UploadOutlined />}>开始上传</Button>
                        </Upload>
                        <Button
                        type="primary"
                        onClick={handleUpload}
                        disabled={fileList === null || fileList.length === 0}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                        >
                        {uploading ? "上传中..." : "开始上传"}
                        </Button>
                    </Form.Item>

                    <Form.Item 
                    {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                确认
                            </Button>
                            <Button onClick={props.handleCancel}>
                                取消
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Form.Provider>
        </>
    )
}