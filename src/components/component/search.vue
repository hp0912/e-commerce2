<template>
  <div class="search-container">
    <div class="search-input">
      <van-icon name="search" class="iconfont" />
      <input type="text" autofocus="autofocus" v-model.trim="search_val" :placeholder="placeholder">
    </div>
    <span class="btn-search" :class="{active: btnActive}">搜索</span>
  </div>
</template>

<script>
export default {
  props: ['placeholder', 'beforeSearch', 'fun_search'],
  data () {
    return {
      search_val: '',
      btnActive: false
    }
  },
  watch: {
    search_val (data) {
      if (data !== '') {
        this.btnActive = true
        if (this.beforeSearch) {
          this.beforeSearch()
        }
        this.fun_search(data)
      } else {
        this.btnActive = false
      }
    }
  }
}
</script>

<style scoped>
.search-container {
  display: flex;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  background: #fff;
}
.search-container .search-input, .search-container .btn-search {
  font-size: 0.9rem;
}
.search-container .search-input {
  flex: 1;
  display: flex;
  align-items: center;
  background: rgb(239, 238, 244);
  border-radius: 0.4rem;
  margin: 0 0.375rem;
  padding-left: 0.375rem;
}
.search-container .search-input input {
  width: 85%;
  height: 100%;
  border: none;
  text-indent: 0.2rem;
  outline: none;
  background: rgba(237, 237, 237, 0.1);
  line-height: normal;
  padding: 0;
}
.search-container .btn-search {
  font-size: 0.9rem;
  display: inline-block;
  color: #fff;
  background: rgb(145, 145, 145);
  text-align: center;
  border-radius: 0.2rem;
  margin-right: 5px;
  padding-left: 0.45rem;
  padding-right: 0.45rem;
}
.search-container .active {
  color: #fff;
  background: #4b0;
}
</style>
