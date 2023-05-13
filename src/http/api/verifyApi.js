import service from "../request"

// 审核
export function verifyModify(bizId, bizType, verifyStatus, message) {
    return service({
        url: "/endpoint/v1/verify/modify",
        method: "POST",
        data: {
            "bizType": bizType,
            "bizId": bizId,
            "verifyStatus": verifyStatus,
            "message": message
        }
    });
}

// 获取所有未审核的评论
export function commentListNotVerify(page, size) {
    return service({
        url: "/endpoint/v1/verify/comment_list",
        method: "POST",
        data: {
            'page': page,
            'size': size
        }
    });
}

// 获取所有未审核的资讯
export function newsListNotVerify(page, size) {
    return service({
        url: "/endpoint/v1/verify/news_list",
        method: "POST",
        data: {
            'page': page,
            'size': size
        }
    });
}

// 获取所有未审核的领养
export function adoptListNotVerify(page, size) {
    return service({
        url: "/endpoint/v1/verify/adopt_list",
        method: "POST",
        data: {
            'page': page,
            'size': size
        }
    });
}

// 获取所有未审核的救助
export function rescueListNotVerify(page, size) {
    return service({
        url: "/endpoint/v1/verify/rescue_list",
        method: "POST",
        data: {
            'page': page,
            'size': size
        }
    });
}

