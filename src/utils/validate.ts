/**
 * 是否为外链
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

//计算出对比色
export function calcContrastColor(color: string): string {
  if (!color.startsWith('rgb')) {
    return '#c6d3dd'
  }

  const standardColor = color.startsWith('rgba') ? Number(color.slice(5, -1).split(',')[0]) : Number(color.slice(4, -1).split(',')[0])
  if (standardColor > Math.floor(200)) {
    return '#c6d3dd'
  } else {
    return '#c6d3dd'
  }
}
