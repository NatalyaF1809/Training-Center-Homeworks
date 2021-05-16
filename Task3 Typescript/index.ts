const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
const postsDiv = document.getElementsByClassName('posts-block')[0];

interface PostData  {
    userId: number;
    id: number;
    title: string;
    body: string;
}

async function getPosts(): Promise<PostData[]> {
    const res = await fetch(baseUrl);
    const data = await res.json();
    return data;
}

async function render() {
    let posts = await getPosts();
    posts.map(obj => {
        let tblBody = document.getElementById('data');

        let tr = document.createElement('tr');
        let tdUserId = document.createElement('td');
        let tdId = document.createElement('td');
        let tdTitle = document.createElement('td');
        let tdBody = document.createElement('td');

        tdUserId.innerHTML = `${obj.userId}`;
        tdId.innerHTML = `${obj.id}`;
        tdTitle.innerHTML = obj.title;
        tdBody.innerHTML = obj.body;

        if (tblBody === null) {
            console.log('error')
        } else {
            tblBody.append(tr);
        }
        tr.append(tdUserId);
        tr.append(tdId);
        tr.append(tdTitle);
        tr.append(tdBody);
    });
}

render();


type Key = string | number;

interface ObjectShape {
    [key: string]: Key
}

function updateObjectInArray(array: ObjectShape[], key: Key, newKeyValue: string):ObjectShape[] {
    let clonedArr = [...array];
    for (let clonedObj of clonedArr) {
        for (let i of Object.keys(clonedArr)) {
            clonedObj[key] = newKeyValue;
        }
    }
    return clonedArr;
}

const studentsObj = [{ name: 'Ann', age: 18 }, { name: 'Ben', age: 17 }, { name: 'David', age: 16 }, { name: 'Natalya', age: 11 }];

// console.log(updateObjectInArray(studentsObj, 'name', 'Bill'));
// console.log(updateObjectInArray(studentsObj, 'age', '11'));
