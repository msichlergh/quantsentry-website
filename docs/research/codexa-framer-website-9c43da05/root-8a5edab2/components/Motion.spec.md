# Motion

## Viewport reveals

- Trigger once when at least 8% of the group is visible and the viewport has crossed the final 12% of its height.
- Start at `opacity: 0` and `translateY(40px)`.
- Settle over `700ms` with `cubic-bezier(.2, .8, .2, 1)`.
- Stagger a section's primary content by `100ms`; use `180ms` only for a third related group.
- Never hide server-rendered content when JavaScript is unavailable.

## Control feedback

- Pill labels slide vertically in `240ms` and remain clipped to one text line.
- Feature-tab content fades upward in `350ms`; the panel dimensions remain fixed.
- Product Features editor tabs crossfade their code panel without changing the editor frame size.
- Pricing values fade upward in `350ms`; the switch thumb moves in `220ms`.
- FAQ answers reveal with a `300ms` height/opacity transition; the plus rotates in `300ms`.

## Continuous motion

- Logo rows use linear horizontal marquees at about `25px/s` and only run while visible.
- Workflow diagrams remain stable until hover. Hover advances the integration rail, moves the workflow cursor and active check, and moves the analytics cursor while revealing the chart tooltip.
- Feature diagrams remain stable until hover. Hover reorders workflow statuses, advances the highlighted release card and cursor by 80px, and morphs throughput values, dots, and bar heights.
- Small teal status dots may pulse continuously; the larger diagram elements must not drift autonomously.
- Under `prefers-reduced-motion: reduce`, marquees, reveals, control transitions, and decorative pulses resolve immediately.
