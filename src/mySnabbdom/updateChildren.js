import patchVnode from './patchVnode'
import createElement from './createElement';
function CheckSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key
}
export default function updateChildren(parentElm, oldCh, newCh) {
  //parentElm表示父节点
  //oldCh表示老节点的子节点
  //newCh表示新节点的子节点
  console.log(parentElm, oldCh, newCh);
  //新前 
  let newStartIdx = 0
  //新后
  let newEndIdx = newCh.length - 1
  //旧前 
  let oldStartIdx = 0
  //旧后
  let oldEndIdx = oldCh.length - 1

  // 新前节点
  let newStartVnode = newCh[0]
  //新后节点 
  let newEndVnode = newCh[newEndIdx]
  // 旧前节点
  let oldStartVnode = oldCh[0]
  // 旧后节点 
  let oldEndVnode = oldCh[oldEndIdx]
  // console.log(oldStartIdx, newEndIdx);
  // 开始节点更新策略
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // console.log('循环了');
    if (CheckSameVnode(oldStartVnode, newStartVnode)) {
      console.log('①新前和旧前命中');
      patchVnode(oldStartVnode, newStartVnode)
      //命中后指针位置发生变化
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (CheckSameVnode(oldEndVnode, newEndVnode)) {
      console.log('②新后和旧后命中');
      patchVnode(oldEndVnode, newEndVnode)
      //命中后指针位置发生变化
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (CheckSameVnode(oldStartVnode, newEndVnode)) {
      console.log('③新后和旧前命中');
      patchVnode(oldStartVnode, newEndVnode)
      //命中后指针位置发生变化
      //当新后和旧前命中时,此时要移动节点,移动新前指向的这个节点到老节点的旧后的后面
      //如何移动节点? 只要插入一个已经在dom树上的节点,它就会被移动
      //为什么插入的是oldStartVnode 因为上面调用patchVnode(oldStartVnode, newEndVnode)已经将newEndVnode赋值给oldStartVnode了
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)  //如果标杆为null/undefined 那么就相当于在最后插入
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (CheckSameVnode(oldEndVnode, newStartVnode)) {
      console.log('④新前和旧后命中');
      patchVnode(oldEndVnode, newStartVnode)
      //命中后指针位置发生变化
      //当新前和旧后命中时,此时要移动节点,移动新前指向的这个节点到老节点的旧后的后面
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      //都不匹配
    }
  }
  // 继续看看有没有剩余的
  if (newStartIdx <= newEndIdx) {
    console.log('新节点还有没有处理的节点');
    //那么就是添加操作
    // 设置一个标杆
    const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm  //注意双等于的话 undefined等于null
    //继续处理未上树的节点
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // insertBefore方法的标杆如果为null的话会自动识别把要创建的节点安排到末尾
      parentElm.insertBefore(createElement(newCh[i]), before)
    }
  } else if (oldStartIdx < oldEndIdx) {
    console.log('旧节点还有没有处理的节点');
    //那么就是删除操作
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      parentElm.removeChild(oldCh[i])
    }
  }
}