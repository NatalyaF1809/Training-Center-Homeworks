const INPUT_FIELD = document.getElementsByTagName('input')[0];
const ENQUEUE_BUTTON = document.getElementsByTagName('input')[1];
const DEQUEUE_BUTTON = document.getElementsByTagName('input')[2];
const UL = document.querySelector('ul');
const WARNING_FIELD = document.getElementsByClassName('warning-div')[0];

let queueArr = localStorage.getItem('queueArr') ? Array.from(JSON.parse(localStorage.getItem('queueArr'))) : [];

const drawQueue = data => {
    const li = document.createElement('li')
    li.textContent = data;
    UL.appendChild(li);
}

const drawWarning = data => {
    const p = document.createElement('p');
    p.textContent = data;
    WARNING_FIELD.appendChild(p);
    setTimeout(() => {
        WARNING_FIELD.innerHTML = '<div class="warning-div"></div>';
    }, 3000);
}

const enqueue = value => {
    if (queueArr.length === 20) {
        drawWarning('Queue is full');
        return;
    } 
    queueArr.push(value);
    localStorage.setItem('queueArr',JSON.stringify(queueArr));
    UL.innerHTML = ''
    queueArr.forEach(item => {
        drawQueue(item);
    });
}

const dequeue = () => {
    if (queueArr.length) {
        queueArr.shift();
        localStorage.setItem('queueArr',JSON.stringify(queueArr));
        UL.innerHTML = ''
        queueArr.forEach(item => {
            drawQueue(item);
        });
    } else {
        drawWarning('Queue is empty. Nothing to delete.');
    }
}

window.addEventListener('load', () => {
    queueArr.forEach(item => {
        drawQueue(item);
    });
});

ENQUEUE_BUTTON.addEventListener('click', e => {
    e.preventDefault();
    if (!INPUT_FIELD.value) {
        drawWarning('Nothing written to add to a queue.');
    } else {
        enqueue(INPUT_FIELD.value);
    }
    INPUT_FIELD.value = '';
});

DEQUEUE_BUTTON.addEventListener('click', e => {
    e.preventDefault();
    dequeue();
});