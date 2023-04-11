import service from "../request"

// 当前用户的寻宠列表
export function seekListByUserId(page, size) {
    return service({
        url: "/endpoint/v1/seek/list_by_user_id",
        method: "POST",
        data: {
            'page': page,
            'size': size
        }
    });
}

// 分页寻宠列表
export function seekList(page, size) {
    return service({
        url: "/endpoint/v1/seek/list",
        method: "POST",
        data: {
            'page': page,
            'size': size
        }
    });
}


// 单条寻宠列表
export function seekById(id) {
    return service({
        url: "/endpoint/v1/seek/get",
        method: "POST",
        data: {
            'id': id
        }
    });
}

// 修改or新增寻宠列表
export function seekModifyById(data) {
    return service({
        url: "/endpoint/v1/seek/modify",
        method: "POST",
        data: data
    });
}

// 删除寻宠
export function seekDeleteById(id) {
    return service({
        url: "/endpoint/v1/seek/delete",
        method: "POST",
        data: {
            'id': id
        }
    });
}

// 搜索
export function seekSearch(search) {
    return service({
        url: "/endpoint/v1/seek/search",
        method: "POST",
        data: search
    });
}

