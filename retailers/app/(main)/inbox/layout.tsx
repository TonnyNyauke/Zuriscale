// src/app/(main)/inbox/layout.tsx
import React from 'react';
import InboxLayout from '@/components/inbox/InboxLayout';

export default function InboxPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <InboxLayout>{children}</InboxLayout>;
}