import { Default } from 'app/common/components/layouts/default';
import { TranslationHelper } from 'app/common/lib/translation';
import { getProviders, signIn } from "next-auth/react";
import { ClientSafeProvider } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const SignIn = ({providers, csrfToken}) => {
  console.log({providers})
  return(
  <Default>
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Username
        <input name="username" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign in</button>
    </form>
    {Object.values(providers).filter((item: ClientSafeProvider) => item.name !== 'Credentials').map((provider: ClientSafeProvider) => (
      <div key={provider.name}>
        <button onClick={() => signIn(provider.id)}>
          Sign in with {provider.name}
        </button>
      </div>
    ))}
  </Default>
)};

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { 
      providers,
      csrfToken: await getCsrfToken(context),
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    },
  }
}

/*export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
      ...(await serverSideTranslations(context.locale, TranslationHelper.getCommonSource())),
    }
  };
}*/

export default SignIn;
