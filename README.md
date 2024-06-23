# What the FEC

https://wtfec.netlify.app

![Home page](/homePage.png "Page d'acceuil.")

L'application vise à aider les comptables dans la vérification de leur FEC (Fichier des écritures comptables). Ce dernier est un document légal exigé par l'administration fiscale française pour attester des comptes d'une entreprise. Le format attendu est donc bien défini, et doit répondre à plusieurs impératifs. Ici, il s'agit donc de vérifier la structure du fichier et la structure des écritures comptables. La cohérence de la comptabilité et les choix comptables ne sont en aucun cas pris en compte.

Cette idée m'est naturellement venue puisque j'ai été confronté à ce besoin dans mon ancien travail. Travaillant à l'assistance technique d'une entreprise éditrice de logiciels de comptabilité et de gestion, j'avais pour mission d'épauler les comptables dans l'utilisation de nos solutions. À plusieurs occasions, j'ai été frappé de voir le nombre de fichiers FEC comportant des erreurs et ce, bien que provenant de PGI performants et réputés du marché. C'est par ailleurs le fait d'avoir apprécié coder une macro VBA pour remedier à ce besoin, qui a engagé ma reconversion dans le développement Web. Un projet symbolique me permettant de boucler la boucle.

Ainsi, par cette application, j'ai souhaité favoriser le pointage de ces erreurs qui peuvent facilement se noyer dans les milliers de lignes que comporte souvent un FEC. Cette facilité de pointage est permise grâce à l'export du fichier FEC au format Excel avec un jeu de couleurs.

Les visiteurs peuvent donc déposer leur fichier pour le soumettre au test. Un premier compte-rendu est donné pour indiquer la validité du fichier. Puis, une option est mise à disposition pour télécharger le fichier de contrôle au format Excel.

Cette application m'a permis de découvrir Angular. J'ai souhaité garder toute ma logique côté front-end et cantonner le back-end au Server Side Rendering en raison de ma stratégie de déploiement. Celle-ci est basique : avoir un déploiement simple et sans coût financier. Ainsi, j'ai opté pour un hébergement serverless, sans base de données, avec Netlify. De même, j'ai choisi le module ExcelJS pour créer le fichier de contrôle Excel.

Cette application m'a permis de découvrir Angular. J'ai souhaité gardé toute ma logique coté front-end et cantonner le back end au Server Side Rendering en raison de ma stratégie de déploiement. Celle-ci est basique : avoir un déploiement simple et sans cout financier. Ainsi j'ai opté pour un hébergement serverless, sans base de donnée, avec Netlify. De même, j'ai choisi le module ExcelJS pour créer le fichier de control Excel.

Cette petite application comporte deux routes front, ou le codage des composant se trouve dans les dossiers **[/src/app/components/roots]**. Ces derniers font appel à d'autres sous-composants rangé dans le dossier **[/src/components/layoutUX/components]**. 

