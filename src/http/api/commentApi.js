import service from "../request"

// 评论列表
export function commentList(bizId, bizType, page, size) {
    return service({
        url: "/endpoint/v1/comment/list",
        method: "POST",
        data: {
            "id": bizId,
            "type": bizType,
            "page": page,
            "size": size
        }
    });
}

// 发布评论
export function commentPublish(bizId, bizType, content) {
    return service({
        url: "/endpoint/v1/comment/publish",
        method: "POST",
        data: {
            'category': bizType,
            'reportId': bizId,
            'content': content
        }
    });
}


// 点赞或者取消点赞
export function likeOrCancel(bizId) {
    return service({
        url: "/endpoint/v1/comment/like_or_cancel",
        method: "POST",
        data: {
            'id': bizId
        }
    });
}

// 删除评论信息
export function commentDelete(bizId) {
    return service({
        url: "/endpoint/v1/comment/delete",
        method: "POST",
        data: {
            'id': bizId
        }
    });
}
