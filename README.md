## Setup
### 🏗️ Initialisation
1. Installez ses dépendances en utilisant la commande `npm ci`
    * La base de données utilisé dans ce projet est postgres
    * L'ORM utilisé dans ce projet es prisma
    * L'environnement de developpement etait windows
    
2. Lancer le script approprié en fonction de votre environnement
    * Script utilisé pour demarrer le serveur
        - npm run start:postgres
        - npm run start:postgres:windows

    * Script utilisé pour lancer les tests 
        - npm run test:e2e:postgres
        - npm run test:e2e:postgres:windows
