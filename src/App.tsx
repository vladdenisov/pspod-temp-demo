import './App.css'
import { Form, Input, Checkbox, Button } from 'antd'
// Тут просто форма, ничего необычного

const LOGIN_URL = '/rest/login'

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type LoginFormData = {
  username: string,
  password: string,
  'remember-me': string
}

function App() {

  const login = async (values: LoginFormData) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      formData.append(key, values[key as keyof LoginFormData]);
    });

    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      body: new URLSearchParams(formData),
    });
    const result = await response.json();
    if (result.status === 'error') {
      alert(result.message)
      return
    }
    console.log('Success:', result);
  }

  return (
    <>
      <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={login}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="remember-me" valuePropName="checked" initialValue={false} wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </>
  )
}

export default App
