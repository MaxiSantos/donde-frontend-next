import { BaseProfile } from 'app/common/components/pageTemplate/Profile';
import { TextHelper } from 'app/common/lib/text';
import { useTranslation } from 'react-i18next';

export const Profile = (props) => {
  const { t } = useTranslation(['profile', 'common']);
  /*const customTabs = [
    {
      label: t('subscription.title'),
      content: <p>{TextHelper.capitalize(t('wip', { ns: 'common' }))}</p>,
      disabled: true
    }
  ];*/

  return <BaseProfile />
};
