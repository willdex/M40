export interface Slider {
  id: string;
  type: 'video' | 'image';
  src: string;
  poster?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface Amenity {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface VideoSection {
  id: string;
  type: 'hosted' | 'youtube';
  src: string;
  poster?: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  facebookUrl: string;
  instagramUrl: string;
}

export interface SiteContent {
  home: {
    heroSlider: Slider[];
    mainVideo: VideoSection;
    contactPhone: string;
    heroTitle: string;
    heroSubtitle: string;
    featuresTitle: string;
    amenitiesTitle: string;
    services: Service[];
    amenities: Amenity[];
    videoSection: {
      title: string;
      youtubeUrl?: string;
      poster?: string;
    };
  };
  footer: {
    aboutTitle: string;
    aboutText: string;
    servicesTitle: string;
    contactTitle: string;
    contactInfo: ContactInfo;
  };
  meta: {
    siteName: string;
    description: string;
    phone: string;
  };
}

export const siteContent: SiteContent = {
  home: {
    heroSlider: [
      {
        id: 'slider-1',
        type: 'video',
        src: '/static-assets/2024/09/slider.mp4',
        poster: '/static-assets/2024/09/slidernosotros.jpg'
      }
    ],
    mainVideo: {
      id: 'main-video',
      type: 'hosted',
      src: '/static-assets/2024/09/Hyperlapse-Manzana-40.mp4',
      poster: '/static-assets/revslider/video-media/slider_1_layer.jpg'
    },
    contactPhone: '+591 71369822',
    heroTitle: 'LA PLAZA EMPRESARIAL MÁS IMPORTANTE DEL PAÍS.',
    heroSubtitle: 'Un ecosistema de posibilidades, un mundo de oportunidades para tu negocio. Ubicada en el corazón financiero de Santa Cruz, diseñada para impulsar tu empresa y conectar con los mejores líderes.',
    featuresTitle: 'UN ECOSISTEMA DE POSIBILIDADES, UN MUNDO DE OPORTUNIDADES PARA TU NEGOCIO',
    amenitiesTitle: 'UNA PLAZA EMPRESARIAL ÚNICA',
    services: [
      {
        id: 'oficinas',
        title: 'OFICINAS',
        description: 'En venta y alquiler',
        image: '/static-assets/elementor/thumbs/oficinam1-qubpyhacvcdu7b4d9f6lkfcw815jlau932kh7qgsc0.jpg',
        href: '/oficinas'
      },
      {
        id: 'centro-de-negocios',
        title: 'CENTRO DE NEGOCIOS',
        description: 'Eventos Corporativos',
        image: '/static-assets/2024/09/oficina2.jpg',
        href: '/centro-de-negocios'
      },
      {
        id: 'hub-40',
        title: 'HUB 40',
        description: 'Co-Work',
        image: '/static-assets/2024/09/oficina3.jpg',
        href: '/hub-40'
      },
      {
        id: 'boca',
        title: 'BOCA MIXTURA',
        description: 'Boulevard Gastronómico',
        image: '/static-assets/2024/09/oficina4.jpg',
        href: '/boca'
      },
      {
        id: 'amenidades',
        title: 'AMENIDADES',
        description: 'Pensadas en vos',
        image: '/static-assets/2024/09/boutique.jpg',
        href: '/amenidades'
      }
    ],
    amenities: [
      {
        id: 'leed',
        icon: '/static-assets/2024/09/building-icono.png',
        title: 'CERTIFICACIÓN LEED',
        description: 'Que garantiza contar con un edificio sostenible en el tiempo.'
      },
      {
        id: 'seguro',
        icon: '/static-assets/2024/09/ambienteok.png',
        title: 'AMBIENTE SEGURO',
        description: 'Seguridad proactiva y sustentada por tecnología avanzada.'
      },
      {
        id: 'climatizacion',
        icon: '/static-assets/2024/09/ico3.png',
        title: 'SISTEMA DE CLIMATIZACIÓN INTELIGENTE',
        description: 'Esta tecnología permite generar un ahorro aproximado de 30% en el consumo eléctrico.'
      },
      {
        id: 'aire-exterior',
        icon: '/static-assets/2024/09/ico4.png',
        title: 'SISTEMA DE AIRE EXTERIOR',
        description: 'Necesario para la renovación de oxígeno de las oficinas, será suministrado y filtrado por medio de ventiladores de inyección de aire.'
      },
      {
        id: 'muro-cortina',
        icon: '/static-assets/2024/09/ico5.png',
        title: 'MURO CORTINA',
        description: 'Paneles de doble vidrio con cámara de aire por medio, para disminuir el ingreso del sol y optimizar el uso energético.'
      },
      {
        id: 'ascensores',
        icon: '/static-assets/2024/09/icoi6.png',
        title: '16 ASCENSORES',
        description: 'Los más rápidos del país.'
      }
    ],
    videoSection: {
      title: '¡Atrévete a Soñarlo!',
      youtubeUrl: 'https://www.youtube.com/watch?v=XHOmBV4js_E',
      poster: '/static-assets/2024/09/hyperportada.jpg'
    }
  },
  footer: {
    aboutTitle: 'Quienes Somos',
    aboutText: 'Somos el epicentro de la innovación y el progreso. Hemos creado un ecosistema donde las ambiciones se hacen realidad y las empresas prosperan.',
    servicesTitle: 'Servicios',
    contactTitle: 'Contacto',
    contactInfo: {
      address: 'Av. San Martín, Calle J.',
      phone: '+591 713-69822',
      email: 'info@manzana40.com',
      facebookUrl: 'https://www.facebook.com/M40PlazaEmpresarial',
      instagramUrl: 'https://www.instagram.com/manzana40.bo/'
    }
  },
  meta: {
    siteName: 'Manzana40',
    description: 'La Plaza Empresarial más importante del país',
    phone: '+591 71369822'
  }
};

export const navItems = [
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/oficinas', label: 'Oficinas' },
  { href: '/centro-de-negocios', label: 'Centro de Negocios' },
  { href: '/hub-40', label: 'HUB 40' },
  { href: '/boca', label: 'Boca Mixtura' },
  { href: '/amenidades', label: 'Amenidades' }
];

export const serviceLinks = [
  { href: '/oficinas', label: 'Oficinas' },
  { href: '/centro-de-negocios', label: 'Centro de Negocios' },
  { href: '/hub-40', label: 'Hub 40' },
  { href: '/boca', label: 'Boca Mixtura' },
  { href: '/amenidades', label: 'Amenidades' }
];
