import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const efficiencyItems = [
  {
    id: 'eff-1',
    icon: '/static-assets/2024/09/05-SISTEMA-DE-CLIMATIZACION-300x300-1.png',
    title: 'SISTEMA DE CLIMATIZACIÓN INTELIGENTE',
    shortDesc: 'Una solución avanzada que optimiza el control de la temperatura',
    detailDesc: 'Sistema de climatización de última generación que permite un control preciso de la temperatura en todas las áreas del edificio, optimizando el consumo energético mientras mantiene un ambiente laboral confortable.',
    image: '/static-assets/nosotros/Ventil-768x768-1-1780026164909.png',
    ctaText: 'Ver más',
    ctaLink: '',
    order: 0,
    active: true
  },
  {
    id: 'eff-2',
    icon: '/static-assets/2024/09/2.png',
    title: 'SISTEMA DE ENFRIAMIENTO DE SALAS DE COMPUTACIÓN',
    shortDesc: 'Es esencial para mantener la temperatura óptima de estas áreas críticas',
    detailDesc: 'Sistemas especializados de enfriamiento diseñados específicamente para salas de servidores y computación, garantizando que la temperatura se mantenga en niveles óptimos para el funcionamiento de equipos electrónicos sensibles.',
    image: '/static-assets/nosotros/enfriamentocomputacion-1780028074289.jpg',
    ctaText: 'Ver más',
    ctaLink: '',
    order: 1,
    active: true
  },
  {
    id: 'eff-3',
    icon: '/static-assets/2024/09/iconi3.png',
    title: 'SISTEMAS DE AIRE EXTERIOR',
    shortDesc: 'Es una parte vital de la ventilación y climatización',
    detailDesc: 'Sistema de ventilación que garantiza la renovación constante del aire interior con aire exterior filtrado, mejorando la calidad del ambiente laboral y reduciendo la concentración de contaminantes.',
    image: '/static-assets/nosotros/SISTEMA-DE-AIRE-EXTERIOR-jpg-1780028137095.jpeg',
    ctaText: 'Ver más',
    ctaLink: '',
    order: 2,
    active: true
  },
  {
    id: 'eff-4',
    icon: '/static-assets/2024/09/oconin4.png',
    title: 'FACHADA VENTILADA',
    shortDesc: 'Se ha diseñado un sistema de revestimiento exterior',
    detailDesc: 'Fachada ventilada con paneles de doble vidrio que proporciona aislamiento térmico superior, reduciendo significativamente los costos de climatización y proporcionando un aspecto moderno y elegante.',
    image: '/static-assets/nosotros/FACHADA-VENTILADA-jpg-1780028167909.jpeg',
    ctaText: 'Ver más',
    ctaLink: '',
    order: 3,
    active: true
  },
  {
    id: 'eff-5',
    icon: '/static-assets/2024/09/iconin4.png',
    title: 'SISTEMA DE CONTROL CENTRALIZADO',
    shortDesc: 'Coordina y gestiona diversas funciones y sistemas dentro de la edificación',
    detailDesc: 'Sistema BMS (Building Management System) que permite el control y monitoreo centralizado de todos los sistemas del edificio, desde climatización hasta iluminación y seguridad.',
    image: '/static-assets/nosotros/Controlcentr-1780028205618.jpg',
    ctaText: 'Ver más',
    ctaLink: '',
    order: 4,
    active: true
  },
  {
    id: 'eff-6',
    icon: '/static-assets/2024/09/iconin6.png',
    title: 'CANALIZACIÓN DE AGUAS DE LLUVIA',
    shortDesc: 'Un sistema de drenaje diseñado para capturar y dirigir el agua de lluvia lejos de la estructura',
    detailDesc: 'Sistema integral de drenaje que captura y dirige el agua de lluvia lejos de la estructura, previniendo filtraciones y daños por humedad mientras contribuye a la sostenibilidad ambiental.',
    image: '/static-assets/nosotros/CANALIZACION-DE-AGUA-jpg-1780028244834.jpeg',
    ctaText: 'Ver más',
    ctaLink: '',
    order: 5,
    active: true
  }
];

async function main() {
  console.log('=== Seeding EfficiencyItem Table ===\n');

  // Check existing records
  const existing = await prisma.efficiencyItem.count();
  console.log(`Existing records: ${existing}`);

  if (existing > 0) {
    console.log('Deleting existing records...');
    await prisma.efficiencyItem.deleteMany();
  }

  console.log('\nInserting 6 efficiency items...');

  for (const item of efficiencyItems) {
    await prisma.efficiencyItem.create({ data: item });
    console.log(`  Created: ${item.title.substring(0, 40)}...`);
  }

  const count = await prisma.efficiencyItem.count();
  console.log(`\nTotal records after seeding: ${count}`);

  // Verify by fetching
  const records = await prisma.efficiencyItem.findMany({
    orderBy: { order: 'asc' }
  });

  console.log('\n=== Verification ===');
  for (const record of records) {
    console.log(`  [${record.order}] ${record.title.substring(0, 30)} - image: ${record.image}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
