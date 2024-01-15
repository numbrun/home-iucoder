export type navIconConfig = {
  url: string,
  type: 'icon' | 'component' | 'add',
  name: string,
  src: string,
  size: string
  sizeText?: string
  id?: string
  component?: string
}

export type GridComponentTy = {
  url: string,
  type: 'component',
  name: string,
  src: string
}

export interface GrideModuleTy {
  navIconConfig: Array<navIconConfig>,
  component: Array<GridComponentTy>
}
