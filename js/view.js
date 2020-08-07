const editButton = document.querySelector('.edit_button');
const removeButton = document.querySelector('.remove_button');
const search = document.querySelector('input[name=search_task]');

const state = {
    data: []
};

const templateItemString = (item) => (`
<div id="${item.id_task}" class="input-field col s8 offset-s2">
    <div class="card horizontal">
        <div class="card-image">
            <img style="max-width: 230px;max-height: 150px;" src="${item.image_url && item.image_url.trim() !== '' ? item.image_url : 'https://www.fromthegrapevine.com/static/img/not_available.png'}">
            </div>
            <div class="card-stacked">
            <div class="card-content">
                <h5>${item.title}</h5>
                <p>${item.description}</p>
                <div class="button_floating" style="float:right;">
                    <a href="edit.html?id=${item.id_task}" class="edit_button btn-floating btn-medium waves-effect waves-light red"><i class="material-icons">edit</i></a>
                    <button onClick="handleRemoveClick(event, ${item.id_task})" class="remove_button btn-floating btn-medium waves-effect waves-light red"><i class="material-icons">remove</i></button>
                </div>
            </div>
        </div>
    </div>
</div>      
`);

const insertItemInList = (item) => {
  document.querySelector('.list')
    .insertAdjacentHTML('beforeend', templateItemString(item))
}

const fetchTask = () => {
  axios.get('api/select_tasks')
    .then(({ data }) => {
      if (data.result) {
        data.result.forEach(insertItemInList);
        state.data = data.result;
      }
    })
}

const deleteAllChildrenList = () => {
    const listNode = document.querySelector('.list');

    while(listNode.firstChild) {
        listNode.removeChild(listNode.firstChild);
    }
};

const handleRemoveClick = (e, id) => {
  e.preventDefault();
  axios.post('api/delete_task.php', { id_task: id })
    .then(({ data }) => {
      if (data.result) {
        M.toast({html: 'Tarefa deletada com sucesso.'});
        
        state.data = state.data.filter(item => item.id_task != id);
        document.getElementById(id).remove();
      } else {
        M.toast({html: 'Erro ao deletar tarefa.'});
      }
    }).catch(e => {
      console.error(e);
    });
};

search.addEventListener('keyup', (e) => {
    e.preventDefault();
    const searchString = e.target.value;

    deleteAllChildrenList();
    state.data.filter(item => item.title.match(new RegExp(searchString, 'i')) || item.description.match(new RegExp(searchString, 'i')))
        .forEach(insertItemInList);
});

fetchTask();