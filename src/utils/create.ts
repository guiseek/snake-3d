export const create = <
  K extends keyof HTMLElementTagNameMap,
  A extends HTMLElementTagNameMap[K]
>(
  name: K,
  attrs: Partial<A> = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(name);
  element.append(...children);
  return Object.assign(element, attrs);
};
