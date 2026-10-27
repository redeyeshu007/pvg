import React from "react";

interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * JsonLd Server Component
 *
 * Renders structured data scripts into HTML with zero client-side JavaScript execution overhead.
 * Escapes closing tags to prevent XSS vulnerabilities.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
