import { splitProps, type ComponentProps } from "solid-js"

export interface TagProps extends ComponentProps<"span"> {
  variant?: "default" | "success" | "warning" | "error" | "info"
}

export function Tag(props: TagProps) {
  const [local, rest] = splitProps(props, ["variant", "class", "classList"])
  return (
    <span
      {...rest}
      data-component="tag"
      data-variant={local.variant || "default"}
      class={local.class}
      classList={local.classList}
    />
  )
}
