// types/contact.ts
// Type-only file — zero runtime impact.
// Used by: components/sections/Contact.tsx, app/actions.ts

export type ServiceInterest =
  | 'web-app'
  | 'landing-page'
  | 'ui-design'
  | 'consulting'
  | 'other';

export type ProjectBudget =
  | '<5jt'
  | '5-15jt'
  | '15-50jt'
  | '50jt+'
  | 'belum-tahu';

export interface ContactFormFields {
  name: string;            // Required — full name
  company: string;         // Optional — company/business name
  email: string;           // Required — email address
  phone: string;           // Optional — WhatsApp/phone number
  interest: ServiceInterest; // Required — which service they're interested in
  budget: ProjectBudget;   // Required — project budget range
  message: string;         // Required — project details
}

// Radio/select option labels — used for rendering form UI
export const interestOptions: { value: ServiceInterest; label: string }[] = [
  { value: 'web-app',      label: 'Web App / Website' },
  { value: 'landing-page', label: 'Landing Page' },
  { value: 'ui-design',    label: 'UI/UX Design' },
  { value: 'consulting',   label: 'Technical Consulting' },
  { value: 'other',        label: 'Lainnya' },
];

export const budgetOptions: { value: ProjectBudget; label: string }[] = [
  { value: '<5jt',       label: '< Rp 5 juta' },
  { value: '5-15jt',    label: 'Rp 5–15 juta' },
  { value: '15-50jt',   label: 'Rp 15–50 juta' },
  { value: '50jt+',     label: 'Rp 50 juta+' },
  { value: 'belum-tahu', label: 'Belum tahu / diskusikan dulu' },
];
