import service from "../request"

// 当前用户的领养列表
export function adoptListByUserId(page, size) {
    return service({
        url: "/endpoint/v1/adopt/list_by_user_id",
        method: "POST",
        data: {
            'page': page,
            'size': size
        }
    });
}

// 分页领养列表
export function adoptList(page, size) {
    return service({
        url: "/endpoint/v1/adopt/list",
        method: "POST",
        data: {
            'page': page,
            'size': size
        }
    });
}

// 单条领养列表
export function adoptById(id) {
    return service({
        url: "/endpoint/v1/adopt/get",
        method: "POST",
        data: {
            'id': id
        }
    });
}

// 修改or新增领养列表
export function adoptModifyById(data) {
    return service({
        url: "/endpoint/v1/adopt/modify",
        method: "POST",
        data: data
    });
}

// 删除领养
export function adoptDeleteById(id) {
    return service({
        url: "/endpoint/v1/adopt/delete",
        method: "POST",
        data: {
            'id': id
        }
    });
}

// 搜索
export function adoptSearch(search) {
    return service({
        url: "/endpoint/v1/adopt/search",
        method: "POST",
        data: search
    });
}
