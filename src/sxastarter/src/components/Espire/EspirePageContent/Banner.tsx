import React from 'react';
import { BannerTemplateProps } from 'lib/espire-component-props/BannerTemplateProps';

import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  Text,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';

export const Banner = (props: BannerTemplateProps): JSX.Element => {
  console.log(props);
  const id = props.params.RenderingIdentifier;
  return (
    <div
      className={`component banner banner--homepage ${props.params.styles}`}
      id={id ? id : undefined}
    >
      <div className="component-content">
        <section className="banner">
          <JssImage field={props.fields.Image} />
          <div className="container">
            <div className="banner-content">
              <Text tag="h1" field={props?.fields?.Title} />
              <JssRichText field={props.fields.Description} />
              <JssLink field={props.fields.Link} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<BannerTemplateProps>(Banner);
