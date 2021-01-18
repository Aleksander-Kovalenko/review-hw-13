import './styles.css';
// BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
// basicLightbox
import * as basicLightbox from 'basiclightbox';
// NOTIFYCATION
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { info, error } from '@pnotify/core';

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
  let query = e.currentTarget.elements.query.value;
  if (query === '') {
    return info({
      text: 'Попробуйте! И вы удивитесь нашим ответом',
      delay: 3000,
    });
  } else {
    loadMoreBtn.show();
  }
  API.query = query;
  API.getFetch().then(renderList);
  onResetSearch();
}

function onLoadMore() {
  loadMoreBtn.disable();
  API.incrementPage();
  API.getFetch().then(response => {
    renderList(response);
    window.scrollTo({
      top: document.documentElement.clientHeight,
      behavior: 'smooth',
    });
  });
}

function onResetSearch() {
  ref.form.reset();
  ref.cardBox.innerHTML = '';
}

function renderList(searchArr) {
  const templateCard = template(searchArr);
  ref.cardBox.insertAdjacentHTML('beforeend', templateCard);
  statusButton(searchArr.length);
}

function statusButton(length) {
  length < 12 && loadMoreBtn.hide();
  length === 12 && loadMoreBtn.enable();
  length === 0 &&
    info({
      text: 'Эволюции еще слишком рано к таким запросам.',
      delay: 3000,
    });
}
