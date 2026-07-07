import { createSignal, For, Show, splitProps, type ComponentProps, type JSX } from "solid-js"

export interface SelectProps<T> {
  options: { value: string; label: string }[]
  value?: string
  onSelect?: (value: string) => void
  placeholder?: string
  class?: string
  style?: JSX.CSSProperties
}

export function Select<T>(props: SelectProps<T>) {
  const [local, others] = splitProps(props, ["options", "value", "onSelect", "placeholder", "class", "style"])
  const [open, setOpen] = createSignal(false)
  const selected = () => local.options.find(o => o.value === local.value)

  return (
    <div data-component="select" class={local.class} style={local.style} {...others}>
      <button
        data-slot="select-trigger"
        type="button"
        onClick={() => setOpen(!open())}
        aria-expanded={open()}
      >
        <span data-slot="select-value">
          {selected()?.label ?? local.placeholder ?? "Select..."}
        </span>
        <svg data-slot="select-icon" viewBox="0 0 20 20" width="16" height="16">
          <path d="M6.6665 8.33325L9.99984 11.6666L13.3332 8.33325" stroke="currentColor" stroke-linecap="square" fill="none"/>
        </svg>
      </button>
      <Show when={open()}>
        <div data-slot="select-content" onClick={() => setOpen(false)}>
          <For each={local.options}>
            {(option) => (
              <div
                data-slot="select-item"
                data-selected={option.value === local.value}
                onClick={() => local.onSelect?.(option.value)}
              >
                <span>{option.label}</span>
                <Show when={option.value === local.value}>
                  <svg data-slot="select-item-indicator" viewBox="0 0 20 20" width="16" height="16">
                    <path d="M5 11.9657L8.37838 14.7529L15 5.83398" stroke="currentColor" stroke-linecap="square" fill="none"/>
                  </svg>
                </Show>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  )
}
