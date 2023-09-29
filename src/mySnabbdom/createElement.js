//真正创建节点
export default function (vnode) {
  //接收vnode创建真实dom节点
  const domNode = document.createElement(vnode.sel);
  // 有子节点还是有文本？
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    // 它内部是文字
    domNode.innerText = vnode.text;
    // 将孤儿节点上树,让标杆节点的父元素调用insertBefore方法,将新的节点插入到标签节点之前

    vnode.elm = domNode
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    //内部有子节点,需要使用递归处理
  }
  // console.log(vnode.elm);  得到真实dom节点
  return vnode.elm
}