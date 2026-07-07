import { splitProps, type ComponentProps } from "solid-js"

export function Popover(props: ComponentProps<"div">) {
  const [local, rest] = splitProps(props, ["class", "classList", "children"])
  return (
    <div
      {...rest}
      data-component="popover"
      class={local.class}
      classList={local.classList}
    >
      {local.children}
    </div>
  )
}
