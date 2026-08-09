# PulaFeed

PulaFeed is a clickable prototype for a Botswana-focused agricultural community platform. It helps farmers and agricultural stakeholders discover one another, share practical knowledge, join communities, and find products and services.

The current prototype includes a community feed, stakeholder discovery, agricultural communities, a product and service directory, messages, notifications, profiles, and interactive post creation. It does not process payments, lending, or other financial transactions.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds the static site and publishes it to GitHub Pages after every push to `main`.

Production domain: [pulafeed.com](https://pulafeed.com)
