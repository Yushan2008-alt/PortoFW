export interface Client {
  id: string;
  name: string;
  logo: string;          // Path: /images/clients/{id}.svg or .png
  industry: string;      // e.g. "Health Tech", "E-Commerce", "Education"
  logoAlt: string;       // Alt text for accessibility
  websiteUrl?: string;   // Client's website (optional)
}

export const clients: Client[] = [
  {
    id: 'ruangteduh',
    name: 'RuangTeduh',
    logo: '/images/clients/ruangteduh.svg',
    industry: 'Health Tech',
    logoAlt: 'RuangTeduh logo',
    websiteUrl: 'https://ide-bussines.vercel.app',
  },
  {
    id: 'conversion-climb',
    name: 'The Conversion Climb',
    logo: '/images/clients/conversion-climb.svg',
    industry: 'Digital Marketing',
    logoAlt: 'The Conversion Climb logo',
    websiteUrl: 'https://landing-page-pi-ochre-21.vercel.app',
  },
  {
    id: 'propvista',
    name: 'PropVista',
    logo: '/images/clients/propvista.svg',
    industry: 'Real Estate',
    logoAlt: 'PropVista logo',
    websiteUrl: 'https://app-properti.vercel.app',
  },
  {
    id: 'placeholder-client-4',
    name: 'Placeholder Client', // TODO: ganti dengan klien nyata
    logo: '/images/clients/placeholder-4.svg',
    industry: 'Placeholder',
    logoAlt: 'Client logo',
    websiteUrl: undefined,
  },
];
