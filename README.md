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

https://nodejs.org/api/cli.html#--preserve-symlinks


# Deploy on Vercel

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

# Github actions

https://vercel.com/guides/how-can-i-use-github-actions-with-vercel

If build process needs to checkout private repo then do this
1- https://stackoverflow.com/a/70283191 
create ssh keys and set them in private repo (as deploy_key) and dependent repo (as secret key) (SSH key dont have to have passphrase)
###### official way to generate ssh keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#about-ssh-key-passphrases

2- then use ssh_key flag in checkout actions


##### Example yaml for next
https://github.com/amondnet/vercel-action/blob/master/.github/workflows/example-nextjs.yml
and 
https://aaronfrancis.com/2021/the-perfect-vercel-github-actions-deployment-pipeline

1- Going with the example above we have to configure on nextjs project settings what to do in install and build (I removed those settings based on some posts but by doing that the build step in github actions was doing nothing and therefore it was pushing useless folder to vercel)

2- I tried to use `vercel env pull .env.local` which worked as it downloads the env.local file in current directory  instead of .vercel dir but github actions complain I need a vercel project (that's because vercel pull also download the project settings) So at the end I left vercel pull and then copied the env file from .vercel to current directoy so next build could make it using preview env file 

3- Finally, env.preview.local was not recognized by next build as preview is not allowed so therefore I had to copy content from env.preview.local into .env file

# Isuses found

## Next

1- <Link href="profile"

this was causing getStaticProps from store[i] to somehow receive { params:{id:'profile'}}

FIX: always prepend slash on next link

2- styled componet and mui were failing at build time

a- follow next and tsconf steps https://mui.com/material-ui/guides/styled-engine/#next-js
b- also add mui/lab https://github.com/mui/material-ui/issues/28559#issuecomment-931423462
**UPDATE:** we switched to emotion

## Middlewares
a- a console.log({req}) from within middleware was causing 

Error: Failed to get the 'cache' property on 'Request': the property is not implemented.

removing the console fixed the issue, seems other faced similar issues: https://github.com/orgs/vercel/discussions/152

b- Can't use axios in middleware, moved to fetch
c- By using fetch, I wasn't receving cookies on backend if they are set with strict. Has to change to lex.
d- Also, in order to updated cookies we have to do a redirection with updated cookies.. backend return cookies but for some reason they are not updated when doind NextResponse.next() (it make sense cause the NextResponse is not supposed to be the response of some extra api request): https://github.com/vercel/next.js/issues/36049#issuecomment-1122077832
## Emotion

a- content: "\a100" was not working, we have to escape them
https://github.com/emotion-js/emotion/issues/1660
b- There is potentially unsafe when doing server-side
  * https://dev.to/hajhosein/nextjs-mui-v5-tutorial-2k35
  * https://gist.github.com/Danetag/800e1281a8e58a05cdd5de2caeeab4d1
  * https://github.com/emotion-js/emotion/issues/1105#issuecomment-557726922

I follwed this tutorial at the end: https://dev.to/hajhosein/nextjs-mui-v5-tutorial-2k35#step-seven reason: https://github.com/vercel/next.js/issues/15642

it turns out changes applied only to app wasn't enough.. on first load the page was rendered on the browser instead of coming all styled from server. The change made in document made that possible. Also the change made in app with compat=true makes possible quit the "There is potentially unsafe when doing server-side"

## Versioning
Common folder contains scripts for versioning app. But that is a symbolink link and when executing the script it was failing because it was using original path. To solve that we added `node --preserve-symlinks and --preserve-symlinks-main path-to-symbolic-file`
## Setup DNS

1- https://vercel.com/support/articles/how-to-manage-vercel-dns-records
2-

# Knowledge

#### nextjs
1- https://stackoverflow.com/questions/67787456/what-is-the-difference-between-fallback-false-vs-true-vs-blocking-of-getstaticpa

#### jwt

1- How to create a secret for jwt

`openssl rand -base64 32`

#### node
1- exporting an imported function
https://stackoverflow.com/questions/30712638/typescript-export-imported-interface
```js
export { name } from 'source'
```

#### CSS
1- Position absolute elements
https://stackoverflow.com/questions/8508275/how-to-center-a-position-absolute-element

#### emotion component
```js
  export const ContainerSection = styled(Container, EmotionHelper.getTransientOptions()) <Props>`
    margin-top: 25px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0 12px 0 rgba(0,0,0,0.06);
    padding: ${(props) => props.$ismobile ? "0 10px 15px 10px" : "0 40px 25px 40px !important"};		
  `;
```

#### MUI components
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
