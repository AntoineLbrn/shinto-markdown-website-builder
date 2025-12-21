# Présentation

Interface de consultation des liens entre la pop culture et les mythes et légendes du shintoïsme japonais.

Le but est d'avoir à la fois des informations quantitatives `/graphes`, et des données qualitatives qui explicitent ces liens de manière formelle (`/pokemon` par exemple)

Tout le travail d'indexation et de recherche se trouve ici : https://drive.google.com/drive/folders/1i0cv09CCcaZasBN5G9HAcruPHbytZ6LF?usp=sharing

# Visualisations quantitatives

TODO

# Approche qualitative

Tous les fichiers markdown peuvent être rendus tel quel par un composant d'affichage par défaut.
Si jamais un type spécifique est trouvé (`Yokai`, `Pokemon`...), on fait appel à un composant d'affichage spécifique.

## Pokemon

- Récupération de la liste des Pokémon via PokeAPI.
- Slugification et moteur de recherche
- Liens avec le YokaiDex
- etc... (TODO)