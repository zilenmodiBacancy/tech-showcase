export function applyTheme<T extends Record<string, string | number>>(
  theme: T
): void {
  const root = document.documentElement
  Object.keys(theme).forEach((cssVar) => {
    root.style.setProperty(cssVar, String(theme[cssVar])) // Ensure the value is a string
  })
}
