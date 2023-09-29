import { init } from 'snabbdom/init'  //导入初始化模块
import { classModule } from 'snabbdom/modules/class'  //类名模块
import { propsModule } from 'snabbdom/modules/props'  //属性模块
import { styleModule } from 'snabbdom/modules/style'  //样式模块
import { eventListenersModule } from 'snabbdom/modules/eventlisteners'  //事件模块
import { h } from 'snabbdom/h'  //h函数的导入

// 创建patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

const vnode1 = h('ul', {}, [
  h('li', { key: '1' }, '苹果'),
  h('li', { key: '2' }, '香蕉'),
  h('li', { key: '3' }, '西瓜'),
])

const vnode2 = h('ul', {}, h('selection', {}, [
  h('li', { key: '4' }, '西葫芦'),
  h('li', { key: '1' }, '苹果'),
  h('li', { key: '2' }, '香蕉'),
  h('li', { key: '3' }, '西瓜'),]))


const container = document.getElementById('container')
const btn = document.getElementById('btn')
// 点击按钮让vnode1变为vnode2

btn.onclick = () => {
  patch(vnode1, vnode2)
}

patch(container, vnode1)