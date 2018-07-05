import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  // Icon,
  Button,
  alert,
  // Modal,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import styles from './UserTableList.less';

const FormItem = Form.Item;
const { Search } = Input;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class Step1 extends PureComponent {
  state = {
    // modalVisible: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      // total: pagination.total,
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };

  handleExport = () => {
    alert('export')
  }

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = () => {

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };

  renderSimpleForm() {
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={24} sm={24}>
            <span className={styles.submitButtons}>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleExport}>
                输出
              </Button>
              <Search className={styles.extraContentSearch} placeholder="搜索姓名或手机号" onSearch={this.handleSearch} />
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const { rule: { data }, loading } = this.props;
    const { selectedRows } = this.state;
    const { form, dispatch } = this.props;
    const { validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'form/saveStepFormData',
            payload: values,
          });
          dispatch(routerRedux.push('/dashboard/user-table-list/detail'));
        }
      });
    };


    const columns = [
      {
        title: '用户编号',
        dataIndex: 'id',
      },
      {
        title: '真是姓名',
        dataIndex: 'nickname',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
      },
      {
        title: '最后访问时间',
        dataIndex: 'updatetime',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a onClick={onValidateForm}>详情</a>
          </Fragment>
        ),
      },
    ];
    return (
      <PageHeaderLayout
        title="注册用户列表"
      >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}
