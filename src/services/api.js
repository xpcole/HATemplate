import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  console.log(params)
  // return request(`/sysUser/registerUserList?${stringify(params)}`);
  return request('/sysUser/registerUserList', {
    method: 'POST',
    body: {
      // ...params,
      pageNum: '1',
      numPerPage: '10',
    },
  });
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

// export async function fakeChartData() {
//   return request('/api/fake_chart_data');
// }

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  // return request(`/api/fake_list?${stringify(params)}`);
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeAccountLogin(params) {
  return request('/sysUser/sysUserLogin', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
