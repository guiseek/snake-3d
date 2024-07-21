// prettier-ignore
function addEvent<T extends Window, E extends keyof WindowEventMap>(event: E, fn: (ev: WindowEventMap[E]) => void, parent?: T): { removeEvent(): void }
// prettier-ignore
function addEvent<T extends Document, E extends keyof DocumentEventMap>(event: E, fn: (ev: DocumentEventMap[E]) => void, parent?: T): { removeEvent(): void }
// prettier-ignore
function addEvent<T extends HTMLElement, E extends keyof HTMLElementEventMap>(event: E, fn: (ev: HTMLElementEventMap[E]) => void, parent?: T): { removeEvent(): void }
// prettier-ignore
function addEvent(event: string, fn: (ev: Event) => void, parent = document): { removeEvent(): void } {
  parent.addEventListener(event, fn)
  const removeEvent = () => parent.removeEventListener(event, fn)
  return { removeEvent }
}

export { addEvent };
