# Fatma Nassib Abdallah Portfolio

## Deploy with GitHub Pages

This repository deploys the Angular portfolio to GitHub Pages whenever changes are pushed to `main`.

1. Push the repository to GitHub.
2. In the repository, open **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and check the "Deploy portfolio to GitHub Pages" workflow.
5. After the first successful deployment, open **Settings > Pages** to find the site URL.

The workflow builds the production site with the repository path as its base URL, so images, certificate files, and the CV work on the GitHub project page.

## Update portfolio details

Edit the relevant content in `src/app/data/portfolio.data.ts`. This includes the profile, hero text, About copy, experience, skills, projects, and certificate list.

To add a certificate:

1. Add the certificate file under `public/`.
2. Add or update its entry in `CERTIFICATIONS` in `src/app/data/portfolio.data.ts`. Use a URL beginning with `/`, for example `url: '/my-certificate.pdf'`.
3. Commit and push the changes to `main`. GitHub Actions builds and publishes the update.

The same workflow applies to edits in other source files and replacements or additions under `public/`. Changes are not published until they are committed and pushed.

## Run locally

```sh
npm ci
npm start
```

For a production build:

```sh
npm run build -- --configuration production
```
