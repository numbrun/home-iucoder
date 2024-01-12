export type GridIconTy = {
  url: string,
  type: 'icon',
  name: string,
  src: string
}

export type GridComponentTy = {
  url: string,
  type: 'component',
  name: string,
  src: string
}

export interface GrideModuleTy {
  navIconConfig: Array<GridIconTy>,
  component: Array<GridComponentTy>
}
