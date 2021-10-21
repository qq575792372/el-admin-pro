<template>
  <div class="app-container">
    <!-- 查询操作 -->
    <div class="header-container">
      <!-- 查询条件 -->
      <div class="search-box">
        <el-input type="text" v-model="listQuery.name" placeholder="活动名称" clearable style="width:160px"></el-input>
        <el-select v-model="listQuery.status" placeholder="活动状态" clearable style="width:120px">
          <el-option value="0" label="待开始"></el-option>
          <el-option value="1" label="进行中"></el-option>
          <el-option value="2" label="已结束"></el-option>
        </el-select>
        &nbsp;&nbsp;
        <el-button type="primary" @click="queryData">查询</el-button>
        <el-button type="default" @click="resetQueryData">重置</el-button>
      </div>
      <!-- 按钮操作 -->
      <div class="operate-box">
        <el-button icon="el-icon-plus" type="primary" @click="showAddModal">
          添加活动
        </el-button>
      </div>
    </div>

    <!-- 表格 -->
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" highlight-current-row>
        <el-table-column align="center" label="序号" width="70">
          <template slot-scope="scope">
            {{ listQuery.pageSize * (listQuery.pageNo - 1) + (scope.$index + 1) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="活动名称">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column align="center" label="参与价格">
          <template slot-scope="scope">￥{{ Number(scope.row.price).toFixed(2) }}</template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span class="text-warning" v-if="scope.row.status == 0">待开始</span>
            <span class="text-success" v-if="scope.row.status == 1">进行中</span>
            <span class="text-danger" v-if="scope.row.status == 2">已结束</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false" @click="showEditModal(scope.row)">
              编辑
            </el-link>
            <el-link type="danger" :underline="false" @click="handleDelete(scope.row)">
              删除
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.pageNo"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal"
      ></el-pagination>
    </div>

    <!-- 弹出框 -->
    <!-- 添加和编辑 -->
    <el-dialog :title="editForm.id ? '编辑活动' : '添加活动'" :visible.sync="editModal" width="960px">
      <div>
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-suffix="：" label-width="100px">
          <el-form-item label="活动名称" prop="name">
            <el-input
              v-model.trim="editForm.name"
              placeholder="请输入活动名称"
              style="width: 600px"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="参与价格" prop="price">
            <el-input v-model.trim="editForm.price" placeholder="请输入参与价格" style="width: 300px" clearable>
              <template slot="append">￥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="封面图片" prop="imageUrl">
            <el-upload
              ref="uploadImageRef"
              action
              :http-request="uploadProjectImage"
              :limit="1"
              accept=".png, .jpg, .jpeg, .bmp, .gif"
              list-type="picture-card"
              :before-upload="beforeUploadImage"
              :on-preview="previewImage"
              :on-remove="removeImage"
            >
              <i class="el-icon-plus"></i>
              <div slot="tip" style="font-size: 12px; color: #666">
                只能上传一张，限制.png,.jpg,.jpeg,.bmp,.gif格式
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="活动介绍" prop="desc">
            <div class="components-container">
              <tinymce v-model="editForm.desc" id="tinymce1" :height="360" ref="descRef" />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" style="text-align: center">
        <el-button @click="editModal = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>

    <!-- 图片预览 -->
    <el-dialog title="预览" :visible.sync="previewImageModal">
      <div class="text-align-center">
        <img style="max-width: 100%" :src="previewImageUrl" alt />
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入富文本框组件
import Tinymce from "@/components/Tinymce";
// 引入util工具类
import util from "@/utils/util.js";
// 引入接口api
import { uploadFile } from "@/api/common";
import { getList, addTable, updateTable, deleteTable } from "@/api/table.js";

export default {
  // 引入富文本组件
  components: { Tinymce },
  data() {
    return {
      // 列表
      list: [],
      listTotal: 0,
      listLoading: false,
      listQuery: {
        name: "",
        status: "",
        pageNo: 1,
        pageSize: 10
      },

      // 新增和编辑信息
      editModal: false,
      editForm: {
        id: "", // 活动id
        name: "", // 活动名称
        price: "", // 参与价格
        imageUrl: "", // 封面图片
        desc: "" // 活动介绍
      },
      editFormRules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入活动价格",
            trigger: "blur"
          }
        ],
        imageUrl: [
          {
            required: true,
            message: "请上传封面图片",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "请输入活动介绍",
            trigger: "blur"
          }
        ]
      },

      // 图片预览
      previewImageUrl: "",
      previewImageModal: false
    };
  },
  created() {
    this.list = [
      {
        id: 1,
        name: "活动1",
        price: 10.0,
        imageUrl: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3946423775,168689942&fm=26&gp=0.jpg",
        status: 0,
        desc: "<h1>测试1111</h1>",
        createTime: "2020-08-10 10:10:10"
      },
      {
        id: 2,
        name: "活动2",
        price: 10.0,
        imageUrl: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3946423775,168689942&fm=26&gp=0.jpg",
        status: 1,
        desc: "<h1>测试2222</h1>",
        createTime: "2020-08-10 10:10:10"
      },
      {
        id: 3,
        name: "活动3",
        price: 10.0,
        imageUrl: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3946423775,168689942&fm=26&gp=0.jpg",
        status: 2,
        desc: "<h1>测试333</h1>",
        createTime: "2020-08-10 10:10:10"
      }
    ];

    // this.queryData();
  },
  methods: {
    /**
     * 查询会员列表
     */
    queryData() {
      this.listLoading = true;
      getList({
        pageIndex: this.listQuery.pageNo,
        pageSize: this.listQuery.pageSize,
        projectName: this.listQuery.name
      })
        .then(res => {
          setTimeout(() => {
            this.listLoading = false;
          }, 300);
          if (res.code == "0000") {
            // 设置列表和总条数
            this.list = res.data;
            this.listTotal = res.total;
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // 重置列表
    resetQueryData() {
      this.listQuery.name = "";
      this.listQuery.status = "";
      this.listQuery.pageNo = 1;
      this.listQuery.pageSize = 10;
      this.queryData();
    },
    // 分页
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.queryData();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val;
      this.queryData();
    },

    /**
     * 添加活动弹框
     */
    showAddModal() {
      // 编辑和新增用一个对象时候，resetFields方法之前必须先重置一下对象才可以
      this.editForm = {
        id: "", // 活动id
        name: "", // 活动名称
        price: "", // 参与价格
        imageUrl: "", // 封面图片
        desc: "" // 活动介绍
      };
      // 重置表单
      if (this.$refs.editFormRef) {
        this.$refs.editFormRef.resetFields();
        this.$refs.uploadImageRef.clearFiles();
        this.$refs.descRef.clearContent();
      }
      this.editModal = true;
    },
    /**
     * 修改活动弹框
     */
    showEditModal(row) {
      this.editForm = {
        id: row.id,
        name: row.name,
        price: row.price,
        imageUrl: [],
        desc: row.desc
      };
      // element的图片上传设置默认图片必须是数组
      this.editForm.imageUrl.push({
        uid: util.getGUID(),
        url: row.imageUrl
      });
      // 富文本要手动调用setContent方法才有效果
      if (this.$refs.descRef) {
        this.$refs.descRef.setContent(this.editForm.desc);
      }
      this.editModal = true;
    },

    // 上传图片钱验证图片类型和大小
    beforeUploadImage(file) {
      const IMAGE_TYPE = ["image/png", "image/jpg", "image/jpeg", "image/bmp", "image/gif"];
      const MAX_SIZE = file.size / 1024 / 1024 < 2;
      // 验证文件类型
      if (!IMAGE_TYPE.includes(file.type)) {
        this.$message({
          message: "请上传(.png,.jpg,.jpeg,.bmp,.gif)格式的图片",
          type: "error"
        });
        return false;
      }
      // 验证文件大小
      if (!MAX_SIZE) {
        this.$message({
          message: "上传图片大小不能超过2M",
          type: "error"
        });
        return false;
      }
      return true;
    },
    // 上传图片到后台
    uploadProjectImage(data) {
      let formData = new FormData();
      formData.append("file", data.file);
      formData.append("path", "img");
      uploadFile(formData).then(res => {
        console.log(res);
        if (res.code == "0000") {
          this.editForm.imageUrl = res.data;
        } else {
          this.$message({
            message: "上传图片失败",
            type: "error"
          });
        }
      });
    },
    // 预览上传的图片
    previewImage(file) {
      this.previewImageUrl = file.url;
      this.previewImageModal = true;
    },
    // 删除封面图片
    removeImage(data) {
      this.editForm.imageUrl = "";
    },

    /**
     * 提交表单
     */
    handleSubmit() {
      this.$refs.editFormRef.validate(valid => {
        if (valid) {
          // id不为空，则是修改
          if (this.editForm.id) {
            this.handleUpdate();
          } else {
            this.handleAdd();
          }
        } else {
          console.log("submit fail");
          return false;
        }
      });
    },
    // 添加
    handleAdd() {
      addTable({
        name: this.editForm.name,
        price: this.editForm.price,
        imageUrl: this.editForm.imageUrl,
        desc: this.editForm.desc
      }).then(res => {
        if (res.code == "0000") {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          // 查询列表
          this.queryData();
          this.editModal = false;
        } else {
          this.$message({
            message: "添加失败",
            type: "error"
          });
        }
      });
    },
    // 修改
    handleUpdate() {
      updateTable({
        id: this.editForm.id,
        name: this.editForm.name,
        price: this.editForm.price,
        imageUrl: this.editForm.imageUrl,
        desc: this.editForm.desc
      }).then(res => {
        if (res.code == "0000") {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          // 查询列表
          this.queryData();
          this.editModal = false;
        } else {
          this.$message({
            message: "修改失败",
            type: "error"
          });
        }
      });
    },

    /**
     * 根据id删除活动
     */
    handleDelete(row) {
      this.$confirm("确定删除该条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteTable({
          id: row.id
        }).then(res => {
          if (res.code == "0000") {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.queryData();
          } else {
            this.$message({
              message: "删除失败",
              type: "error"
            });
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  padding-bottom: 10px;
  .search-box {
    .el-input,
    .el-select {
      margin-bottom: 5px;
      margin-right: 6px;
    }
  }
  .operate-box {
    text-align: right;
  }
}

// 详情的样式
.detail-list {
  display: flex;
  .list-label {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    font-weight: 700;
  }
  .item {
    flex: 1;
    .item-label {
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      font-weight: 700;
    }
    .item-content {
      font-size: 13px;
      color: #606266;
    }
  }
}
</style>
