(() => {
    let buttonAdd = document.querySelector('#add-new-item');
    let input = document.querySelector('#new-item-name');
    let list = document.querySelector('.items-list');
    
    function toggleComplete(item, isComplete) {
        if (isComplete) {
            item.classList.add('completed');
        } else {
            item.classList.remove('completed');
        }
    }
    
    function createItem(name) {
        let item = document.createElement('div');
        item.classList.add('list-item');
        
        let accept = document.createElement('input');
        accept.type = 'checkbox';
        accept.id = "input_label" + nubmerInput;
        accept.classList.add('accept-button');
        accept.addEventListener('change', (event) => {
            toggleComplete(item, accept.checked);
        });

        let labelAccept = document.createElement('label');
        labelAccept.setAttribute("for", "input_label" + nubmerInput);
        labelAccept.classList.add('input_label');
        
        let label = document.createElement('div');
        label.classList.add('item-name');
        label.textContent = name;
        label.addEventListener('dblclick', (event) => {
            item.classList.add('edit-mode');
        });
        
        let edit = document.createElement('input');
        edit.type = 'text';
        edit.value = name;
        edit.classList.add('edit-name');
        edit.addEventListener('blur', (event) => {
            label.textContent = edit.value;
            item.classList.remove('edit-mode');
        });
        edit.addEventListener('keydown', (event) => {
            
            if (event.keyCode === 13) {
                label.textContent = edit.value;
                item.classList.remove('edit-mode');
            }
            
            if (event.keyCode === 27) {
                edit.value = label.textContent;
                item.classList.remove('edit-mode');
            }
            
        });
        
        let deleteButton = document.createElement('a');
        deleteButton.classList.add('delete-item');
        deleteButton.textContent = 'удалить';
        deleteButton.href = '';
        deleteButton.addEventListener('click', (event) => {
            event.preventDefault();
            list.removeChild(item);
        });
        
        
        item.appendChild(accept);
        item.appendChild(label);
        item.appendChild(labelAccept);
        item.appendChild(edit);
        item.appendChild(deleteButton);
        return item;
    }
    
    function addItem() {
        let newItem = createItem(input.value);
        input.value = '';
        
        // добавляем дочерний элемент к родительскому
        list.appendChild(newItem)
        nubmerInput++;
    }
    
    // добавим обработчик на кнопку "добавить"
    buttonAdd.addEventListener('click', addItem);
    var nubmerInput = 1;

    // добавим обработчик на "завершить все"
    document.querySelector('#complete-all').addEventListener('change', (event) => {
        let allItems = document.querySelectorAll('.list-item');
        allItems.forEach((item) => {
            toggleComplete(item, event.target.checked);
            item.querySelector('.accept-button').checked = event.target.checked;
        });
    });
})();
