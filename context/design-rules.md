# C360 Design Rules (Tier 2 - Design and brand)

**Last updated:** 2026-08-13

## How to use this file

Guidance for how the C360 UI should look and feel. It is subordinate to the hard constraints and requirements, and it styles the prototype once the prototype gate is lifted. A dedicated designer is reportedly being brought on (kicking off ~23 Aug) to produce the definitive style guide; until then this file holds the working direction.

## Brand

- Follow WorldPay brand direction. Reference the **Worldpay section of the Global Payments website** ([globalpayments.com](https://www.globalpayments.com/)) for colour and typography consistency.
- **Do not access or pull Worldpay screenshots from the McKinsey laptop.** Use the public Global Payments site for reference only.
- The style guide itself will be produced by a dedicated designer; treat their Figma/style output as the source of truth once delivered.

## Salesforce design language

- Baseline is the **Salesforce Lightning Design System** - font family, sizing, buttons, colours, notification block - so every component feels coherent and polished.
- The look and feel must be expressed in **Lightning components**; the design system, not Cursor, dictates how each modular block looks.
- Think modularly: each block (e.g. a notification block, a use-case panel) has its own consistent styling that composes into the homepage.

## Components called out in sessions

- **Notification block:** the homepage may be "no bigger than a notification block" - the first thing an RM wants at 8am Monday could simply be what needs their attention today.
- **Modular use-case panels:** churn, cross-sell, revenue boost, fraud, and future blocks - consistent, addable.
- **Export action:** a visible one-click path to a PowerPoint/QBR deck (Cam's firm requirement).

## Prototype stack (when the gate is lifted)

- Build an **HTML clickable prototype first**, then translate to **Lightning Web Components**.
- The designer's look-and-feel (Figma image or code) is an input to the prototype, alongside Charlie's guide to what Salesforce can do.
- Reuse layout/interaction patterns from Elena's Lead Gen HTML work under `02 Workstream/01 Lead Gen/03 Team Working folders/Elena/03 Insight Pack/`, but keep C360 as a **separate codebase** under this workstream's `prototype/` folder.
- The slide/HTML skills in `.cursor/skills/` (draft-slides, slide-design) can inform layout craft, but C360 is an app UI, not a slide deck.

## Feel / experience principles (from RM sessions)

- **UX over location:** RMs care how it looks, how usable it is, and how easy it is to interrogate and act on - not where it lives.
- **Worth logging in for:** RMs live in Outlook/Teams; C360 must earn a daily login by putting everything for the customer in one place.
- **Actionable, not raw:** prefer surfacing what to do next over dumping data.
