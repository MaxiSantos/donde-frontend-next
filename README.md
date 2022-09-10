This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

You can deploy with git, deploy hooks or vercel-cli

Vercel-cli
https://vercel.com/docs/concepts/deployments/overview#vercel-cli

1- 
```bash
vercel (for preview deployment)
```

2- 
```bash
vercel --prod (for production deployment)
```


The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Github actions

https://vercel.com/guides/how-can-i-use-github-actions-with-vercel

If build process needs to checkout private repo then do this
1- https://stackoverflow.com/a/70283191 
create ssh keys and set them in private repo (as deploy_key) and dependent repo (as secret key) (SSH key dont have to have passphrase)
###### official way to generate ssh keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#about-ssh-key-passphrases

2- then use ssh_key flag in checkout actions

## Isuses found

1- <Link href="profile"

this was causing getStaticProps from store[i] to somehow receive { params:{id:'profile'}}

FIX: always prepend slash on next link

2- styled componet and mui were failing at build time

a- follow next and tsconf steps https://mui.com/material-ui/guides/styled-engine/#next-js
b- also add mui/lab https://github.com/mui/material-ui/issues/28559#issuecomment-931423462
## Setup DNS

1- https://vercel.com/support/articles/how-to-manage-vercel-dns-records
2-

## Knowledge

1- https://stackoverflow.com/questions/67787456/what-is-the-difference-between-fallback-false-vs-true-vs-blocking-of-getstaticpa

info about fallback flag on getStaticPaths

## MUI components
```js
export const Container = styled('div')<Props>((props) => ({
  position: `${props.$ismobile ? 'relative' : 'fixed'}`,
  minHeight: '100vh',
  overflow: 'hidden',
  backgroundColor: props.theme.palette.grey2.darken,
  display: 'block',
  boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.12)",
  zIndex: 11,
  minWidth: '225px',
  maxWidth: '225px',
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
}));

```