<template>
  <div id="userEdit">
    <h1>{{id ? '编辑': '新增'}}论文资源</h1>
    <el-form label-width="100px" :model="form" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基础信息" name="basic">
          <el-row>
            <el-col :span="20" :offset="2">
              <el-form-item label="论文标题">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="论文副标题">
                <el-input v-model="form.subtitle"></el-input>
              </el-form-item>
              <el-form-item label="论文分类">
                <el-select
                  v-model="form.categories"
                  filterable
                  clearable
                  multiple
                  placeholder="请选择论文所属分类"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发布日期">
                <el-date-picker
                  v-model="form.publishDate"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="作者">
                <el-input v-model="form.author.names"></el-input>
              </el-form-item>
              <el-form-item label="作者简介">
                <el-input type="textarea" rows="3" v-model="form.author.brief"></el-input>
              </el-form-item>
              <el-form-item label="论文类型">
                <el-radio-group v-model="form.type">
                  <el-radio
                    v-for="item in paperTypes"
                    :label="item.label"
                    :value="item.value"
                    :key="item.value"
                  ></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-row>
                <el-col v-if="form.type === paperTypes[0].label">
                  <el-form-item label="期刊名称">
                    <el-input v-model="form.journal.name"></el-input>
                  </el-form-item>
                  <el-form-item label="期刊出版号">
                    <el-input v-model="form.journal.issn"></el-input>
                  </el-form-item>
                  <el-form-item label="期刊来源">
                    <el-radio-group v-model="form.journal.sourceType">
                      <el-radio label="SCI来源期刊"></el-radio>
                      <el-radio label="EI来源期刊"></el-radio>
                      <el-radio label="核心期刊"></el-radio>
                      <el-radio label="CSSCI"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col v-if="form.type === paperTypes[2].label">
                  <el-form-item label="会议名称">
                    <el-input v-model="form.conference.name"></el-input>
                  </el-form-item>
                  <el-form-item label="会议级别">
                    <el-radio-group v-model="form.conference.level">
                      <el-radio label="国际"></el-radio>
                      <el-radio label="全国"></el-radio>
                      <el-radio label="地方"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="会议时间">
                    <el-date-picker v-model="form.conference.date" type="date" placeholder="选择日期"></el-date-picker>
                    {{form.conference.date}}
                  </el-form-item>
                </el-col>
                <el-col v-if="form.type === paperTypes[3].label">
                  <el-form-item label="报纸名称">
                    <el-input v-model="form.newspaper.name"></el-input>
                  </el-form-item>
                  <el-form-item label="报纸出版号">
                    <el-input v-model="form.newspaper.issn"></el-input>
                  </el-form-item>
                  <el-form-item label="报纸出版日期">
                    <el-date-picker v-model="form.newspaper.date" type="date" placeholder="选择日期"></el-date-picker>
                    {{form.conference.date}}
                  </el-form-item>
                </el-col>
                <el-col v-if="form.type === paperTypes[4].label">
                  <el-form-item label="年鉴名称">
                    <el-input v-model="form.yearbook.name"></el-input>
                  </el-form-item>
                  <el-form-item label="年鉴出版号">
                    <el-input v-model="form.yearbook.issn"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="关键词">
                <el-input v-model="form.keyword"></el-input>
              </el-form-item>
              <el-form-item label="论文摘要">
                <el-input type="textarea" rows="8" v-model="form.summary"></el-input>
              </el-form-item>
              <el-form-item label="论文内容">
                <vue-editor v-model="form.body"></vue-editor>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem;">
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
  props: ["id"],
  data() {
    return {
      form: {
        author: {},
        journal: {},
        conference: {},
        newspaper: {},
        yearbook: {},
        body: ""
      },
      options: [],
      paperTypes: [
        { label: "期刊", value: "01" },
        { label: "博硕士", value: "02" },
        { label: "会议", value: "03" },
        { label: "报纸", value: "04" },
        { label: "年鉴", value: "05" }
      ]
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id)
        res = await this.$http.put(`rest/papers/${this.id}`, this.form);
      else res = await this.$http.post("rest/papers", this.form);

      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$router.push("/papers/list");
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/papers/${this.id}`);
      if (res) this.form = res.data;
      console.log(this.form);
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories/options`);
      this.options = res.data.filter(item => {
        return item.value.length > 5;
      });
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script> 

<style>
</style>