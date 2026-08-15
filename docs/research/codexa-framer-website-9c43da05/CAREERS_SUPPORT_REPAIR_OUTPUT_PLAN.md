# Careers and Support Repair Output Plan

## Route mapping

- `https://codexa.framer.website/company/careers` -> `/codexa/company/careers`
- `https://codexa.framer.website/company/support` -> `/codexa/company/support`

## Existing output locations

- App root: `.`
- Site key: `codexa-framer-website-9c43da05`
- Careers page key: `company-careers-6b1070c8`
- Support page key: `company-support-c9e8a2d7`
- Research and screenshot roots remain the existing namespaced directories.
- Route and component roots remain unchanged; no route is replaced or removed.

## Repair scope

- Careers: keep the settled page implementation; repair the two Company-menu links that still point to the obsolete About fragment.
- Support: restore the source desktop/mobile vertical offset, mobile inset frame, form spacing, native required-field validation, and the `#support` anchor.
- Shared frame: add the existing footer mark's `#home` target.
- Shared design tokens, assets, fonts, and footer reveal behavior remain unchanged.

