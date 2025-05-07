const inputBox = document.querySelector('#input-box');
const listContainer = document.querySelector('#list-content');
let itemBeingEdited = null

function addButton() {
    if (inputBox.value === '') {
        alert('Silahkan masukkan kegiatan mu');
    } else if (itemBeingEdited) {
        itemBeingEdited.firstChild.textContent = inputBox.value;
        itemBeingEdited = null;
        document.querySelector('.add').textContent = "Add";
    } else {
        let li = document.createElement('li');
        li.innerText = inputBox.value;
        
        let span = document.createElement('span');
        span.className = 'trash';
        li.appendChild(span);
        
        let edit = document.createElement('span');
        edit.className = 'edit';
        edit.textContent = '✏️';
        li.appendChild(edit);
        
        listContainer.appendChild(li);
    }
    inputBox.value = '';
    saveData();
}


inputBox.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault()
        addButton();
    }
})

listContainer.addEventListener('click', function(e) {
    if (e.target.matches('.edit')) {
        inputBox.value = e.target.parentElement.firstChild.textContent;
        itemBeingEdited = e.target.parentElement;
        document.querySelector('.add').textContent = "Update";
    } 
    else if (e.target.matches('.trash')) {
        e.target.parentElement.remove();
        saveData();
    }
    else if (e.target.matches('li')) {
        e.target.classList.toggle('checked');
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showList() {
    listContainer.innerHTML = localStorage.getItem("data");
}