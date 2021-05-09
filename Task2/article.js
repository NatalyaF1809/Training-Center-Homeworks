export default class Article {
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.title = obj.title;
        this.description = obj.description;
        this.imgUrl = obj.urlToImage;
        this.publishedAt = obj.publishedAt;
        this.content = obj.content;
        this.url = obj.url;
        this.index = obj.index;
        this.readOnly = true;
    }
}