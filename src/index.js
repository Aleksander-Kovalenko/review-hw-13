import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import LoadMoreBtn from './js/load-more-bnt.js';
import ServerApi from './js/apiServer.js';
import reference from './js/references.js';
import template from './template/template.hbs';

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const API = new ServerApi();

const ref = reference();

ref.form.addEventListener('submit', onSearchQuery);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearchQuery(e) {
  e.preventDefault();

  API.startPage();
  loadMoreBtn.show();

  let query = e.currentTarget.elements.query.value;
  if (query === '') {
    return alert('Попробуйте! И вы удивитесь нашим ответом');
  }
  API.query = query;
  API.getFetch().then(renderList);

  onResetSearch();
}

function onLoadMore() {
  loadMoreBtn.disable();
  API.incrementPage();
  API.getFetch().then(renderList);
}

function onResetSearch() {
  ref.form.reset();
  ref.cardBox.innerHTML = '';
}

function renderList(searchArr) {
  statusBtn(searchArr.length);
  const templateCard = template(searchArr);
  ref.cardBox.insertAdjacentHTML('beforeend', templateCard);
}

function statusBtn(length) {
  length < 12 && loadMoreBtn.hide();
  length === 12 && loadMoreBtn.enable();
}
