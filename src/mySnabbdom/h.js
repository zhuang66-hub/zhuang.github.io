import vnode from './vnode';

// 编写一个低配版的h函数 必须接收3个参数  缺一不可
// 相当于它的重载功能较弱

// 也就是说调用的时候形态必须是下面三种之一
// 形态① h('div', {}, '文字')  //当一个节点只有一个文本子节点的时候
// 形态② h('div', {}, [])  //当一个节点有多个子节点的时候  [h(),h()...]
// 形态③ h('div', {}, h()) //当一个节点只有一个子节点时,可以简写成这样
export default function (sel, data, c) {
  //arguments 代表该函数的实参列表
  //检查参数个数
  if (arguments.length != 3) {
    throw new Error("对不起, h函数必须传入3个参数,我们是低配版h函数")
  }
  //检查c的类型
  // 第一种情况, c是字符串 或者 数字 那么就是形态①
  if (typeof c === 'string' || typeof c === 'number') {
    return vnode(sel, data, undefined, c, undefined)

  } else if (Array.isArray(c)) { // 第二种情况, c是数组,那么就是形态②
    const children = []
    // 遍历c数组
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
        throw new Error('传入的数组参数中有项不是h函数')
      }
      children.push(c[i])
    }
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) { // 第三种情况, c是h函数,那么就是形态③
    //hasOwnProperty(sel)检查c这个对象是否有sel属性
    const children = [c]
    return vnode(sel, data, children, undefined, undefined)
  } else {
    throw new Error("传入的参数类型不对")
  }



}