import { splitProps, type ComponentProps, Show } from "solid-js"
import { Icon, type IconProps } from "./icon"

export interface ButtonProps extends ComponentProps<"button"> {
  size?: "small" | "normal" | "large"
  variant?: "primary" | "secondary" | "ghost"
  icon?: IconProps["name"]
}

export function Button(props: ButtonProps) {
  const [split, rest] = splitProps(props, ["variant", "size", "icon", "class", "classList"])

  return (
    <button
      {...rest}
      data-component="button"
      data-size={split.size || "normal"}
      data-variant={split.variant || "secondary"}
      data-icon={split.icon}
      class={split.class}
      classList={split.classList}
    >
      <Show when={split.icon}>
        <Icon name={split.icon!} size="small" />
      </Show>
      {props.children}
    </button>
  )
}
