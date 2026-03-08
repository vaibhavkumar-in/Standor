/**
 * JSON-LD structured data components.
 * Rendered as <script type="application/ld+json"> tags via react-helmet-async.
 * Keeps SEO schemas co-located with the components that need them.
 */

import { Helmet } from 'react-helmet-async';

// ── Organization (site-wide) ──────────────────────────────────────────────────

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Standor',
    url: 'https://standor.dev',
    logo: 'https://standor.dev/logo.png',
    sameAs: [
      'https://github.com/standor',
    ],
    description:
      'Standor is an AI-powered real-time technical interview platform for engineering teams. Collaborative Monaco editor, code execution, and instant AI candidate evaluation.',
    foundingDate: '2024',
    applicationCategory: 'BusinessApplication',
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ── SoftwareApplication (product) ────────────────────────────────────────────

export function SoftwareAppJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Standor',
    operatingSystem: 'Web',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Create interview rooms, collaborate in real-time with Monaco Editor, run code in 10+ languages, and get instant AI-generated scoring and complexity analysis.',
    url: 'https://standor.dev',
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ── BreadcrumbList (per-page) ─────────────────────────────────────────────────

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const baseUrl = 'https://standor.dev';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${baseUrl}${item.href}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqJsonLdProps {
  items: FaqItem[];
}

export function FaqJsonLd({ items }: FaqJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
