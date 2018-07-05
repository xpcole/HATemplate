import React, { PureComponent } from 'react';
// import moment from 'moment';
import { connect } from 'dva';
import {
  // List,
  // Card,
  // Row,
  // Col,
  // Radio,
  // Input,
  Button,
  // Icon,
  // Dropdown,s
  // Menu,
  Tabs,
  // Avatar,
  // Button,
  Layout,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BasicList.less';

// const RadioButton = Radio.Button;
// const RadioGroup = Radio.Group;
// const { Search } = Input;
const { Sider, Content } = Layout;
const TabPane = Tabs.TabPane;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class BasicList extends PureComponent {

  state = {
    collapsed: false,
    tabPosition: 'left',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  getRoleTable(){
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    // const { list: { list }, loading } = this.props;

    return (
      <PageHeaderLayout title="角色与权限">
        <div style={{ backgroundColor: "white" }}>
          <Button type="primary">创建角色</Button>
          <Tabs tabPosition={this.state.tabPosition}>
            <TabPane tab="系统管理员系统管理员" key="1">{this.getRoleTable}</TabPane>
            <TabPane tab="客服经理" key="2">客服经理</TabPane>
            <TabPane tab="运营经理" key="3">运营经理</TabPane>
          </Tabs>
        </div>
      </PageHeaderLayout>
    );
  }
}
