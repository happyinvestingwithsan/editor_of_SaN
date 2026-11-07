---
name: hify-motion-graphics
description: Design tokens and animation rules for HIFY financial motion graphics in Remotion
---

# HIFY Motion Graphics Brand Skill

## Color Palette
- **Background Canvas**: `#121214` (Deep matte obsidian)
- **Surface Cards**: `#18181B` with hairline borders `#2E2E33`
- **Primary Text**: `#EDEDED`
- **Secondary Text**: `#A1A1AA`
- **HIFY Gold**: `#C8A951` (Strict Budget: <= 3-4% surface coverage. Reserved for logo, key highlight badges, or milestone bars only)
- **Financial Decoupling**:
  - Positive metrics: `#10B981` (Emerald)
  - Negative/drawdowns: `#F43F5E` (Rose)
  - NEVER use gold for profit or financial gains.

## Typography
- **UI / Labels / Headlines**: Inter (`Inter, sans-serif`)
- **Numerical Values / Metrics**: JetBrains Mono (`JetBrains Mono, monospace`, with `fontVariantNumeric: 'tabular-nums'`)

## Motion Design Guidelines
- 2.5D card tilt with `perspective(1000px)`.
- Kinetic headline reveals using `@remotion/spring` or `spring({ damping: 14, stiffness: 100 })`.
- Restrained, premium, high-retention finance video aesthetic (marketfeed style).
