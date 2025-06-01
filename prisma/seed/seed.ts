import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Gerando dados...');

  for (let i = 0; i < 10; i++) {
    const producer = await prisma.producer.create({
      data: {
        cpfCnpj: faker.helpers.replaceSymbolWithNumber('###########'),
        name: faker.person.fullName(),
      },
    });

    const numProperties = faker.number.int({ min: 1, max: 3 });

    for (let j = 0; j < numProperties; j++) {
      const totalArea = faker.number.float({ min: 50, max: 500, precision: 0.01 });
      const arableArea = faker.number.float({ min: 10, max: totalArea - 20, precision: 0.01 });
      const vegetationArea = totalArea - arableArea;

      const property = await prisma.property.create({
        data: {
          name: faker.word.words(2),
          city: faker.location.city(),
          state: faker.location.stateAbbr(),
          totalArea,
          arableArea,
          vegetationArea,
          producerId: producer.id,
        },
      });

      const harvest = await prisma.harvest.create({
        data: {
          year: faker.date.anytime().getFullYear(),
          propertyId: property.id,
        },
      });

      const cropNames = ['Soja', 'Milho', 'Café', 'Trigo', 'Arroz'];
      const cropCount = faker.number.int({ min: 1, max: 3 });

      for (let k = 0; k < cropCount; k++) {
        await prisma.crop.create({
          data: {
            name: faker.helpers.arrayElement(cropNames),
            harvestId: harvest.id,
          },
        });
      }
    }
  }

  console.log('✅ Dados mockados gerados com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
