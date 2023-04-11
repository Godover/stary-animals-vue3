import service from "../request"

// 分页救助列表
export function newsList(page, size, type) {
    return service({
        url: "/endpoint/v1/news/list",
        method: "POST",
        data: {
            'page': page,
            'size': size,
            'type': type
        }
    });
}

// 单条救助列表
export function newsById(id) {
    return service({
        url: "/endpoint/v1/news/get",
        method: "POST",
        data: {
            'id': id
        }
    });
}

// 修改资讯信息
export function newsModify(data) {
    return service({
        url: "/endpoint/v1/news/modify",
        method: "POST",
        data: data
    });
}

// 删除单条救助信息
export function newsDeleteById(id) {
    return service({
        url: "/endpoint/v1/news/delete",
        method: "POST",
        data: {
            'id': id
        }
    });
}

// 搜索救助
export function newsSearch(search) {
    return service({
        url: "/endpoint/v1/news/search",
        method: "POST",
        data: search
    });
}
