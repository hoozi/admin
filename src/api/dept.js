import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryDeptTree() {
  return request('/admin/dept/tree');
}