import React, { Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import {
  Button,
  Icon,
  // Row,
  // Col,
  Card,
  Badge,
  Table,
  Form,
} from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './AdvancedProfile.less';

const { Description } = DescriptionList;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;
// const isLogin = "禁止登录";

const action = (
  <Fragment>
    <Button type="primary">禁止登录</Button>
  </Fragment>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="真实姓名">张三</Description>
    <Description term="性别">男</Description>
    <Description term="手机号">133 3333 3333</Description>
    <Description term="绑定社交账号">
      <a href="">12421</a>
    </Description>
    <Description term="最后访问时间">2017-01-10 13:00</Description>
    <Description term="账号状态">正常</Description>
  </DescriptionList>
);

const tabList = [
  {
    key: 'tab1',
    tab: '详细信息',
  },
  {
    key: 'tab2',
    tab: '其他信息',
  },
  {
    key: 'tab3',
    tab: '行为日志',
  },
  {
    key: 'tab4',
    tab: '登录日志',
  },
];

const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'agree' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="error" text="驳回" />
      ),
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))

@Form.create()
class Step2 extends React.PureComponent {

  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchAdvanced',
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {
    // const { stepDirection } = this.state;
    const { profile, loading } = this.props;
    const { advancedOperation2, advancedOperation3 } = profile;
    const contentList = {
      tab1: (
        <Card title="详细信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="身份证号">51000000000000000X</Description>
            <Description term="生日">2000-10-01</Description>
          </DescriptionList>
          <DescriptionList style={{ marginBottom: 24 }} title="社交账号">
            <Description term="微信昵称">乌莉莉</Description>
            <Description term="数据更新时间">2017-10-01 12:00</Description>
            <Description term="QQ 昵称">-</Description>
            <Description term="该数据更新时间">2017-08-08</Description>
            <Description term="微博昵称">-</Description>
            <Description term="该数据更新时间">2017-08-08</Description>
          </DescriptionList>

        </Card>
      ),
      tab2: (
        <Card title="其他信息" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.noData}>
            <Icon type="frown-o" />暂无数据
          </div>
        </Card>
      ),
      tab3: (
        <Card title="行为日志" style={{ marginBottom: 24 }} bordered={false}>
          <Table
            pagination={false}
            loading={loading}
            dataSource={advancedOperation3}
            columns={columns}
          />
        </Card>

      ),
      tab4: (
        <Card title="行为日志" style={{ marginBottom: 24 }} bordered={false}>
          <Table
            pagination={false}
            loading={loading}
            dataSource={advancedOperation2}
            columns={columns}
          />
        </Card>
      ),
    };
    return (
      <PageHeaderLayout
        title="U180531194532y7uir"
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        action={action}
        content={description}
        tabList={tabList}
        onTabChange={this.onOperationTabChange}
      >
        {contentList[this.state.operationkey]}
      </PageHeaderLayout>
    );

  }
}

export default connect(({ form, loading }) => ({
  submitting: loading.effects['form/submitStepForm'],
  data: form.step,
}))(Step2);
