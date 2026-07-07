import { createSignal, Show, splitProps, type ComponentProps } from "solid-js"

export interface DialogProps extends ComponentProps<"dialog"> {
  size?: "small" | "normal" | "large" | "x-large"
  variant?: string
}

export function Dialog(props: DialogProps) {
  const [local, rest] = splitProps(props, ["size", "variant", "class", "classList", "children"])
  const [open, setOpen] = createSignal(false)

  return (
    <>
      <dialog
        {...rest}
        data-component="dialog"
        data-size={local.size || "normal"}
        data-variant={local.variant}
        class={local.class}
        classList={local.classList}
        open={open()}
      >
        <div data-slot="dialog-content">
          {local.children}
        </div>
      </dialog>
    </>
  )
}
