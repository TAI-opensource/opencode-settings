import { createSignal, splitProps, type ComponentProps } from "solid-js"

export interface SwitchProps extends ComponentProps<"button"> {
  checked?: boolean
  onChange?: (checked: boolean) => void
  hideLabel?: boolean
  description?: string
}

export function Switch(props: SwitchProps) {
  const [local, others] = splitProps(props, ["checked", "onChange", "children", "hideLabel", "description", "class", "classList"])
  const checked = () => local.checked ?? false

  return (
    <button
      {...others}
      data-component="switch"
      type="button"
      role="switch"
      aria-checked={checked()}
      class={local.class}
      classList={local.classList}
      onClick={() => local.onChange?.(!checked())}
    >
      <span data-slot="switch-control" data-checked={checked()}>
        <span data-slot="switch-thumb" />
      </span>
    </button>
  )
}
