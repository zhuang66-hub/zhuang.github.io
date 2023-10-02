import { init } from 'snabbdom/init'  //导入初始化模块
import { classModule } from 'snabbdom/modules/class'  //类名模块
import { propsModule } from 'snabbdom/modules/props'  //属性模块
import { styleModule } from 'snabbdom/modules/style'  //样式模块
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'  //事件模块
import h from './mySnabbdom/h' //h函数的导入(自定义的)
import patch from './mySnabbdom/patch'  //导入patch函数(自定义的)


const myVnode1 = h('ul', {},
  [h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E'),
  ])
console.log(myVnode1);

const container = document.getElementById('container')  //获取容器
patch(container, myVnode1)

//第二次上树 比较新旧节点patch做出相应的更新
const myVnode2 = h('ul', {}, [
  h('li', { key: 'Q' }, 'Q'),
  h('li', { key: 'A' }, 'A'),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D'),
  h('li', { key: 'E' }, 'E'),
])
document.getElementById('btn').onclick = function () {
  patch(myVnode1, myVnode2)
}




