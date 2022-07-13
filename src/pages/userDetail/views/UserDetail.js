import { useState, useEffect } from 'react'
import { Input, Select, Checkbox, Space, Button, Upload, Avatar, message } from 'antd'
import { SGForm, EngineRadio } from 'sinogear';
import { UserOutlined } from '@ant-design/icons';
const { Option } = Select
import './UserDetail.less'
import { history, useSelector, useDispatch } from 'umi';

const RecordPage = () => {
  const dispatch = useDispatch();
  const { userDetail = {} } = useSelector((state) => ({
    userDetail: state.user?.userDetail,
  }));

  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (location.search) {
      dispatch({
        type: 'user/getUserDetail',
        id: location.search.split('=')[1]
      })
    }
  }, [])

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (info) => {
    getBase64(info.file.originFileObj, url => {
      setImageUrl(url);
    });
  };

  const save = () => {
    if (userDetail.id) {
      // editUser
      dispatch({
        type: 'user/editUser',
      }).then(() => {
        dispatch({
          type: 'user/getUserDetail',
          id: userDetail.id
        })
        message.success('修改成功');
      })
    } else {
      // create
      dispatch({
        type: 'user/createUser',
      }).then(() => {
        message.success('创建成功');
        history.push('/')
      })
    }
  }

  const handleInput = (value, key) => {
    dispatch({
      type: 'user/setUserDetail',
      detail: {
        ...userDetail,
        [key]: value
      }
    })
  }

  return (
    <div className='user-detail'>
      <h2>{userDetail.id ? '个人信息详情' : '新建用户'}</h2>

      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        onChange={handleChange}
      >
        {imageUrl ? <Avatar size={64} src={imageUrl} /> : <Avatar size={64} icon={<UserOutlined />} />}
      </Upload>

      <SGForm
        style={{ width: '400px' }}
        form={form}
      >
        <SGForm.Item label="姓名" required rules={[{ required: true }]}>
          <Input value={userDetail.name} placeholder="姓名" onInput={({ target }) => { handleInput(target.value, 'name') }} />
        </SGForm.Item>
        <SGForm.Item label="身份ID" required rules={[{ required: true }]}>
          <Input value={userDetail.user_id} placeholder="身份ID" onInput={({ target }) => { handleInput(target.value, 'user_id') }} />
        </SGForm.Item>
        <SGForm.Item label="角色" required rules={[{ required: true }]}>
          <Input value={userDetail.role} placeholder="角色" onInput={({ target }) => { handleInput(target.value, 'role') }} />
        </SGForm.Item>
        <SGForm.Item label="省份" required>
          <Select key={userDetail.address} defaultValue={userDetail.address} onChange={(value) => { handleInput(value, 'address') }}>
            <Option value="广东省">广东省</Option>
            <Option value="上海">上海</Option>
          </Select>
        </SGForm.Item>
        <SGForm.Item label="性别">
          <EngineRadio.Group key={userDetail.sex} defaultValue={userDetail.sex} onChange={({ target }) => { handleInput(target.value, 'sex') }}>
            <EngineRadio value="女">女</EngineRadio>
            <EngineRadio value="男">男</EngineRadio>
          </EngineRadio.Group>
        </SGForm.Item>
        <SGForm.Item label="居住地">
          <Checkbox.Group key={userDetail.domicile} defaultValue={userDetail.domicile} onChange={(value) => { handleInput(value, 'domicile') }}>
            <Checkbox value="广州" style={{ lineHeight: '32px' }}>广州</Checkbox>
            <Checkbox value="深圳" style={{ lineHeight: '32px' }}>深圳</Checkbox>
          </Checkbox.Group>
        </SGForm.Item>
        <SGForm.Item label="主要技能">
          <Checkbox.Group key={userDetail.tags} defaultValue={userDetail.tags} onChange={(value) => { handleInput(value, 'tags') }}>
            <Checkbox value="HTML5" style={{ lineHeight: '32px' }}>HTML5</Checkbox>
            <Checkbox value="ES6" style={{ lineHeight: '32px' }}>ES6</Checkbox>
            <Checkbox value="CSS3" style={{ lineHeight: '32px' }}>CSS3</Checkbox>
          </Checkbox.Group>
        </SGForm.Item>
        <SGForm.Item label="备注">
          <Input.TextArea value={userDetail.info} placeholder="备注" onInput={({ target }) => { handleInput(target.value, 'info') }} />
        </SGForm.Item>
        <SGForm.Item>
          <Space>
            <Button type="primary" onClick={save}>{userDetail.id ? '保存' : '创建'}</Button>
            <Button type="ghost" onClick={() => {
              history.push('/')
            }}>取消</Button>
          </Space>
        </SGForm.Item>
      </SGForm>
    </div>
  );
};

export default RecordPage
