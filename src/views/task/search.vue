<script setup lang="ts">
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import { taskStore } from '@/store/task';
    import { hotSearch,taskAllList } from '@/api/task';
    import TaskList from '@/components/list/TaskList.vue'
    import { Toast } from 'vant';
    const router = useRouter()
    const store:any = taskStore()
    const taskId = router.currentRoute.value.params.id
    //每次页面挂载时重新加载
    const his = localStorage.getItem('searchHistory')
    const state:any = reactive({
        value: '',     //职位名称
        searchFlag: false,  //判断是否搜索 控制搜索结果的显示
        loading: false,
        finished: false,
        taskList: [],
        pageNum: 1,
        pageSize: 10,
        searchHistory: his?his.split(','): []
    })
    const leftBack = () => history.back();
    //搜索框回车后触发
    const onSearch = (value:any) => {
        if(!value) return
        // 显示搜索结果
        state.searchFlag = true
        //将当前搜索存在历史记录token里
        if(!state.searchHistory.includes(value)){
            state.searchHistory.push(value)
            localStorage.setItem('searchHistory',state.searchHistory)
        }
        getTaskAllList()
    }
    //取消搜索
    const onCancel = () => {
        state.searchFlag = false
        state.value = ''
    }
    //点击面包屑
    const gotoSearch = (item:any) => {
        state.value = item
        onSearch(item)
    }
    const clearHistory = () => {
        state.searchHistory = []
        localStorage.removeItem('searchHistory')
    }
    const getHotSearch = async () => {
        const res:any = await hotSearch({
            type: 1
        })
        if(res){
            store.setHotSearchList(res.data)
        }else{
            Toast(res.msg)
        }
    }
    if(store.hotSearchList.length<=0) getHotSearch()
    const getTaskAllList = async () => {
        state.loading = true
        if(state.pageNum == 1) state.taskList = []
        const res:any = await taskAllList({
            "position_name": state.value,
            "pageNum": state.pageNum,
            "pageSize": state.pageSize
        })
        if(res){
            state.taskList = state.taskList.concat(res.records)
            state.loading = false
            if (state.taskList.length>=res.total) {
                state.finished = true
            }else{
                state.finished = false
            }
        }else{
            Toast(res.msg)
            state.loading = false
        }
    }
    const onRefresh = () => {
        state.pageNum = 1
        getTaskAllList()
    }
    const onLoad = () => {
        state.pageNum = state.pageNum + 1
        getTaskAllList()
    }
</script>
<template>
<div :class="state.searchFlag?'search-page':''">
    <van-nav-bar title="搜索" left-arrow @click-left="leftBack"/>
    <div class="search-cont">
        <van-search
            v-model="state.value"
            show-action
            placeholder="请输入搜索的职位"
            @search="onSearch"
            @cancel="onCancel"
        />
        <div class="search-item" v-if="!state.searchFlag">
            <h3>搜索历史<van-icon name="delete-o" @click="clearHistory" /></h3>
            <dl>
                <dt v-for="(item, index) in state.searchHistory" :key="index" @click="gotoSearch(item)">{{item}}</dt>
            </dl>
            <h3>热门搜索</h3>
            <dl>
                <dt v-for="(item, index) in store.hotSearchList" :key="index" @click="gotoSearch(item.title)">{{item.title}}</dt>
            </dl>
        </div>
        <div class="search-list" v-show="state.searchFlag">
            <van-pull-refresh v-model="state.loading" @refresh="onRefresh">
            <van-list
                v-model:loading="state.loading"
                :finished="state.finished"
                finished-text=""
                @load="onLoad"
            >
                <TaskList :taskList="state.taskList"></TaskList>
                <div class="wy-no-data" v-if="!state.loading && state.taskList.length==0">暂无数据</div>
            </van-list>
            </van-pull-refresh>
        </div>
    </div>
</div>
</template>
<style scoped>
.search-page{
    background: #F9F9F9;
    height: 100%;
    min-height: 100vh;
}
.search-page .van-nav-bar{
    background: none;
}
:deep(.van-search__content){
    background: #F2F2F2;
    border-radius: 0.85rem;
}
:deep(.van-search--show-action){
    padding-left: 0px;
    background: none;
}
:deep(.van-search__action){
    font-size: 0.85rem;
    font-weight: 400;
    color: #666666;
    padding-right: 0px;
}
.search-cont{
    padding:0 0.64rem;
}
h3{
    font-size: 0.8rem;
    line-height: 0.8rem;
    font-weight: 500;
    color: #000000;
    margin: 0.85rem 0 0.85rem;
    display: flex;
}
h3 i{
    flex: 1;
    text-align: right;
    font-size: 0.9rem;
}
dl dt{
    background: #F5F5F5;
    border-radius: 0.16rem;
    padding: 0.45rem;
    font-size: 0.64rem;
    line-height: 0.64rem;
    font-weight: 400;
    color: #333333;
    margin-right: 0.51rem;
    margin-bottom: 0.53rem;
    display: inline-block;
}
</style>