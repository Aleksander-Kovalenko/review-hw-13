import './styles.css';
import ServerApi from './js/apiServer.js';

const API = new ServerApi();
const refs = {
  card: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
};

refs.form.addEventListener('submit', onSearchQuery);

function onSearchQuery(e) {
  e.preventDefault();
  let query = e.currentTarget.elements.query.value;

  if (query === '') {
    return alert('Попробуйте! И вы удивитесь нашим ответом');
  }

  API.query = query;
  API.getFetch();

  refs.form.reset();
}

//  Проверить будет ли рабоать refs.form.reset(); при событии нажатия на кнопку "Загрузить еще", останется ли у нас  let query при старром вводе.
