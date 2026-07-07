import { splitProps, type ComponentProps } from "solid-js"

export function IconButton(props: ComponentProps<"button">) {
  const [local, rest] = splitProps(props, ["class", "classList", "icon", "variant"])
  return (
    <button
      {...rest}
      data-component="icon-button"
      data-variant={local.variant || "secondary"}
      class={local.class}
      classList={local.classList}
    />
  )
}
