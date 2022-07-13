import { SGLoading, SGMessage } from 'sinogear';
import { utils, constants } from 'sinobest-functions';
// @ts-ignore
import { getDvaApp } from 'umi';

const { tips, store } = utils;
const { STORE_USER_KEY } = constants;

export const dva = {
  config: {
    onError(error) {
      const tipsError = tips.getErrorMsg(error);
      if (tipsError !== 'sg_error_401') {
        SGMessage.msg({ type: 'error', content: tipsError || '服务器发生错误，请稍后再尝试，或联系管理员。', error });
      }

      if (error.extraCode === 'sg_error_401') {
        store.removeItem(STORE_USER_KEY, true);
      }
    },
    onReducer: (r) => (state, action) => {
      // 登出成功后初始化所有models数据
      if (action.type === 'login/logout/@@end' && getDvaApp) {
        const app = getDvaApp();
        const initialState = {};
        /* eslint-disable */
        app._models.forEach((item) => {
          initialState[item.namespace] = item.state;
        });
        return initialState;
      } else {
        return r(state, action);
      }
    }
  },
  plugins: [SGLoading.createLoading({effects: true})]
}
