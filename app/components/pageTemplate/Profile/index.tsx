import { BaseProfile } from 'app/common/components/pageTemplate/Profile';

export const Profile = (props) => {
  const customTabs = [
    {
      label: 'Subscriptions',
      content: <p>list of subscriptions</p>
    }
  ];

  return <BaseProfile customTabs={customTabs} />
};
