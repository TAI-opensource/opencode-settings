import { createSignal, splitProps, type ComponentProps, type JSX } from "solid-js"

export interface TextFieldProps extends ComponentProps<"input"> {
  label?: string
  hideLabel?: boolean
  description?: string
  error?: string
  variant?: "normal" | "ghost"
  multiline?: boolean
  value?: string
  onChange?: (value: string) => void
}

export function TextField(props: TextFieldProps) {
  const [local, others] = splitProps(props, [
    "label", "hideLabel", "description", "error", "variant", "multiline", "value", "onChange", "class"
  ])

  return (
    <div data-component="input" data-variant={local.variant || "normal"} class={local.class}>
      <Show when={local.label}>
        <label data-slot="input-label" classList={{ "sr-only": local.hideLabel }}>
          {local.label}
        </label>
      </Show>
      <div data-slot="input-wrapper">
        <Show
          when={local.multiline}
          fallback={
            <input
              {...others}
              data-slot="input-input"
              value={local.value}
              onInput={(e) => local.onChange?.(e.currentTarget.value)}
            />
          }
        >
          <textarea
            data-slot="input-input"
            value={local.value}
            onInput={(e) => local.onChange?.(e.currentTarget.value)}
          />
        </Show>
      </div>
      <Show when={local.description}>
        <div data-slot="input-description">{local.description}</div>
      </Show>
      <Show when={local.error}>
        <div data-slot="input-error">{local.error}</div>
      </Show>
    </div>
  )
}
