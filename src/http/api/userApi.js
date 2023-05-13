import service from "../request"

// 登录
export function login(userName, passWord) {
    return service({
        url: "/endpoint/v1/user/login",
        method: "POST",
        data: {
            'userName': userName,
            'passWord': passWord
        }
    });
}

// 登录
export function currentUserInfo() {
    return service({
        url: "/endpoint/v1/user/current_info",
        method: "POST",
        data: {}
    });
}

// 注册
export function register(userName, passWord, email) {
    return service({
        url: "/endpoint/v1/user/register",
        method: "POST",
        data: {
            'userName': userName,
            'passWord': passWord,
            'email': email,
        }
    });
}

// 根据用户ID获取用户信息
export function getUserById(id) {
    return service({
        url: "/endpoint/v1/user/get",
        method: "POST",
        data: {
            'id': id
        }
    });
}

// 修改用户信息
export function userModify(data) {
    return service({
        url: "/endpoint/v1/user/modify",
        method: "POST",
        data: data
    });
}

// 获取用户信息列表
export function userList(page, size) {
    return service({
        url: "/endpoint/v1/user/list",
        method: "POST",
        data: {
            'page': page,
            'size': size
        }
    });
}


// 拉黑
export function blackUserById(userId) {
    return service({
        url: "/endpoint/v1/user/black_user_by_id",
        method: "POST",
        data: {
            'id': userId
        }
    });
}


