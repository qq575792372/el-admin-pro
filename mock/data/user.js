const Mock = require("mockjs");
const util = require("../utils");

// 随机手机号码
Mock.Random.extend({
  phone: function() {
    var prefix = [
      "199",
      "132",
      "156",
      "187",
      "188",
      "197",
      "155",
      "156",
      "189"
    ];
    return this.pick(prefix) + Mock.mock(/\d{8}/);
  }
});

// mock生成列表元数据
const mockListData = Mock.mock({
  "list|35": [
    {
      id: "@guid()",
      accountNo: "@phone()",
      realName: "@cname()",
      age: "@integer(10,99)",
      "sex|1": [0, 1, 2], // 0：位置；1：男；2：女
      headUrl: "@image('20x20','头像')",
      birthDay: "@date()",
      email: "@email()",
      "status|1": [0, 1], // 账号状态，0：正常；1：禁用
      createTime: "@now()",
      updateTime: "@now()"
    }
  ]
});

/**
 * 查询分页
 */
const getList = {
  url: "/api/user/getList",
  type: "get",
  response: config => {
    // 获取mock生成的元数据列表
    const list = mockListData.list;
    // 获取查询参数
    const { pageNo, pageSize } = config.query;
    // 获取分页后的列表
    const records = list.filter(
      (item, index) =>
        index >= pageSize * (pageNo - 1) && index < pageSize * pageNo
    );

    // 组装返回的数据结构
    return {
      code: 0,
      data: {
        total: Number(list.length),
        records
      },
      message: "ok",
      timestamp: Date.now()
    };
  }
};

/**
 * 添加
 */
const addUser = {
  url: "api/user/add",
  type: "post",
  response: config => {
    // 获取mock生成的元数据列表
    const list = mockListData.list;
    // 获取传参
    const params = config.body;
    // 添加数据
    list.unshift({
      id: Mock.Random.guid(),
      realName: params.realName,
      age: params.age,
      sex: params.sex,
      birthDay: params.birthDay,
      email: params.email
    });
    // 组装返回的数据结构
    return {
      code: 0,
      data: "添加成功",
      message: "ok",
      timestamp: Date.now()
    };
  }
};

/**
 * 编辑
 */
const updateUser = {
  url: "/api/user/update",
  type: "post",
  response: config => {
    // 获取mock生成的元数据列表
    const list = mockListData.list;
    // 获取传参
    const params = config.body;
    list.some(item => {
      // 修改对应id的用户信息
      if (item.id == params.id) {
        item.realName = params.realName;
        item.age = params.age;
        item.sex = params.sex;
        item.birthDay = params.birthDay;
        item.email = params.email;
        return true;
      }
    });
    // 组装返回的数据结构
    return {
      code: 0,
      data: "修改成功",
      message: "ok",
      timestamp: Date.now()
    };
  }
};

/**
 * 根据id删除
 */
const deleteUser = {
  url: "/api/user/delete",
  type: "get",
  response: config => {
    // 获取mock生成的元数据列表
    const list = mockListData.list;
    // 获取查询参数
    const { id } = config.query;
    // 根据id删除元素
    list.map((item, index) => {
      if (item.id == id) {
        list.splice(index, 1);
      }
    });
    // 组装返回的数据结构
    return {
      code: 0,
      data: "删除成功",
      message: "ok",
      timestamp: Date.now()
    };
  }
};

/**
 * 查询详情
 */
const getDetail = {
  url: "/api/user/getDetail",
  type: "get",
  response: config => {
    // 获取mock生成的元数据列表
    const list = mockListData.list;
    // 获取查询参数
    const { id } = config.query;
    // 获取满足条件的记录
    const records = list.filter(item => item.id == id)[0];
    // 组装返回的数据结构
    return {
      code: 0,
      data: records,
      message: "ok",
      timestamp: Date.now()
    };
  }
};

// export
module.exports = [getList, addUser, updateUser, deleteUser, getDetail];
