# Careers Behaviors

- Smooth document scrolling is inherited from the Codexa route scope.
- `See Open Positions` links to `#openings`; the section respects the 72px navigation offset.
- Openings-list entrance: before intersection, opacity `0` and `translateY(60px)`; after entry, opacity `1` and `translateY(0)` with the source spring-like ease. Reduced-motion users see the final state immediately.
- White CTA hover/focus: background `#ffffff` to `#bdbdbd`; duplicate text tracks slide vertically over roughly 240ms; arrow remains visible.
- Culture cards are static.
- Desktop layout switches to the source phone/tablet layout at `768px`.
- Navigation and footer behavior are supplied by the existing shared Codexa components.

