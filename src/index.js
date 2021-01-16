import './styles.css';

import ServerApi from './js/apiServer.js';

import template from './template/template.hbs';

const API = new ServerApi();

const refs = {
  cardBox: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  loadMore: document.querySelector('.btn'),
};

refs.form.addEventListener('submit', onSearchQuery);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearchQuery(e) {
  e.preventDefault();
  let query = e.currentTarget.elements.query.value;

  if (query === '') {
    return alert('Попробуйте! И вы удивитесь нашим ответом');
  }

  API.query = query;
  API.getFetch().then(renderList);

  onClearInput();
}
function onLoadMore() {
  API.incrementPage();
  API.getFetch().then(renderList);
}

function onClearInput() {
  return refs.form.reset();
}

function renderList(searchArr) {
  const templateCard = template(searchArr);
  refs.cardBox.insertAdjacentHTML('beforeend', templateCard);
}
