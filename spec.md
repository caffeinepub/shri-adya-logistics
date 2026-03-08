# Shri Adya Logistics

## Current State
The website has: Home, About (with dropdown: Corporate Profile, Our History), Services (ComingSoonPage at /services), Clients, Resources, Contact (dedicated page). The Services nav link currently scrolls to the services section on the Home page.

## Requested Changes (Diff)

### Add
- A dedicated `/services` page (ServicesPage component) replacing the ComingSoonPage
- The Services nav link should navigate to `/services` (not scroll to home section)
- ServicesPage includes:
  - Hero banner: "Services" with tagline quote
  - Explosive Transportation service section with full details and fleet info (1MT–15MT)
  - Logistics service section with full details
  - Clients section with logos: DVC (DVC-3-1.png), CCL/Variant (Vcpl-Logo-3-2.png), BKB (bkbLogo-5-3.png)
  - CTA section linking to contact page

### Modify
- NAV_LINKS: change Services from hash scroll to Link to="/services"
- Footer quick links: update Services to link to /services
- servicesRoute: use ServicesPage component instead of ComingSoonPage

### Remove
- ComingSoonPage usage for /services route
