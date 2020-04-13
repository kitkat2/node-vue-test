<template>
  <el-card id="card-main" style="height: 14rem;">
    <ul class="paper-list">
      <li class="py-2 text-gray" v-for="(data, index) in datas" :key="index">
        <el-row>
          <el-col :span="14" class="title" :title="data.title">{{data.title}}</el-col>
          <el-col :span="6">
            <i class="el-icon-view fs-sm">
              <span class="ml-2">浏览: {{data.view}}</span>
            </i>
          </el-col>
          <el-col :span="4">
            <span class="fs-sm">{{data.date}}</span>
          </el-col>
        </el-row>
      </li>
    </ul>
  </el-card>
</template>


<script>
const datas = [
  {
    title:
      "文献论文标题1文献论文标题1文献论文标题1文献论文标题1文献论文标题1文献论文标题1文献论文标题1",
    author: "张三",
    date: "2016-12-26",
    view: 1111
  },
  {
    title: "文献论文标题2",
    author: "张三",
    date: "2016-12-26",
    view: 1111
  },
  {
    title: "文献论文标题3",
    author: "张三",
    date: "2016-12-26",
    view: 1111
  },
  {
    title: "文献论文标题4",
    author: "张三",
    date: "2016-12-26",
    view: 1111
  },
  {
    title: "文献论文标题5",
    author: "张三",
    date: "2016-12-26",
    view: 1111
  }
];
export default {
  name: "card-main",
  data() {
    return {
      datas: datas
    };
  }
};
</script>

<style lang="scss" scoped>
#card-main {
  border: 1px solid #ffccbc;
  // border-left: none;
  .paper-list {
    margin: 0;
    padding: 0;
    width: 100%;
    list-style: none;
    li {
      position: relative;
      width: 100%;
      padding-left: 1.75rem;
      cursor: pointer;
      &::before {
        content: " ";
        display: block;
        position: absolute;
        left: 1rem;
        width: 0.25rem;
        height: 1rem;
        background: #fed802;
      }
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      &:hover{
        color: #FFC300;
      }
    }
  }
}
</style>