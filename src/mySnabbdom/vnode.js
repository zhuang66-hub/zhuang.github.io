export default function (sel, data, children, text, elm) {
  // sel:选择器
  // data:属性和样式
  // children为子节点
  // text为内容
  // elm为对应的真实dom节点

  return { sel, data, children, text, elm }
}