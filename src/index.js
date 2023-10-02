import { init } from 'snabbdom/init'  //导入初始化模块
import { classModule } from 'snabbdom/modules/class'  //类名模块
import { propsModule } from 'snabbdom/modules/props'  //属性模块
import { styleModule } from 'snabbdom/modules/style'  //样式模块
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'  //事件模块
import h from './mySnabbdom/h' //h函数的导入(自定义的)
import patch from './mySnabbdom/patch'  //导入patch函数(自定义的)


const myVnode1 = h('ul', {},
  [h('li', { key: 'A' }, '苹果'),
  h('li', { key: 'B' }, '橘子'),
  h('li', { key: 'C' }, '香蕉'),
  h('li', { key: 'D' }, '西瓜'),
  h('li', { key: 'E' }, '猕猴桃'),
  ])
console.log(myVnode1);
// 模拟第一次上树
const container = document.getElementById('container')  //获取容器
patch(container, myVnode1)

//第二次上树 比较新旧节点patch做出相应的更新
const myVnode2 = h('ul', {}, [
  h('li', { key: 'A' }, '大苹果'),
  h('li', { key: 'B' }, '大橘子'),
  h('li', { key: 'x' }, '香蕉'),
  h('li', { key: 'D' }, '西瓜'),
  h('li', { key: 'E' }, [
    h('div', { key: 'F' }, '猕猴桃皮'),
    h('div', { key: 'G' }, '猕猴桃肉'),
    h('div', { key: 'H' }, '猕猴桃上的一个苍蝇'),
  ]),

])
document.getElementById('btn').onclick = function () {
  patch(myVnode1, myVnode2)
}




