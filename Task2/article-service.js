import Article from './article.js';
import EditableArticle from './editableArticle.js';
import Comment from './comment.js';

const searchWord = document.getElementById('search-word');
const findBtn = document.getElementById('find-btn');
const articlesBlock = document.getElementById('articles-block');

async function search(e) {
    e.preventDefault();
    const searchParam = searchWord.value;
    let result = await doSearch(searchParam);
    console.warn(result);
    articlesBlock.innerHTML = '';
    result.forEach(el => {
        render(el);
    })
    searchWord.value = '';
}

//global Lexical Enviroment, global scope
function addComment(article, commentItem, commentArea) {
    //outer Lexical Enviroment
    return function doAddComment() {
        //local scope
        const index = article.index;
        const commentText = document.getElementById('comment-' + index).value;
        let comment = new Comment(commentText, new Date().toLocaleString(), `User-${index}`);
        articlesResult[index].comment(comment); 
        commentItem.innerHTML = '';
        commentRender(article, commentItem);
        commentArea.value = ''; 
    }
}

function render(article) {
    let articleDiv = document.createElement('div');
    let postDiv = document.createElement('div');
    articleDiv.setAttribute('class', 'article-item');
    postDiv.setAttribute('class', 'post-div');
    let img = document.createElement('img');
    let h1 = document.createElement('h1');
    let contentPar = document.createElement('p');
    let pubDatePar = document.createElement('p');
    let reactionDiv = document.createElement('div');
    reactionDiv.setAttribute('class', 'like-dislike-div');
    let likeBtn = document.createElement('button');
    let dislikeBtn = document.createElement('button');
    likeBtn.innerHTML = 'Like';
    dislikeBtn.innerHTML = 'Dislike';
    reactionDiv.append(likeBtn);
    reactionDiv.append(dislikeBtn);
    likeBtn.setAttribute('class', 'like');
    likeBtn.setAttribute('like-btn-index', article.index);
    dislikeBtn.setAttribute('class', 'dislike');
    dislikeBtn.setAttribute('dislike-btn-index', article.index);
    if (article.imgUrl) {
        img.setAttribute('src', article.imgUrl);
    }
    h1.textContent = article.title;
    contentPar.textContent = article.content;
    pubDatePar.textContent = article.publishedAt.split('T')[0];
    articleDiv.append(img);
    articleDiv.append(h1);
    articleDiv.append(contentPar);
    articleDiv.append(pubDatePar);
    postDiv.append(articleDiv);
    if (!article.readOnly) {
        let commentDiv = document.createElement('div');
        commentDiv.setAttribute('class', 'add-comment-item');
        let commentItem = document.createElement('div');
        commentItem.setAttribute('class', 'comment-item');
        let commentArea = document.createElement('textarea');
        commentArea.setAttribute('id', 'comment-' + article.index);
        commentArea.cols = "40";
        commentArea.rows = "10";
        commentDiv.append(commentItem);
        commentDiv.append(commentArea);

        let sendCommentBtn = document.createElement('button');
        sendCommentBtn.setAttribute('data-index', article.index);
        sendCommentBtn.innerText = 'Send Comment';

        sendCommentBtn.addEventListener('click', addComment(article, commentItem, commentArea));

        likeBtn.addEventListener('click', event => {
            const index = event.target.getAttribute('like-btn-index');
            articlesResult[index].likeIt();
            if (article.like) {
                likeBtn.style.backgroundColor = 'green';
                dislikeBtn.style.backgroundColor = 'white';
            }
        });

        dislikeBtn.addEventListener('click', event => {
            const index = event.target.getAttribute('dislike-btn-index');
            articlesResult[index].dislikeIt();
            if (article.dislike) {
                likeBtn.style.backgroundColor = 'white';
                dislikeBtn.style.backgroundColor = 'red';
            }
        });

        commentDiv.append(sendCommentBtn);
        postDiv.append(commentDiv);
        postDiv.append(reactionDiv);
    }
    articlesBlock.append(postDiv);
}

function commentRender(article, item) {
    let commentsString = localStorage.getItem(article.url);
    if (!!commentsString) {
        let comments = JSON.parse(commentsString);
        comments.forEach(comment => {
            let textPar = document.createElement('p');
            let datePar = document.createElement('p');
            let authorPar = document.createElement('p');

            textPar.setAttribute('class', 'comment-text');
            datePar.setAttribute('class', 'comment-date');
            authorPar.setAttribute('class', 'comment-author');

            textPar.innerHTML =  `${comment.text}`;
            datePar.innerHTML = `${comment.date}`;
            authorPar.innerHTML = `${comment.author}`;

            item.append(textPar);
            item.append(datePar);
            item.append(authorPar);
        });
    }
}

function lastWeekDate() {
    let date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().split("T")[0]
}

let articlesResult = [];
function doSearch(searchParam) {
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        let url = `https://newsapi.org/v2/everything?q=${searchParam}&from=${lastWeekDate()}&sortBy=popularity&apiKey=379dcb0160f04bf1ad9f270b10170fd2`;
        //379dcb0160f04bf1ad9f270b10170fd2 new
        //2867233ed1c64b4eaf717be8d6ccd6ed old
        req.open('GET', url);
        req.onload = function() {
            let response = JSON.parse(req.response);
            if (this.status >= 200 && this.status < 300) {
                for (let i = 0; i < response.articles.length; i++) {
                    let article = response.articles[i];
                    article.index = i;
                    if (i < 5) {
                        articlesResult.push(new EditableArticle(article));
                    } else {
                        articlesResult.push(new Article(article));
                    }
                }
                resolve(articlesResult);
            } else {
                // reject({
                //     status: this.status,
                //     statusText: req.statusText
                // })
            }
        }
        req.onerror = function () {
            // reject({
            //     status: this.search,
            //     statusText: req.statusText
            // });
        };

        req.send();
    });
}

findBtn.addEventListener('click', search);

