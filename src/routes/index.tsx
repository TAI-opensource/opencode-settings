import { createSignal, For, Show } from "solid-js"
import { Icon } from "../components/icon"
import { Switch } from "../components/switch"
import { Select } from "../components/select"
import { TextField } from "../components/text-field"
import { Button } from "../components/button"
import { Card, CardTitle } from "../components/card"
import { Tabs } from "../components/tabs"
import { Tag } from "../components/tag"
import { Tooltip } from "../components/tooltip"

const providers = [
  { id: "openai", name: "OpenAI", connected: true, tag: "env" as const },
  { id: "anthropic", name: "Anthropic", connected: true, tag: "api" as const },
  { id: "google", name: "Google", connected: false, tag: "config" as const },
  { id: "azure", name: "Azure", connected: false, tag: "custom" as const },
  { id: "xai", name: "xAI", connected: false, tag: "env" as const },
  { id: "groq", name: "Groq", connected: false, tag: "api" as const },
]

const shortcuts = [
  { category: "General", items: [
    { name: "Open Settings", keys: "mod+comma" },
    { name: "Command Palette", keys: "mod+k" },
    { name: "New Session", keys: "mod+n" },
  ]},
  { category: "Session", items: [
    { name: "Send Message", keys: "Enter" },
    { name: "Cancel Generation", keys: "Escape" },
    { name: "Toggle Sidebar", keys: "mod+b" },
  ]},
  { category: "Navigation", items: [
    { name: "Go to Home", keys: "mod+1" },
    { name: "Go to Session", keys: "mod+2" },
    { name: "Next Tab", keys: "mod+]" },
    { name: "Previous Tab", keys: "mod+[" },
  ]},
]

const permissions = [
  { action: "bash", resource: "*", effect: "ask" as const },
  { action: "write", resource: "*.ts", effect: "allow" as const },
  { action: "write", resource: "*.tsx", effect: "allow" as const },
  { action: "edit", resource: "*", effect: "ask" as const },
  { action: "webfetch", resource: "*", effect: "allow" as const },
]

export default function SettingsPage() {
  const [tab, setTab] = createSignal("providers")
  const [colorScheme, setColorScheme] = createSignal<"light" | "dark" | "system">("system")
  const [autoAccept, setAutoAccept] = createSignal(false)
  const [proxyEnabled, setProxyEnabled] = createSignal(false)
  const [proxyUrl, setProxyUrl] = createSignal("")
  const [designVersion, setDesignVersion] = createSignal<"v1" | "v2">("v2")
  const [recordingShortcut, setRecordingShortcut] = createSignal<string | null>(null)

  return (
    <div class="settings-layout">
      <nav class="settings-sidebar">
        <div class="settings-sidebar-title">Settings</div>
        <For each={[
          { id: "providers", icon: "providers", label: "Providers" },
          { id: "shortcuts", icon: "keyboard", label: "Shortcuts" },
          { id: "permissions", icon: "warning", label: "Permissions" },
          { id: "network", icon: "server", label: "Network" },
          { id: "demo", icon: "code", label: "Demo V1/V2" },
        ]}>
          {(item) => (
            <button
              class="settings-sidebar-item"
              data-active={tab() === item.id}
              onClick={() => setTab(item.id)}
            >
              <Icon name={item.icon} />
              {item.label}
            </button>
          )}
        </For>
      </nav>

      <main class="settings-main">
        <Show when={tab() === "providers"}>
          <div class="settings-section">
            <h3 class="settings-section-title">Connected Providers</h3>
            <div class="settings-list">
              <For each={providers.filter(p => p.connected)}>
                {(provider) => (
                  <div class="settings-row">
                    <div class="settings-row-copy">
                      <div class="settings-row-title">{provider.name}</div>
                      <div class="settings-row-description">Connected via {provider.tag}</div>
                    </div>
                    <div class="settings-row-control">
                      <Tag>{provider.tag}</Tag>
                      <Button variant="ghost" size="sm">Disconnect</Button>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>

          <div class="settings-section">
            <h3 class="settings-section-title">Available Providers</h3>
            <div class="settings-list">
              <For each={providers.filter(p => !p.connected)}>
                {(provider) => (
                  <div class="settings-row">
                    <div class="settings-row-copy">
                      <div class="settings-row-title">{provider.name}</div>
                      <div class="settings-row-description">Connect to use {provider.name} models</div>
                    </div>
                    <div class="settings-row-control">
                      <Button variant="primary" size="sm">Connect</Button>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>

        <Show when={tab() === "shortcuts"}>
          <For each={shortcuts}>
            {(group) => (
              <div class="settings-section">
                <h3 class="settings-section-title">{group.category}</h3>
                <div class="settings-list">
                  <For each={group.items}>
                    {(shortcut) => (
                      <div class="settings-row">
                        <div class="settings-row-copy">
                          <div class="settings-row-title">{shortcut.name}</div>
                        </div>
                        <div class="settings-row-control">
                          <button
                            class="keybind-btn"
                            data-recording={recordingShortcut() === shortcut.name}
                            onClick={() => setRecordingShortcut(
                              recordingShortcut() === shortcut.name ? null : shortcut.name
                            )}
                          >
                            {shortcut.keys}
                          </button>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            )}
          </For>
        </Show>

        <Show when={tab() === "permissions"}>
          <div class="settings-section">
            <h3 class="settings-section-title">Permission Settings</h3>
            <div class="settings-list">
              <div class="settings-row">
                <div class="settings-row-copy">
                  <div class="settings-row-title">Auto-accept permissions</div>
                  <div class="settings-row-description">Automatically approve tool permissions</div>
                </div>
                <div class="settings-row-control">
                  <Switch checked={autoAccept()} onChange={setAutoAccept} />
                </div>
              </div>
            </div>
          </div>

          <div class="settings-section">
            <h3 class="settings-section-title">Permission Rules</h3>
            <div class="settings-list">
              <For each={permissions}>
                {(rule) => (
                  <div class="settings-row">
                    <div class="settings-row-copy">
                      <div class="settings-row-title">
                        <code style={{ "font-family": "var(--font-family-mono)" }}>{rule.action}</code>
                        {" → "}
                        <code style={{ "font-family": "var(--font-family-mono)" }}>{rule.resource}</code>
                      </div>
                    </div>
                    <div class="settings-row-control">
                      <Tag variant={rule.effect === "allow" ? "success" : rule.effect === "deny" ? "error" : "warning"}>
                        {rule.effect}
                      </Tag>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>

        <Show when={tab() === "network"}>
          <div class="settings-section">
            <h3 class="settings-section-title">Proxy Configuration</h3>
            <div class="settings-list">
              <div class="settings-row">
                <div class="settings-row-copy">
                  <div class="settings-row-title">Enable Proxy</div>
                  <div class="settings-row-description">Route requests through a proxy server</div>
                </div>
                <div class="settings-row-control">
                  <Switch checked={proxyEnabled()} onChange={setProxyEnabled} />
                </div>
              </div>
              <Show when={proxyEnabled()}>
                <div class="settings-row">
                  <div class="settings-row-copy">
                    <div class="settings-row-title">Proxy URL</div>
                    <div class="settings-row-description">HTTP/HTTPS proxy URL</div>
                  </div>
                  <div class="settings-row-control">
                    <TextField
                      value={proxyUrl()}
                      onChange={setProxyUrl}
                      placeholder="http://proxy:8080"
                      style={{ width: "240px" }}
                    />
                  </div>
                </div>
              </Show>
            </div>
          </div>

          <div class="settings-section">
            <h3 class="settings-section-title">Connection Settings</h3>
            <div class="settings-list">
              <div class="settings-row">
                <div class="settings-row-copy">
                  <div class="settings-row-title">Request Timeout</div>
                  <div class="settings-row-description">Timeout for API requests in seconds</div>
                </div>
                <div class="settings-row-control">
                  <TextField
                    value="30"
                    placeholder="30"
                    style={{ width: "80px" }}
                  />
                </div>
              </div>
              <div class="settings-row">
                <div class="settings-row-copy">
                  <div class="settings-row-title">SSL Verification</div>
                  <div class="settings-row-description">Verify SSL certificates</div>
                </div>
                <div class="settings-row-control">
                  <Switch checked={true} />
                </div>
              </div>
            </div>
          </div>
        </Show>

        <Show when={tab() === "demo"}>
          <div class="settings-section">
            <h3 class="settings-section-title">Design System Version</h3>
            <div class="settings-list">
              <div class="settings-row">
                <div class="settings-row-copy">
                  <div class="settings-row-title">Active Version</div>
                  <div class="settings-row-description">Switch between V1 and V2 design tokens</div>
                </div>
                <div class="settings-row-control">
                  <Select
                    options={[
                      { value: "v1", label: "V1 (Legacy)" },
                      { value: "v2", label: "V2 (Current)" },
                    ]}
                    value={designVersion()}
                    onSelect={(v) => v && setDesignVersion(v as "v1" | "v2")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="settings-section">
            <h3 class="settings-section-title">Color Palette Comparison</h3>
            <Show when={designVersion() === "v1"}>
              <div class="settings-list">
                <div class="settings-row">
                  <div class="settings-row-copy">
                    <div class="settings-row-title">V1 Background</div>
                  </div>
                  <div class="settings-row-control">
                    <div style={{ "background": "var(--background-base)", width: "48px", height: "24px", "border-radius": "4px", "border": "1px solid var(--border-weak-base)" }} />
                  </div>
                </div>
                <div class="settings-row">
                  <div class="settings-row-copy">
                    <div class="settings-row-title">V1 Text Strong</div>
                  </div>
                  <div class="settings-row-control">
                    <div style={{ "background": "var(--text-strong)", width: "48px", height: "24px", "border-radius": "4px" }} />
                  </div>
                </div>
                <div class="settings-row">
                  <div class="settings-row-copy">
                    <div class="settings-row-title">V1 Interactive</div>
                  </div>
                  <div class="settings-row-control">
                    <div style={{ "background": "var(--text-interactive-base)", width: "48px", height: "24px", "border-radius": "4px" }} />
                  </div>
                </div>
                <div class="settings-row">
                  <div class="settings-row-copy">
                    <div class="settings-row-title">V1 Success</div>
                  </div>
                  <div class="settings-row-control">
                    <div style={{ "background": "var(--icon-success-base)", width: "48px", height: "24px", "border-radius": "4px" }} />
                  </div>
                </div>
                <div class="settings-row">
                  <div class="settings-row-copy">
                    <div class="settings-row-title">V1 Warning</div>
                  </div>
                  <div class="settings-row-control">
                    <div style={{ "background": "var(--icon-warning-base)", width: "48px", height: "24px", "border-radius": "4px" }} />
                  </div>
                </div>
                <div class="settings-row">
                  <div class="settings-row-copy">
                    <div class="settings-row-title">V1 Error</div>
                  </div>
                  <div class="settings-row-control">
                    <div style={{ "background": "var(--icon-critical-base)", width: "48px", height: "24px", "border-radius": "4px" }} />
                  </div>
                </div>
              </div>
            </Show>
            <Show when={designVersion() === "v2"}>
              <div class="settings-list">
                <div class="settings-row">
                  <div class="settings-row-copy">
                    <div class="settings-row-title">V2 Background</div>
                  </div>
                  <div class="settings-row-control">
                    <div style={{ "background": "var(--v2-background-bg-base)", width: "48px", height: "24px", "border-radius": "4px", "border": "1px solid var(--v2-border-border-base)" }} />
                  </div>
                </div>
                <div class="settings-row">
                  <div class="settings-row-copy">
                    <div class="settings-row-title">V2 Text Base</div>
                  </div>
                  <div class="settings-row-control">
                    <div style={{ "background": "var(--v2-text-text-base)", width: "48px", height: "24px", "border-radius": "4px" }} />
                  </div>
                </div>
                <div class="settings-row">
                  <div class="settings-row-copy">
                    <div class="settings-row-title">V2 Accent</div>
                  </div>
                  <div class="settings-row-control">
                    <div style={{ "background": "var(--v2-text-text-accent)", width: "48px", height: "24px", "border-radius": "4px" }} />
                  </div>
                </div>
                <div class="settings-row">
                  <div class="settings-row-copy">
                    <div class="settings-row-title">V2 Success</div>
                  </div>
                  <div class="settings-row-control">
                    <div style={{ "background": "var(--v2-state-bg-success)", width: "48px", height: "24px", "border-radius": "4px", "border": "1px solid var(--v2-state-border-success)" }} />
                  </div>
                </div>
                <div class="settings-row">
                  <div class="settings-row-copy">
                    <div class="settings-row-title">V2 Warning</div>
                  </div>
                  <div class="settings-row-control">
                    <div style={{ "background": "var(--v2-state-bg-warning)", width: "48px", height: "24px", "border-radius": "4px", "border": "1px solid var(--v2-state-border-warning)" }} />
                  </div>
                </div>
                <div class="settings-row">
                  <div class="settings-row-copy">
                    <div class="settings-row-title">V2 Danger</div>
                  </div>
                  <div class="settings-row-control">
                    <div style={{ "background": "var(--v2-state-bg-danger)", width: "48px", height: "24px", "border-radius": "4px", "border": "1px solid var(--v2-state-border-danger)" }} />
                  </div>
                </div>
              </div>
            </Show>
          </div>

          <div class="settings-section">
            <h3 class="settings-section-title">Component Preview</h3>
            <div class="settings-list">
              <div class="settings-row">
                <div class="settings-row-copy">
                  <div class="settings-row-title">Buttons</div>
                </div>
                <div class="settings-row-control" style={{ gap: "8px" }}>
                  <Button variant="primary" size="sm">Primary</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="ghost" size="sm">Ghost</Button>
                </div>
              </div>
              <div class="settings-row">
                <div class="settings-row-copy">
                  <div class="settings-row-title">Tags</div>
                </div>
                <div class="settings-row-control" style={{ gap: "8px" }}>
                  <Tag>default</Tag>
                  <Tag variant="success">success</Tag>
                  <Tag variant="warning">warning</Tag>
                  <Tag variant="error">error</Tag>
                </div>
              </div>
              <div class="settings-row">
                <div class="settings-row-copy">
                  <div class="settings-row-title">Avatars</div>
                </div>
                <div class="settings-row-control" style={{ gap: "8px" }}>
                  <For each={["orange", "blue", "green", "purple", "pink", "cyan"]}>
                    {(color) => (
                      <div style={{
                        width: "32px", height: "32px", "border-radius": "50%",
                        background: `var(--v2-avatar-bg-${color})`,
                        border: `2px solid var(--v2-avatar-border-${color})`,
                        display: "flex", "align-items": "center", "justify-content": "center",
                        color: "var(--v2-avatar-fg)", "font-size": "12px", "font-weight": "600"
                      }}>
                        {color[0].toUpperCase()}
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </div>
        </Show>
      </main>
    </div>
  )
}
