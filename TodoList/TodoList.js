const items = document.querySelector('.items');
const inputstring = document.querySelector('.string');
const inputnumber = document.querySelector('.int');
const addBtn = document.querySelector('.addBtn');
let count = 0;
function increase (){
    count=count+1;
}

function onAdd(){
    //1. 텍스트를 받아오는 부분
    const text = inputstring.value;
    if(text ===''){
        inputstring.focus
        return;
    }
    const minute = inputnumber.value;
    if(minute ===''){
        inputstring.focus
        return;
    }
    //.2 새로운 아이템
    const item = createItem(text,minute);
    //3. items 컨테이너 안에 새로 만든 아이템 추가
    items.appendChild(item);
    //4. 인풋 초기화
    inputstring.value = '';
    inputnumber.value = '';
    inputstring.focus();
}
function createItem(text,minute) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item-row');

    const item = document.createElement('div');
    item.setAttribute('class', 'item');

    const selectBtn = document.createElement('input');
    selectBtn.setAttribute('type', 'checkbox');
    selectBtn.setAttribute('id', (`check-box${count}`));
    selectBtn.setAttribute('class', 'do');

    const styleBtn = document.createElement('label');
    styleBtn.setAttribute('for',(`check-box${count}`));

    const textBox = document.createElement('div');
    textBox.setAttribute('class', 'text-box');

    const itemName = document.createElement('span');
    itemName.setAttribute('class', 'item-name');
    itemName.innerText = text;

    const itemCost = document.createElement('span');
    itemCost.setAttribute('class', 'item-cost');
    itemCost.innerText = (`${minute} 분`);

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'delete');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.addEventListener('click', ()=> {
        items.removeChild(itemRow);

    })

    const itemLine = document.createElement('div');
    itemLine.setAttribute('class', 'line');

    item.appendChild(selectBtn);
    item.appendChild(styleBtn);
    item.appendChild(textBox);
    item.appendChild(itemName);
    item.appendChild(itemCost);
    item.appendChild(deleteBtn);


    itemRow.append(item);
    itemRow.append(itemLine);
    return itemRow;
}

addBtn.addEventListener('click', ()=> {
    increase();
    onAdd();
})

inputnumber.addEventListener('keypress', event => {
    if (event.key === 'Enter'){
        increase();
        onAdd();
    }
})