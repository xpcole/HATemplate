import { isUrl } from '../utils/utils';


const menuData = [
  {
    name: '用户管理',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '注册用户管理',
        path: '/user-table-list/list',
      },
    ],
  },
  {
    name: '工单管理',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: '意见反馈',
        path: 'step-form',
      },
      {
        name: '入库申请单列表',
        // authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: '系统管理',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '员工管理',
        path: 'table-list',
      },
      {
        name: '角色与权限',
        path: 'basic-list',
      },
      {
        name: '版本号管理',
        path: 'card-list',
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
      {
        name: '新页面',
        path: 'new',
    },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
