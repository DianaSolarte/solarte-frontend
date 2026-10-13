import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    data: {
      title: 'Solarte Editores | Impresión, diseño y soluciones digitales en Bogotá',
      description: 'Solarte Editores: agendas escolares personalizadas, publicidad impresa, papelería empresarial, diseño web y automatización para empresas, colegios e instituciones en Bogotá y Colombia.',
    },
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./features/about/about.component').then((m) => m.AboutComponent),
    data: {
      title: 'Nosotros | 30 años de experiencia | Solarte Editores',
      description: 'Conoce la trayectoria de Solarte Editores y nuestra evolución desde la producción editorial hacia soluciones de diseño y tecnología para organizaciones.',
    },
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./features/catalog/catalog.component').then((m) => m.CatalogComponent),
    data: {
      title: 'Catálogo de productos | Agendas, diplomas y material institucional',
      description: 'Explora el catálogo de Solarte Editores: agendas personalizadas, diplomas, papelería, publicidad impresa y productos institucionales.',
    },
  },
  {
    path: 'servicios-digitales',
    loadComponent: () =>
      import('./features/digital-services/digital-services.component').then((m) => m.DigitalServicesComponent),
    data: {
      title: 'Servicios digitales | WhatsApp + IA, páginas web y automatización',
      description: 'Solarte Editores también digitaliza y automatiza procesos: atención por WhatsApp con IA, páginas web y automatización de tareas repetitivas.',
    },
  },
  {
    path: 'sumerce',
    loadComponent: () => import('./features/sumerce/sumerce.component').then((m) => m.SumerceComponent),
    data: {
      title: 'Sumercé | Línea editorial en evolución | Solarte Editores',
      description: 'Sumercé es una línea de Solarte Editores que explora nuevas formas de acompañar la organización, los hábitos y la experiencia educativa.',
    },
  },
  {
    path: 'solicitar-cotizacion',
    loadComponent: () => import('./features/quotations/quotations.component').then((m) => m.QuotationsComponent),
    data: {
      title: 'Solicitar cotización | Solarte Editores Bogotá',
      description: 'Solicita una cotización para agendas escolares, impresión, publicidad, papelería empresarial, diseño web o automatización de procesos.',
    },
  },
  {
    path: 'contacto',
    loadComponent: () => import('./features/contact/contact.component').then((m) => m.ContactComponent),
    data: {
      title: 'Contacto | Solarte Editores Bogotá y Colombia',
      description: 'Conversemos sobre tu proyecto de impresión, diseño, productos institucionales o soluciones digitales para empresas y colegios.',
    },
  },
  {
    path: 'pqrsf',
    loadComponent: () => import('./features/pqrsf/pqrsf.component').then((m) => m.PqrsfComponent),
    data: {
      title: 'PQRSF | Peticiones, quejas, reclamos, sugerencias y felicitaciones',
      description: 'Canal de PQRSF de Solarte Editores para recibir peticiones, quejas, reclamos, sugerencias y felicitaciones sobre nuestros productos y servicios.',
    },
  },
  {
    path: 'faq',
    loadComponent: () => import('./features/faq/faq.component').then((m) => m.FaqComponent),
    data: {
      title: 'Preguntas frecuentes | Solarte Editores',
      description: 'Resolvemos las preguntas más frecuentes sobre productos, personalización, cotizaciones y tiempos de entrega en Solarte Editores.',
    },
  },
  {
    path: 'politica-privacidad',
    loadComponent: () =>
      import('./features/privacy-policy/privacy-policy.component').then((m) => m.PrivacyPolicyComponent),
    data: {
      title: 'Política de privacidad y términos | Solarte Editores',
      description: 'Política de tratamiento de datos personales y términos y condiciones de Solarte Editores.',
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
