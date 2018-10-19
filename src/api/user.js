import request from '@/utils/request';
import { stringify } from 'qs';

export async function login(params) {
  return request(`/auth/oauth/token?${stringify(params)}`);
}

export async function queryCurrentUser() {
  return request(`/admin/user/info`);
}

export async function queryUserMenu() {
  return request('/admin/menu/userMenu');
}

export async function queryUserPage(params) {
  return request(`/admin/user/userPage?${stringify(params)}`);
}

export async function deleteUserById(id) {
  return request(`/admin/user/${id}`, {
    method: 'DELETE'
  });
}

export async function queryDetailUserById(id) {
  return request(`/admin/user/${id}`);
}

export async function editUser({params, method}) {
  return request(`/admin/user`, {
    method,
    data: params
  })
}