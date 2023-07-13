import React from 'react';
import { BannerTemplateProps } from 'lib/component-props/EspireTemplateProps/PageContent/BannerTemplateProps';

import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  Text,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';

export const Banner = (props: BannerTemplateProps): JSX.Element => {
  return (
    <section className="banner banner-with-cta">
      <JssImage field={props.fields.Image} />
      <div className="container">
        <div className="banner-content">
          <Text tag="h1" field={props?.fields?.Title} />
          <JssRichText field={props.fields.Description} tag="p" />
          <JssLink field={props.fields.Link} className="primary-btn" />
        </div>
      </div>
    </section>
  );
};

export default withDatasourceCheck()<BannerTemplateProps>(Banner);
