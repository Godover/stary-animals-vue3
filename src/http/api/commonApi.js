import service from "../request"

// 热门新闻
export function hotNewsList(type) {
    return service({
        url: "/endpoint/v1/common/hot_news_list",
        method: "POST",
        data: {
            "type": type
        }
    });
}

// 热门领养
export function hotAdoptList() {
    return service({
        url: "/endpoint/v1/common/hot_adopt_list",
        method: "POST",
        data: {
            "page": 1,
            "size": 10,
        }
    });
}

// 热门寻宠
export function hotSeekList() {
    return service({
        url: "/endpoint/v1/common/hot_seek_list",
        method: "POST",
        data: {
            "page": 1,
            "size": 10,
        }
    });
}

// 所有宠物分类
export function animalsCategoryList() {
    return service({
        url: "/endpoint/v1/common/animal_category_list",
        method: "POST",
        data: {}
    });
}

// 新闻分类
export function newsCategoryList() {
    return service({
        url: "/endpoint/v1/common/news_category_list",
        method: "POST",
        data: {}
    });
}


// 城市列表
export function cityList() {
    return service({
        url: "/endpoint/v1/common/city_list",
        method: "POST",
        data: {}
    });
}
