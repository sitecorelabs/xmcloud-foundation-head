import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { SocialMediaFeedsProps } from 'lib/component-props/EspireTemplateProps/SocialMediaFeeds/SocialMediaFeedsProps';
import dynamic from 'next/dynamic';

const SocialMediaFeed = dynamic(() => import('./Feeds'), {
  loading: () => <p>Loading....</p>,
  ssr: false,
});

export const SocialMediaFeeds = (props: SocialMediaFeedsProps): JSX.Element => {
  return <SocialMediaFeed {...props} />;
};

export default withDatasourceCheck()<SocialMediaFeedsProps>(SocialMediaFeeds);
