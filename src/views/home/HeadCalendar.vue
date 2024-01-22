<template>
    <div class="headCalendar-box">
        <!-- 日历卡片 页面 -->
        <div class="calendar-card">
            <div class="cal-top">{{ curYear }} 年 {{ curMonth }} 月</div>
            <div class="cal-center">{{ curDay }}</div>
            <div class="cal-footer">
                <p class="cal-footer-d">第 {{ dayOfYear }} 天 第 {{ weekOfYear }} 周</p>
                <p class="cal-footer-w">{{ lunarDay }} {{ curWeek }}</p>
            </div>
        </div>
    </div>
</template>
<script  lang="ts" setup>
import { onMounted, ref } from "vue";
import { getLunar } from "chinese-lunar-calendar";

const curYear = ref(""); // 当前年份
const curMonth = ref(""); // 当前月份
const curDay = ref(""); // 当前日期
const curWeek = ref(""); // 当前周
const lunarDay = ref(""); // 农历日期
const dayOfYear = ref(""); // 当前日期是一年中的第几天
const weekOfYear = ref(""); // 当前日期是一年的第几周

onMounted(() => {
    // 初始化日历
    const date = new Date();
    curYear.value = date.getFullYear();
    curMonth.value = date.getMonth() + 1;
    curDay.value = date.getDate();

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
});
</script>
  
<style scoped lang="scss">
.headCalendar-box {
    position: relative;
    text-align: center;

    .calendar-card {
        width: 180px;
        height: 180px;
        font-family: PingFang SC, -apple-system, BlinkMacSystemFont, Helvetica Neue,
            Helvetica, sans-serif;
        background: #fff;
        border-radius: 15px;
        overflow: hidden;
        transition: transform 0.3s ease;

        &:hover {
            transform: translateY(-3px);
        }

        .cal-top {
            font-size: 16px;
            color: #fff;
            line-height: 46px;
            height: 25%;
            background: #ff5a5d;
        }

        .cal-center {
            font-size: 46px;
            font-weight: 600;
            line-height: 78px;
            height: 42%;
        }

        .cal-footer {
            height: 33%;

            .cal-footer-d {
                font-size: 14px;
                color: #999;
                line-height: 20px;
                margin-bottom: 5px;
            }

            .cal-footer-w {
                color: #222;
                font-size: 16px;
            }
        }
    }
}
</style>
  