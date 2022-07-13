import { Input, Button, Checkbox, Space, Select, Popconfirm, message } from 'antd'
import { SGCommonTable, SGForm } from 'sinogear';
const { Option } = Select;
import { useEffect, useState } from 'react'
import './HomePage.less'
import { history, useSelector, useDispatch } from 'umi';

const UserPage = () => {
  const dispatch = useDispatch();
  const { user = {} } = useSelector((state) => ({
    user: state.user
  }));

  const [form] = SGForm.useForm();
  const [id, setId] = useState('');
  const [inputPage, setInputPage] = useState('');

  const fetchUserList = () => {
    dispatch({
      type: 'user/fetchUserList',
    })
  }

  useEffect(() => {
    fetchUserList()
  }, [])

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '身份id',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '主要技能',
      dataIndex: 'tags',
      key: 'tags',
      render: (text) => (
        JSON.parse(text || '[]').map((t, i) => (
          <span key={i} style={{ margin: '0 8px 0 0' }}>{t}</span>
        ))
      ),
    },
    {
      title: '操作',
      dataIndex: 'tags',
      key: 'tags',
      render: (text, record) => (
        <Space>
          <Button type='primary' onClick={() => {
            history.push(`/userDetail?id=${record.id}`)
          }}>查看/修改</Button>
          <Popconfirm
            placement="topLeft"
            title="删除？"
            onConfirm={() => {
              dispatch({
                type: 'user/destroyUser',
                id: record.id
              }).then(() => {
                fetchUserList()
                message.success('删除成功');
              })
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type='primary'>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const search = () => {
    dispatch({
      type: 'user/getUserDetail',
      id,
      list: true
    })
  }

  return (
    <div className='user-list'>
      <SGForm
        layout="inline"
        form={form}
      >
        <SGForm.Item label="ID">
          <Input value={id} placeholder="ID" onInput={({ target }) => { setId(target.value) }} />
        </SGForm.Item>
        <SGForm.Item label="姓名">
          <Input placeholder="姓名" />
        </SGForm.Item>
        <SGForm.Item label="岗位">
          <Select defaultValue="前端开发工程师">
            <Option value="前端开发工程师">前端开发工程师</Option>
            <Option value="后端开发工程师">后端开发工程师</Option>
          </Select>
        </SGForm.Item>
        <SGForm.Item label="所在区域">
          <Checkbox.Group>
            <Checkbox value="A" style={{ lineHeight: '32px' }}>广州</Checkbox>
            <Checkbox value="B" style={{ lineHeight: '32px' }}>深圳</Checkbox>
          </Checkbox.Group>
        </SGForm.Item>
        <SGForm.Item>
          <Space>
            <Button type="primary" onClick={search}>查询</Button>
            <Button type="ghost" onClick={() => {
              setId('')
              fetchUserList()
            }}>重置</Button>
          </Space>
        </SGForm.Item>
      </SGForm>

      <Button style={{ margin: '8px 0' }} type='primary' onClick={() => {
        history.push.push(`/userDetail`)
      }}>新增</Button>

      <SGCommonTable dataSource={user.users} columns={columns} pagination={false} />

      <Space className='pagination'>
        <span>共3页</span> / <span>当前{user.page}页</span>
        <Input style={{ width: '80px' }} value={inputPage} onInput={({ target }) => { setInputPage(target.value) }} placeholder='跳转' onKeyUp={({ code }) => {
          if (code === "Enter") {
            dispatch({
              type: 'user/setPage',
              page: Number(inputPage || 1)
            })
            fetchUserList()
          }
        }}></Input>
        <Button disabled={user.page === 1} onClick={() => {
          dispatch({
            type: 'user/setPage',
            page: --user.page
          })
          fetchUserList()
        }}>上一页</Button>
        <Button onClick={() => {
          dispatch({
            type: 'user/setPage',
            page: ++user.page
          })
          fetchUserList()
        }}>下一页</Button>
      </Space>

    </div>
  );
};
export default UserPage
