import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryAuth() {
  return request('/admin/menu/allTree');
}
