import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryRoleByDeptId(id) {
  return request(`/admin/role/roleList/${id}`)
}

export async function queryRolePage(params) {
  return request(`/admin/role/rolePage?${stringify(params)}`);
}

export async function queryDetailRoleById(id) {
  return request(`/admin/role/${id}`);
}

export async function deleteRoleById(id) {
  return request(`/admin/role/${id}`, {
    method: 'DELETE'
  });
}

export async function editRole({params, method}) {
  return request(`/admin/role`, {
    method,
    data: params
  })
}

export async function setAuth2Role(params) {
  return request(`/admin/role/roleMenuUpd?${decodeURIComponent(stringify(params))}`, {
    method: 'PUT'
  })
}

export async function queryAuthByCode(code) {
  return request(`/admin/menu/roleTree/${code}`)
}