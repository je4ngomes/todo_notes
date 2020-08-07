const form = document.querySelector('.todo_form');
const titleTask = document.querySelector('.title__task');
const addButton = document.querySelector('.add_button');

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  axios.post('api/create_task.php', data)
    .then(({ data }) => {
      if (data.result) {
        M.toast({html: 'Nova tarefa adicionada com sucesso.'});
      } else {
        M.toast({html: 'Erro ao inserir nova tarefa.'});
      }

    document.querySelector('input[name=title]').value = '';
    document.querySelector('input[name=description]').value = '';
    document.querySelector('input[name=image_url]').value = '';
    }).catch(e => {
      console.error(e);
    });
});