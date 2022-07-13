import { request } from 'umi';

export default {
  state: {
    users: [],
    page: 1,
    userDetail: {
      name: '',
      address: '',
      sex: '',
      domicile: [],
      info: ''
    }
  },

  effects: {
    *fetchUserList(_, { call, put, select }) {
      // 获取state
      const page = yield select((state) => state.user.page)
      // 获取user list
      const res = yield call(request, `http://localhost:7001/api/queryUser?page=${page}`)
      if (res.msg === 'ok') {
        yield put({ type: 'setUsers', users: res.data.rows });
      }
    },
    *destroyUser({ id }, { call }) {
      yield call(request, `http://localhost:7001/api/destroyUser`, {
        method: 'POST',
        data: { id }
      })
    },
    *getUserDetail({ id, list }, { call, put }) {
      const res = yield call(request, `http://localhost:7001/api/show?id=${id}`)
      if (list) {
        yield put({ type: 'setUsers', users: res ? [res] : [] });
      } else {
        yield put({ type: 'setUserDetail', detail: res });
      }
    },
    *editUser(_, { call, select }) {
      const userDetail = yield select((state) => state.user.userDetail)
      yield call(request, `http://localhost:7001/api/updateUser`, {
        method: 'POST',
        data: userDetail
      })
    },
    *createUser(_, { call, select }) {
      const userDetail = yield select((state) => state.user.userDetail)
      yield call(request, `http://localhost:7001/api/createUser`, {
        method: 'POST',
        data: userDetail
      })
    },
  },

  reducers: {
    setPage (state, { page }) {
      return {
        ...state,
        page,
      };
    },
    setUsers(state, { users }) {
      return {
        ...state,
        users,
      };
    },
    setUserDetail(state, { detail }) {
      if (detail) {
        return {
          ...state,
          userDetail: detail
        };
      }
    }
  },
};
