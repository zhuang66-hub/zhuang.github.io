import vnode from './vnode.js'
import createElement from './createElement.js'
export default function (oldVnode, newVnode) {   //newVnode 为调用h函数返回的对象
  //判断传入的第一个节点是DOM节点还是虚拟节点
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // 是真实dom节点，此时要包装为虚拟节点
    // toLowerCase为转为小写
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  // 判断oldVnode和newVnode是不是同一个节点
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    //旧节点和新节点是同一个节点，需要精细化比较

  } else {
    // 重新渲染，先插入新节点，再删除老节点
    const newVnodeElm = createElement(newVnode)
    //创建真实dom节点
    //parentNode为获取标杆节点的父元素 insertBefore为插入到标杆节点之前
    oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
  }
}