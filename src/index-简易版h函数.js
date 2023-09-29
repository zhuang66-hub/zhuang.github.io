import h from './mySnabbdom/h.js';

const myVnode1 = h('ul', {}, [
  h('li', {}, '苹果'),
  h('li', {}, '香蕉'),
  h('li', { class: { 'orange': true } }, [
    h('div', {}, '橘子皮'),
    h('div', {}, '橘子肉')
  ]),
])
console.log(myVnode1);
