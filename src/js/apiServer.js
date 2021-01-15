export default class apiServer {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async getFetch() {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '19724495-11683e473f3bf588d4ff86f50';

    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    const requestOnServer = await fetch(url);

    try {
      const response = await requestOnServer.json();
      return response.hits;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }
  startPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    const validate = /[a-zA-Z0-9]+/.test(newQuery);
    if (!validate) {
      return alert('А меня научишь?');
    }
    this.searchQuery = newQuery;
  }
}
