import { createSignal, For, splitProps, type ComponentProps, type JSX } from "solid-js"

export interface TabsProps extends ComponentProps<"div"> {
  value?: string
  onChange?: (value: string) => void
  orientation?: "horizontal" | "vertical"
}

function TabsRoot(props: TabsProps) {
  const [split, rest] = splitProps(props, ["class", "classList", "variant", "orientation"])
  return (
    <div
      {...rest}
      data-component="tabs"
      data-variant={split.variant || "normal"}
      data-orientation={split.orientation || "horizontal"}
      class={split.class}
      classList={split.classList}
    />
  )
}

function TabsList(props: ComponentProps<"div">) {
  const [split, rest] = splitProps(props, ["class", "classList"])
  return (
    <div
      {...rest}
      data-slot="tabs-list"
      class={split.class}
      classList={split.classList}
    />
  )
}

function TabsTrigger(props: ComponentProps<"button"> & { value: string }) {
  const [split, rest] = splitProps(props, ["class", "classList", "children", "value"])
  return (
    <button
      {...rest}
      data-slot="tabs-trigger"
      data-value={split.value}
      class={split.class}
      classList={split.classList}
      type="button"
    >
      {split.children}
    </button>
  )
}

function TabsContent(props: ComponentProps<"div"> & { value: string }) {
  const [split, rest] = splitProps(props, ["class", "classList", "children", "value"])
  return (
    <div
      {...rest}
      data-slot="tabs-content"
      data-value={split.value}
      class={split.class}
      classList={split.classList}
    >
      {split.children}
    </div>
  )
}

function TabsSectionTitle(props: ComponentProps<"div">) {
  const [split, rest] = splitProps(props, ["class", "classList", "children"])
  return (
    <div
      {...rest}
      data-slot="tabs-section-title"
      class={split.class}
      classList={split.classList}
    >
      {split.children}
    </div>
  )
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  SectionTitle: TabsSectionTitle,
})
