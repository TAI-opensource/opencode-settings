import { createSignal, splitProps, type ComponentProps, type JSX } from "solid-js"

export interface TooltipProps extends ComponentProps<"div"> {
  value: JSX.Element
  class?: string
  contentClass?: string
  forceOpen?: boolean
}

export function Tooltip(props: TooltipProps) {
  const [local, others] = splitProps(props, ["children", "class", "contentClass", "value", "forceOpen"])
  const [show, setShow] = createSignal(false)

  return (
    <div
      {...others}
      data-component="tooltip-trigger"
      class={local.class}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style="position: relative; display: inline-flex;"
    >
      {local.children}
      {show() || local.forceOpen ? (
        <div data-component="tooltip" class={local.contentClass}>
          {local.value}
        </div>
      ) : null}
    </div>
  )
}
