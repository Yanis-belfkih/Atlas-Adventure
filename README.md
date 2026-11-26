# Atlas Adventures

Site vitrine et de réservation pour des treks guidés dans le Haut Atlas (Maroc).
Les réservations sont envoyées directement par **WhatsApp** — aucun backend, aucune base de données, aucune clé API.
Le site est exporté en fichiers statiques et hébergé sur **GitHub Pages**.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, export statique)
- React 19 + TypeScript
- Tailwind CSS v4 + composants [shadcn/ui](https://ui.shadcn.com) (Radix UI)

## Démarrage

Prérequis : Node.js 20.9 ou plus récent.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Commande            | Rôle                                                                  |
| ------------------- | --------------------------------------------------------------------- |
| `npm run dev`       | Serveur de développement                                              |
| `npm run build`     | Génère le site statique dans `out/` (à publier tel quel)              |
| `npm run images`    | Régénère les images optimisées (lancé automatiquement par dev/build)  |
| `npm run typecheck` | Vérification TypeScript                                               |

### Variables d'environnement

Toutes sont facultatives en local. Sur GitHub Pages, le workflow de déploiement les remplit (voir [Déploiement](#déploiement-sur-github-pages)). Modèle : `.env.example`.

| Variable                               | Rôle                                                                                                       |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | URL publique du site (SEO : URL canoniques, sitemap, aperçus WhatsApp/Facebook)                             |
| `NEXT_PUBLIC_BASE_PATH`                | Sous-dossier du site, ex. `/mon-repo` pour `https://user.github.io/mon-repo`. Vide avec un nom de domaine  |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Code de vérification Google Search Console (méthode « balise HTML »)                                        |

## Structure

```
app/
  page.tsx              Page d'accueil
  book/[id]/page.tsx    Page détail + réservation d'une offre
  terms/ privacy/ legal/  Pages légales
  not-found.tsx         Page 404
  sitemap.ts, robots.ts, manifest.ts   SEO et icône d'application
  icon.svg, apple-icon.png, favicon.ico   Icônes du site
components/
  booking/              Détail d'une offre + formulaire de réservation WhatsApp
  site-header.tsx, site-footer.tsx, page-header.tsx, testimonials.tsx
  ui/                   Composants de base shadcn/ui
lib/
  site.ts               ⚙️ Coordonnées, liens, devise, supplément solo
  data.ts               ⚙️ Contenu des offres (textes, prix, itinéraires, photos)
  testimonials.ts       ⚙️ Avis clients
  pricing.ts            Calcul des prix (tarifs de groupe, supplément solo)
  seo.ts                Balises SEO et données structurées (schema.org)
  image-loader.ts       Lien entre next/image et les images pré-optimisées
scripts/
  optimize-images.mjs   Génère les tailles WebP et les aperçus réseaux sociaux
public/                 Images (public/icons/ : icônes d'application)
.github/                Déploiement GitHub Pages + mises à jour automatiques (Dependabot)
```

## Modifications courantes

- **Téléphone / WhatsApp / e-mail / réseaux sociaux / devise** → `lib/site.ts`
- **Ajouter ou modifier une offre** → `lib/data.ts`. Une nouvelle entrée obtient automatiquement sa page `/book/<id>/` et apparaît dans le sitemap. Pour l'afficher sur l'accueil et dans le pied de page, ajouter son `id` à l'un des groupes de `offerGroups` (Sommet du Toubkal, À la journée, Vallées & désert). Le champ `teaser` est le texte court des cartes, `gallery` les photos affichées à côté de l'image principale sur la page de l'offre.
- **Couleurs et polices** → `app/globals.css` (palette `--color-*`) et `app/layout.tsx` (Fraunces + DM Sans).
- **Tarifs de groupe** → champ `pricingTiers` d'une offre, ex. `{ people: 2, pricePerPerson: 220 }`. Chaque palier va jusqu'au suivant (affiché « 2–4 people », « 5–6 people »…) et le dernier s'applique aussi aux groupes plus grands. Un voyageur seul paie le premier palier + le supplément défini dans `lib/site.ts`, sauf si l'offre a `soloOnRequest: true` : le prix solo est alors « sur demande ».
- **Images** → déposer le fichier (JPG, PNG ou WebP) dans un dossier de `public/` et référencer son chemin (ex. `/img_guide/guide_04.jpg`). `npm run dev` et `npm run build` créent automatiquement les tailles optimisées dans `public/img-opt/` (dossier généré, non versionné).
  ⚠️ GitHub Pages respecte les majuscules : `Montagne_hd_1.jpg` ≠ `montagne_hd_1.jpg`. Une image qui s'affiche sous Windows peut manquer en ligne si la casse du chemin diffère.

## Déploiement sur GitHub Pages

Le site est exporté en fichiers statiques (`output: "export"`) et publié par GitHub Actions (`.github/workflows/deploy.yml`) à chaque push sur `main`.

1. Créer le dépôt GitHub et y pousser le code sur la branche `main`.
2. **Settings → Pages → Build and deployment → Source : « GitHub Actions »**.
3. Le premier déploiement démarre au push (ou via **Actions → Deploy to GitHub Pages → Run workflow**). Le site est en ligne à `https://<utilisateur>.github.io/<dépôt>/`.
4. **Nom de domaine (recommandé)** : **Settings → Pages → Custom domain**, configurer le DNS comme indiqué par GitHub, puis cocher **Enforce HTTPS**. Le sous-dossier et les URL sont ajustés automatiquement au déploiement suivant.
5. **Google Search Console** : ajouter le site (préfixe d'URL), choisir la vérification « Balise HTML », copier la valeur `content` dans la variable de dépôt `GOOGLE_SITE_VERIFICATION` (**Settings → Secrets and variables → Actions → Variables**), relancer le déploiement, valider, puis soumettre `sitemap.xml`.

Variables de dépôt facultatives : `SITE_URL` (forcer l'URL publique) et `GOOGLE_SITE_VERIFICATION`.

## Référencement (SEO)

- Titre, description et URL canonique propres à chaque page ; aperçus 1200×630 générés pour WhatsApp, Facebook et X.
- Données structurées schema.org : agence de voyage (coordonnées, réseaux sociaux) sur l'accueil, circuit avec prix et fil d'Ariane sur chaque offre.
- `sitemap.xml`, `robots.txt`, favicon, icônes et manifeste d'application.
- Images servies en WebP à la taille de l'écran ; la photo principale est préchargée.
- Avec une adresse `github.io/<dépôt>`, Google ignore le `robots.txt` du site (il doit être à la racine du domaine) : soumettre le sitemap dans Search Console, ou utiliser un nom de domaine.

## Sécurité

- **Site 100 % statique** : aucun serveur, aucune base de données, aucun formulaire côté serveur, aucun cookie. Les réservations partent sur WhatsApp.
- **Content Security Policy** (balise `<meta>` dans `app/layout.tsx`) : seuls les scripts, styles, polices et images du site lui-même peuvent se charger.
- **Politique de référent** stricte et HTTPS imposé (`upgrade-insecure-requests` + option *Enforce HTTPS* de GitHub Pages).
- **Workflow de déploiement** à permissions minimales : seule l'étape de publication peut écrire, et le jeton GitHub n'est pas conservé après le checkout.
- **Dependabot** (`.github/dependabot.yml`) propose chaque semaine les mises à jour des dépendances et chaque mois celles des actions GitHub. Activer aussi **Settings → Code security → Dependabot alerts / security updates**.
- **DDoS** : GitHub Pages sert les fichiers depuis le CDN de GitHub, qui absorbe les pics de trafic ; il n'y a pas de serveur à faire tomber. Limites d'usage : environ 100 Go de bande passante par mois et 1 Go de site.
- **Limites de GitHub Pages** : impossible d'envoyer des en-têtes HTTP (HSTS, anti-iframe) ou de bannir une IP. Pour cela : nom de domaine + **Cloudflare** (offre gratuite, proxy activé) devant GitHub Pages. Cloudflare permet de bloquer des IP ou des pays (*Security → WAF → Tools*), de limiter le débit et d'ajouter des en-têtes (*Rules → Transform Rules*) :
  `Strict-Transport-Security: max-age=63072000; includeSubDomains`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- Si un build échoue avec une erreur de sécurité de Next.js (version vulnérable), mettre Next.js à jour (`npm install next@latest`) ou fusionner la pull request de Dependabot.
