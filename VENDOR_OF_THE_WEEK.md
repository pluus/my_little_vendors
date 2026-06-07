# Vendor of the Week Feature

## Overview

A featured vendor spotlight system that highlights one vendor each week on the homepage with their personal story, journey, and business information.

## Features

### 1. Homepage Banner

- Eye-catching gradient banner with vendor photo
- Displays vendor name, quote, and business info
- Click-through to full vendor story page
- Responsive design for mobile and desktop

### 2. Vendor Detail Page

- SEO-friendly URL structure: `/vendor/[slug]`
- Vendor-focused content sections:
  - Personal story
  - Journey to success
  - Passion and motivation
  - Fun facts
  - Complete business information
- Previous/Next navigation between vendors
- Optimized meta tags for social sharing

## How to Manage

### Setting Vendor of the Week

In `app/data/businesses.ts`, set `vendorOfWeek: true` for the featured vendor:

```typescript
{
  id: 1,
  name: "원 플러밍",
  slug: "won-plumbing",
  vendorOfWeek: true,  // ✅ Set this to true
  vendor: {
    name: "원 플러머",
    story: "...",
    quote: "...",
    // ... more vendor info
  },
  // ... rest of business data
}
```

**Important:** Only set `vendorOfWeek: true` for ONE vendor at a time. The system will automatically display the first vendor with this flag.

### Adding a New Vendor

To add a new vendor to the rotation:

1. Add `slug` (URL-friendly name):

```typescript
slug: "business-name-here";
```

2. Add `vendor` information:

```typescript
vendor: {
  name: "Vendor Full Name",
  story: "Their background and how they started...",
  quote: "An inspiring quote from the vendor",
  journey: "Challenges and triumphs they experienced...",
  passion: "What drives them and their values...",
  image: "/images/[id]/vendor.jpg" // Optional: specific vendor photo
}
```

3. (Optional) Set as featured:

```typescript
vendorOfWeek: true;
```

### Vendor Information Fields

| Field            | Required    | Description                                           |
| ---------------- | ----------- | ----------------------------------------------------- |
| `slug`           | ✅ Yes      | URL-friendly identifier (e.g., "athena-fencing-club") |
| `vendor.name`    | ✅ Yes      | Vendor's name or title                                |
| `vendor.story`   | ✅ Yes      | Personal background and origin story                  |
| `vendor.quote`   | Recommended | Inspiring quote from the vendor                       |
| `vendor.journey` | Recommended | Their path and challenges overcome                    |
| `vendor.passion` | Recommended | What motivates them                                   |
| `vendor.image`   | Optional    | Vendor portrait (defaults to business cover)          |
| `vendorOfWeek`   | Optional    | Set to `true` to feature on homepage                  |

## Example Vendors

Currently configured vendors:

- **원 플러밍** (`won-plumbing`) - Currently featured ⭐
- **Athena Fencing Club** (`athena-fencing-club`)
- **Elin Line** (`elin-line`)

## URLs

- Homepage banner: `/`
- Vendor detail pages: `/vendor/[slug]`
  - Example: `/vendor/won-plumbing`
  - Example: `/vendor/athena-fencing-club`

## Styling

The feature uses your existing design system:

- Amber accent colors (`amber-400`, `amber-500`)
- Rounded cards (`rounded-3xl`)
- Soft shadows and hover effects
- Responsive grid layouts
- Consistent typography and spacing

## SEO Benefits

- Unique URL per vendor
- Optimized meta titles and descriptions
- Social media sharing tags (Open Graph)
- Semantic HTML structure
- Internal linking between vendors

## Future Enhancements

Consider adding:

- Admin panel to change featured vendor
- Scheduled rotation system
- Vendor voting system
- Analytics for vendor page views
- Social sharing buttons
