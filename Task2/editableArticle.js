import Article from './article.js';

export default class EditableArticle extends Article {
    constructor(obj) {
        super(obj);
        this.readOnly = false;
        this.comments = [];
        this.like = obj.like;
        this.dislike = obj.dislike;
    }

    comment(comment) {
        this.comments.push(comment);
        localStorage.setItem(this.url, JSON.stringify(this.comments));
    }

    likeIt() {
        localStorage.setItem(`like-${this.url}`, this.like);
        this.like = true;
        this.dislike = false;
    }

    dislikeIt() {
        localStorage.setItem(`dislike-${this.url}`, this.like);
        this.like = false;
        this.dislike = true;
    }
}