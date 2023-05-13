import service from "../request"

// 修改新闻分类
export function editNewsCategory(id, name, description, isActive) {
    return service({
        url: "/endpoint/v1/manager/edit_news_category",
        method: "POST",
        data: {
            "name": name,
            "description": description,
            "isActive": isActive,
            "id": id
        }
    });
}

// 修改宠物分类
export function editAnimalCategory(id, name, description, isActive) {
    return service({
        url: "/endpoint/v1/manager/edit_animal_category",
        method: "POST",
        data: {
            "name": name,
            "description": description,
            "isActive": isActive,
            "id": id
        }
    });
}


// 修改宠物分类
export function editCity(id, province, city, county, isActive) {
    return service({
        url: "/endpoint/v1/manager/edit_city",
        method: "POST",
        data: {
            "id": id,
            "province": province,
            "city": city,
            "county": county,
            "isActive": isActive
        }
    });
}
