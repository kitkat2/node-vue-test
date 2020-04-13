<template>
  <div id="paper-card">
    <el-row style="width: 100%">
     <el-col :span="5">
        <card-aside>
        <template v-slot:classify>
          <div class="home-card text-center">
            <font-awesome-icon :icon="['fas','book-open']" class="text-primary mt-7 icon" />
            <p class="pt-2 title">
              <span class="text-secondary">期 刊</span>
            </p>
            <p class="pt-2 check-more">
              <el-button type="primary" plain round size="small">查 看 更 多</el-button>
            </p>
          </div>
        </template>
      </card-aside>
     </el-col>
     <el-col :span="18" class="ml-2">
        <card-main></card-main>
     </el-col>
    </el-row>
    <el-row style="width: 100%; padding-right: 1.65rem;" class="mt-2 d-flex jc-between">
     <el-col class="pr-2">
        <card-aside>
        <template v-slot:classify>
          <div class="home-card text-center">
            <font-awesome-icon :icon="['fas','newspaper']" class="text-primary mt-7 icon" />
            <p class="pt-2 title">
              <span class="text-secondary">报 纸</span>
            </p>
            <p class="pt-2 check-more">
              <el-button type="primary" plain round size="small">查 看 更 多</el-button>
            </p>
          </div>
        </template>
      </card-aside>
     </el-col>
     <el-col class="pr-1 pl-1">
        <card-aside>
        <template v-slot:classify>
          <div class="home-card text-center">
            <font-awesome-icon :icon="['fas','handshake']" class="text-primary mt-7 icon" />
            <p class="pt-2 title">
              <span class="text-secondary">会 议</span>
            </p>
            <p class="pt-2 check-more">
              <el-button type="primary" plain round size="small">查 看 更 多</el-button>
            </p>
          </div>
        </template>
      </card-aside>
     </el-col>
     <el-col class="pl-2">
        <card-aside>
        <template v-slot:classify>
          <div class="home-card text-center">
            <font-awesome-icon :icon="['fas','graduation-cap']" class="text-primary mt-7 icon" />
            <p class="pt-2 title">
              <span class="text-secondary">硕博士</span>
            </p>
            <p class="pt-2 check-more">
              <el-button type="primary" plain round size="small">查 看 更 多</el-button>
            </p>
          </div>
        </template>
      </card-aside>
     </el-col>
    </el-row>
    <el-row style="width: 100%" class="mt-2">
      <el-col :span="18" class="mr-2">
        <card-main></card-main>
      </el-col>
      <el-col :span="5">
         <card-aside>
        <template v-slot:classify>
          <div class="home-card text-center">
            <font-awesome-icon :icon="['fas','book']" class="text-primary mt-7 icon" />
            <p class="pt-2 title">
              <span class="text-secondary"> 年鉴 </span>
            </p>
            <p class="pt-2 check-more">
              <el-button type="primary" plain round size="small">查 看 更 多</el-button>
            </p>
          </div>
        </template>
      </card-aside>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  name: "paper-card",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
#paper-card {
  .home-card {
    width: 100%;
    height: 100%;
    border: 1px solid #fed802;
    background: #fffae4;
    .icon {
      font-size: 3rem;
    }
    .check-more {
      display: none;
      &:hover {
        button {
          background: #fffae4;
          color: #fed802;
          border: 1px solid #fed802;
        }
      }
    }
    .title {
      display: block;
      color: #fed802;
    }
    &:hover {
      background: #fed802;
      color: #fff;
      .icon {
        color: #fff;
        margin-top: 3.5rem;
      }
      .check-more {
        display: block;
        padding-top: 0.75rem;
      }
      .title {
        display: none;
      }
    }
  }
}
</style>