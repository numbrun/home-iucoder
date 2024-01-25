import request from "@/utils/request.ts";

// 一言语句接口
export function getSentence(query) {
  return request({
    url: "https://v1.hitokoto.cn/",
    method: "get",
    params: query,
  });
}


export function addJob(data) {
  return request({
    url: "/monitor/job",
    method: "post",
    data: data,
  });
}

// put
export function updateJob(data) {
  return request({
    url: "/monitor/job",
    method: "put",
    data: data,
  });
}

// delete
export function delJob(jobId) {
  return request({
    url: "/monitor/job/" + jobId,
    method: "delete",
  });
}
 