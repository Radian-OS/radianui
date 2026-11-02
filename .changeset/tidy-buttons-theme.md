---
"radianui": patch
---

Read optional component settings from presets and forward them through new and existing project installation. Apply Button size and variant defaults in the installed component source, using its existing Tailwind variants while preserving explicit props. ButtonGroup shares the defaults; CompactButton keeps its two sizes and supported variants. Padding and radius remain shared theme tokens.

Remove generated global Button size/variant overrides and their variant CSS generator. Preserve compatibility for older presets that still contain CSS rules.

Use a shared, schema-validated component-settings transformer with declarative component definitions, preserving unselected source defaults.
