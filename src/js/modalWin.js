// basicLightbox
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export default function getImg(e) {
  e.preventDefault();
  if (e.target.nodeName === 'IMG') {
    console.log(e.target.dataset.source);
    const instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}" width="800" height="600">
`);
    instance.show();
  }
}
