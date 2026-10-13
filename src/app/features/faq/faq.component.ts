import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  openIndex: string | null = null;

  readonly categories: FaqCategory[] = [
    {
      title: 'Productos y servicios',
      items: [
        {
          question: '¿Qué productos ofrece Solarte Editores?',
          answer:
            'Agendas escolares personalizadas, productos editoriales, papelería institucional, publicidad impresa, productos para grados y eventos, y productos promocionales y personalizados.',
        },
        {
          question: '¿Qué tipo de agendas escolares fabrican?',
          answer:
            'Agendas escolares personalizadas según la identidad de cada colegio: portada, interiores, materiales y encuadernación a la medida del proyecto.',
        },
        {
          question: '¿Puedo personalizar una agenda para mi colegio?',
          answer:
            'Sí. Adaptamos diseño, contenido y materiales de la agenda a la identidad de tu institución. Puedes solicitar una cotización para conocer las opciones disponibles.',
        },
        {
          question: '¿Realizan publicidad impresa para empresas?',
          answer:
            'Sí, producimos volantes, afiches, pendones, brochures y otras piezas publicitarias impresas para campañas y comunicación comercial.',
        },
        {
          question: '¿Qué productos de papelería empresarial ofrecen?',
          answer:
            'Tarjetas personales, sobres, hojas membretadas, comprobantes y otros formatos institucionales para empresas y organizaciones.',
        },
        {
          question: '¿Realizan diplomas, pergaminos y productos para grados?',
          answer:
            'Sí, elaboramos diplomas, actas de grado y kits de graduado personalizables según el evento o institución.',
        },
        {
          question: '¿También desarrollan páginas web?',
          answer:
            'Sí, diseñamos y desarrollamos páginas web y landing pages orientadas a objetivos, identidad y captación de contactos.',
        },
        {
          question: '¿Qué tipo de procesos pueden automatizar?',
          answer:
            'Procesos de atención por WhatsApp, formularios, correos, solicitudes y otros flujos comerciales que se repiten con frecuencia.',
        },
        {
          question: '¿Pueden ayudarme a automatizar procesos comerciales?',
          answer:
            'Sí, analizamos el proceso actual y diseñamos una solución de automatización de acuerdo con la necesidad de tu negocio.',
        },
        {
          question: '¿Pueden integrar WhatsApp o inteligencia artificial a mi negocio?',
          answer:
            'Sí, integramos WhatsApp e inteligencia artificial cuando pueden aportar valor real a tus procesos de atención y comunicación.',
        },
      ],
    },
    {
      title: 'Personalización',
      items: [
        {
          question: '¿Puedo solicitar un producto completamente personalizado?',
          answer:
            'Sí, la mayoría de nuestros productos pueden personalizarse. El alcance de la personalización depende del tipo de producto y sus características.',
        },
        {
          question: '¿Puedo utilizar mi propio diseño?',
          answer: 'Sí, puedes enviarnos tu diseño para producción, o trabajarlo junto a nuestro equipo.',
        },
        {
          question: '¿Pueden diseñar el producto por mí?',
          answer: 'Sí, te asesoramos y desarrollamos la propuesta de diseño según tu proyecto.',
        },
        {
          question: '¿Puedo personalizar colores, logotipos y materiales?',
          answer:
            'Sí, según el producto podrás definir colores, logotipo y algunos materiales. Te confirmamos las opciones disponibles al cotizar.',
        },
        {
          question: '¿Pueden adaptar productos para colegios o empresas?',
          answer:
            'Sí, adaptamos productos a la identidad institucional de colegios y empresas: colores, logotipo, contenido y portada.',
        },
      ],
    },
    {
      title: 'Cotizaciones',
      items: [
        {
          question: '¿Cómo solicito una cotización?',
          answer: 'Desde nuestro formulario de cotización, indicando el producto o servicio y los detalles de tu proyecto.',
        },
        {
          question: '¿Qué información necesito enviar para cotizar?',
          answer: 'Tipo de producto, cantidad aproximada y una breve descripción de lo que necesitas.',
        },
        {
          question: '¿Puedo solicitar una cotización para varias cantidades?',
          answer: 'Sí, puedes indicarnos distintas cantidades y te presentamos las opciones correspondientes.',
        },
        {
          question: '¿Puedo enviar mi diseño?',
          answer: 'Sí, puedes adjuntar o compartirnos tu diseño al momento de solicitar la cotización.',
        },
        {
          question: '¿La cotización tiene algún costo?',
          answer: 'No, solicitar una cotización con nosotros no tiene costo.',
        },
        {
          question: '¿Qué sucede después de aprobar una cotización?',
          answer:
            'Iniciamos el proceso de producción según lo acordado: Solicitud → Asesoría → Cotización → Aprobación → Producción → Entrega.',
        },
      ],
    },
    {
      title: 'Tiempos de entrega',
      items: [
        {
          question: '¿Cuáles son los tiempos de entrega?',
          answer:
            'El tiempo de entrega depende del tipo de producto, cantidad, materiales, nivel de personalización y aprobación del diseño. Al momento de cotizar te informaremos el tiempo estimado correspondiente a tu proyecto.',
        },
      ],
    },
    {
      title: 'Pedidos personalizados',
      items: [
        {
          question: '¿Los pedidos personalizados tienen condiciones especiales?',
          answer:
            'Sí, los productos personalizados pueden tener condiciones particulares de producción, aprobación y cancelación. Estas condiciones corresponden a las políticas comerciales vigentes de Solarte Editores y se confirman al momento de cotizar.',
        },
      ],
    },
  ];

  toggle(categoryIndex: number, itemIndex: number): void {
    const key = `${categoryIndex}-${itemIndex}`;
    this.openIndex = this.openIndex === key ? null : key;
  }

  isOpen(categoryIndex: number, itemIndex: number): boolean {
    return this.openIndex === `${categoryIndex}-${itemIndex}`;
  }
}
