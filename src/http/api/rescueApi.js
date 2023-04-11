import service from "../request"


// 当前用户的救助列表
export function rescueListByUserId(page, size) {
    return service({
        url: "/endpoint/v1/rescue/list_by_user_id",
        method: "POST",
        data: {
            'page': page,
            'size': size
        }
    });
}

// 分页救助列表
export function rescueList(page, size) {
    return service({
        url: "/endpoint/v1/rescue/list",
        method: "POST",
        data: {
            'page': page,
            'size': size
        }
    });
}

// 单条救助列表
export function rescueById(id) {
    return service({
        url: "/endpoint/v1/rescue/get",
        method: "POST",
        data: {
            'id': id
        }
    });
}

// 修改or新增救助列表
export function rescueModifyById(data) {
    return service({
        url: "/endpoint/v1/rescue/modify",
        method: "POST",
        data: data
    });
}

// 删除单条救助信息
export function rescueDeleteById(id) {
    return service({
        url: "/endpoint/v1/rescue/delete",
        method: "POST",
        data: {
            'id': id
        }
    });
}

// 搜索救助
export function rescueSearch(search) {
    return service({
        url: "/endpoint/v1/rescue/search",
        method: "POST",
        data: search
    });
}
