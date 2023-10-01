import createElement from "./createElement";
import updateChildren from "./updateChildren";
export default function patchVNode(oldVnode, newVnode) {
  //旧节点和新节点是同一个节点，需要精细化比较
  //判断新旧Vnode是否为同一对象
  // 是同一个对象
  if (oldVnode === newVnode) return  //注意不是指新节点和旧节点一样
  // 而是指用新节点和把新节点赋值给旧节点和旧节点进行比较 这种情况很少出现

  //不是同一个对象
  // 第一种情况 新Vnode有text属性(没有children)
  if (newVnode.text !== undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
    console.log('新节点有text属性');
    // 判断text属性是否相同  如果相同什么都不做
    if (newVnode.text !== oldVnode.text) {
      oldVnode.elm.innerText = newVnode.text   //用新节点的text属性覆盖旧节点(如果oldVnode是children同样可以innerText也可以覆盖)
    }

  } else {
    // console.log('新节点没有text属性(有children属性)');
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      //老节点和新节点都有children属性 此时需要进行精细化比较
      console.log('新节点老节点都有children');
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      // console.log('老的没有children,新的有children');
      oldVnode.elm.innerHTML = ''  //因为老节点的对应dom节点和新节点是一个节点
      //所以需要先清空老节点里的内容,再将新节点的children追加给老节点
      for (let i = 0; i < newVnode.children.length; i++) {
        const dom = createElement(newVnode.children[i])
        // console.log(dom);
        oldVnode.elm.appendChild(dom)
      }

    }
  }
}