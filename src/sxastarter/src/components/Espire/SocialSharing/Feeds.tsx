import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import Script from 'next/script';
import { SocialMediaFeedsProps } from 'lib/component-props/EspireTemplateProps/SocialMediaFeeds/SocialMediaFeedsProps';
export const Feeds = (props: SocialMediaFeedsProps): JSX.Element => {
  return (
    <div className={`social-media-feeds ${props.params.styles}`}>
      <div
        className={props?.fields?.ClassName?.value}
        data-embed-id={props?.fields?.ID?.value}
      ></div>
      <Script src={props?.fields?.URL?.value} strategy={'afterInteractive'}></Script>
    </div>
  );
};

export default withDatasourceCheck()<SocialMediaFeedsProps>(Feeds);
