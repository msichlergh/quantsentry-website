# Codexa Careers Output Plan

## Shared application

- App root: `.`
- Source origin: `https://codexa.framer.website`
- Site key: `codexa-framer-website-9c43da05`
- Existing Codexa routes and shared navigation/footer remain in place.
- Source paths are preserved below the existing `/codexa` route prefix so `/` continues to render Codexa as the default site.
- Shared additions: `shared/codexaCareerData.ts` and `shared/CodexaCareerDetailPage.*`.
- No new dependencies, global fonts, favicons, or global assets are required.

## Route mapping

| Source URL | Page key | Destination route | Component namespace | Research root | Screenshot root |
| --- | --- | --- | --- | --- | --- |
| `/company/careers` | `company-careers-6b1070c8` | `/codexa/company/careers` | `company-careers-6b1070c8` | `docs/research/codexa-framer-website-9c43da05/company-careers-6b1070c8` | `docs/design-references/codexa-framer-website-9c43da05/company-careers-6b1070c8` |
| `/company/careers/product-designer` | `company-careers-product-designer-5241f65d` | `/codexa/company/careers/product-designer` | shared career detail | `docs/research/codexa-framer-website-9c43da05/company-careers-product-designer-5241f65d` | `docs/design-references/codexa-framer-website-9c43da05/company-careers-product-designer-5241f65d` |
| `/company/careers/backend-engineer` | `company-careers-backend-engineer-99861224` | `/codexa/company/careers/backend-engineer` | shared career detail | `docs/research/codexa-framer-website-9c43da05/company-careers-backend-engineer-99861224` | `docs/design-references/codexa-framer-website-9c43da05/company-careers-backend-engineer-99861224` |
| `/company/careers/product-manager` | `company-careers-product-manager-303a50ae` | `/codexa/company/careers/product-manager` | shared career detail | `docs/research/codexa-framer-website-9c43da05/company-careers-product-manager-303a50ae` | `docs/design-references/codexa-framer-website-9c43da05/company-careers-product-manager-303a50ae` |
| `/company/careers/devops-engineer` | `company-careers-devops-engineer-ee0e0934` | `/codexa/company/careers/devops-engineer` | shared career detail | `docs/research/codexa-framer-website-9c43da05/company-careers-devops-engineer-ee0e0934` | `docs/design-references/codexa-framer-website-9c43da05/company-careers-devops-engineer-ee0e0934` |
| `/company/careers/qa-engineer` | `company-careers-qa-engineer-89316c4f` | `/codexa/company/careers/qa-engineer` | shared career detail | `docs/research/codexa-framer-website-9c43da05/company-careers-qa-engineer-89316c4f` | `docs/design-references/codexa-framer-website-9c43da05/company-careers-qa-engineer-89316c4f` |
| `/company/careers/data-analyst` | `company-careers-data-analyst-f59c6044` | `/codexa/company/careers/data-analyst` | shared career detail | `docs/research/codexa-framer-website-9c43da05/company-careers-data-analyst-f59c6044` | `docs/design-references/codexa-framer-website-9c43da05/company-careers-data-analyst-f59c6044` |

## Collision check

- None of the seven destination routes currently exists.
- Every artifact and screenshot root is unique.
- The shared data/template files are new and do not replace existing same-site components.

