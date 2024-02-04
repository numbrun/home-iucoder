<template>
    <div :style="modeStore.GET_Mode ? 'margin-bottom: 40px' : ''" class="head-date-box">
        <div class="app-time" :class="modeStore.GET_Mode ? '' : 'normal'">
            <time class="hh">{{ fixNum(curDate.hours) }}</time>
            <span class="colon">:</span>
            <time class="mm">{{ fixNum(curDate.minutes) }}</time>
            <span class="colon">:</span>
            <span class="sec">{{ fixNum(curDate.seconds) }}</span>
        </div>
        <div v-if="!modeStore.GET_Mode" class="app-date">
            <span class="time-month">{{ fixNum(curMonth) }}月{{ fixNum(curDay) }}日</span>
            <span class="time-week">{{ curWeek }}</span>
            <span class="time-lunar">{{ lunarDay }}</span>
        </div>
    </div>
</template>
<script lang="ts"  setup>
import { onMounted, ref } from "vue";
import { getLunar } from "chinese-lunar-calendar";
import { useModeStore } from '@/store/useMode';
const modeStore = useModeStore()
// const timeSize = ref('70px')

// watch(() => modeStore.GET_Mode, val => {
//     timeSize.value = val ? '1.1rem' : '70px'
// }, { deep: false, immediate: true });

let curYear = ref(); // 当前年份
let curMonth = ref(); // 当前月份
let curDay = ref(); // 当前日期
let curWeek = ref(); // 当前周几
let lunarDay = ref(); // 农历日期
let dayOfYear = ref(); // 当前日期是一年中的第几天
let weekOfYear = ref(); // 当前日期是一年的第几周
let curDate = ref({
    hours: 0,
    minutes: 0,
    seconds: 0,
}); // 当前时分秒
let clockTimer: any = null

onMounted(() => {
    // 初始化日历
    init()
});
const init = () => {
    const setClock = () => {
        // 初始化日历
        const date = new Date();
        curYear.value = date.getFullYear();
        curMonth.value = date.getMonth() + 1;
        curDay.value = date.getDate();
        curDate.value.hours = date.getHours();
        curDate.value.minutes = date.getMinutes();
        curDate.value.seconds = date.getSeconds();

        const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        const day = date.getDay();
        curWeek.value = weekday[day];

        const lunarDate = getLunar(curYear.value, curMonth.value, curDay.value);
        lunarDay.value = lunarDate.dateStr;
        // 获取当前时间是当年的第几天
        dayOfYear.value = Math.floor((date - new Date(curYear.value, 0, 0)) / 86400000);
        // 获取当前时间是当年的第几周
        const start = new Date(curYear.value, 0, 1);
        weekOfYear.value = Math.ceil((((date - start) / 86400000) + start.getDay() + 1) / 7);
    }
    // 执行时钟定时器
    if (!clockTimer) {
        setClock();
    }
    clockTimer = setInterval(setClock, 1000);

    // 只执行一次 在销毁前清定时器
    // this.$once("hook:beforeDestroy", () => {
    //     clearInterval(clockTimer);
    // });
}

//补 0
const fixNum = (number: Number, digits = 2) => {
    if (Number(number) < 10) {
        return "0" + String(number);
    }
    return number;
}
</script>
  
<style scoped lang="scss">
.head-date-box {
    // color: #fff;
    color: rgba(245, 245, 250, 0.9);
    text-shadow: 0 2px 6px rgb(0 0 0 / 16%);
    text-align: center;

    .app-time {
        // font-size: v-bind("timeSize");
        user-select: none;
        font-weight: $timeFontWeight;
        text-shadow: 0 2px 6px rgb(0 0 0 / 16%);
        display: inline-block;
        line-height: 80px;
        transition: font .2s;
        font-family: mind-demi-bold;

        .colon {
            vertical-align: calc($timeSize / 12);
        }
    }

    /* PC端样式 */
    /* 在视口宽度大于等于 1024px 时生效 */
    @media (min-width: 1366px) {

        /* PC端的样式 */
        /* 例如设置页面宽度、字体大小等 */
        .app-time {
            font-size: 0.8rem;
        }
    }

    /* 平板端样式 */
    /* 在视口宽度小于 1366px 且大于等于 768px 时生效 */
    @media (max-width: 1365px) and (min-width: 768px) {

        /* 平板端的样式 */
        /* 例如调整页面布局、字体大小等 */
        .app-time {
            font-size: 1.3rem;
        }
    }

    /* 移动端样式 */
    /* 在视口宽度小于 768px 时生效 */
    @media (max-width: 767px) {
        /* 移动端的样式 */
        /* 例如调整页面布局、字体大小等 */

        .app-time {
            font-size: 1.8rem;
        }
    }

    .app-date {
        font-size: 16px;
        opacity: 0.88;
        margin-top: 2px;
        text-shadow: 0 2px 4px rgb(0 0 0 / 16%);
        span {
            margin: 0 2px;
        }
    }

    .normal {
        font-size: 70px;
    }
}</style>
  