import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd';

import './App.css';
import axios from 'axios';

function isTouchAble(){ 
  if(navigator.userAgent.indexOf('Mobile') !== -1){ return 1; }
  else{ return 0; } 
}


class NormalLoginForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    let value;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      value = values;
    });
    try {
      const device = isTouchAble();
      const result = await axios.post('users/login/', {
        username: value.username,
        password: value.password,
        device,
      })
      if (!!result.data.token && result.data.token.length > 0) {
        localStorage.setItem('token', result.data.token);
        this.props.history.push('/');
      }
    } catch(error) {
      console.log(error)
      alert(error.response.data.message)
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Form onSubmit={this.handleSubmit} className="login-form" style={{margin: '16px', textAlign: 'center'}}>
          <h1>LogIn</h1>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            
            
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <br />
            <Link className="login-form-forgot" to="">
              Forgot password&nbsp;
            </Link>
            Or <Link to="/signin">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;