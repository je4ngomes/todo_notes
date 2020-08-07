const form = document.querySelector('.todo_form');
const addButton = document.querySelector('.add_button');

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  axios.post('api/edit_task.php', {...data, id})
    .then(({ data }) => {
      if (data.result) {
        M.toast({html: 'Anotação salva com sucesso.'});
        document.location.href = 'view.html'
      } else {
        M.toast({html: 'Erro ao salvar nova tarefa.'});
      }
    }).catch(e => {
      console.error(e);
    });
});

axios.get('api/select_task.php', { params: { id } })
  .then(({ data }) => {
    if (data.result) {
      const item = data.result;

      document.querySelector('input[name=title]').value = item.title;
      document.querySelector('input[name=description]').value = item.description;
      document.querySelector('input[name=image_url]').value = item.image_url;
    }
  });