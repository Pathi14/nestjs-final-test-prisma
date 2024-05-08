import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insérer des utilisateurs avec leurs tâches
  const user1 = await prisma.user.create({
    data: {
      email: 'user_1@example.com',
      tasks: {
        create: [
          { name: 'Task1 for User 1', priority: 1 },
          { name: 'Task2 for User 1', priority: 2 },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user_2@example.com',
      tasks: {
        create: [
          { name: 'Task1 for User 2', priority: 1 },
          { name: 'Task2 for User 2', priority: 2 },
        ],
      },
    },
  });

  console.log('Users created:', user1, user2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
