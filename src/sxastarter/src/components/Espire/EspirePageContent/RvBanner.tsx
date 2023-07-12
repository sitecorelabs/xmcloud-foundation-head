import React from 'react';
import { BannerTemplateProps } from 'lib/espire-component-props/BannerTemplateProps';

import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';

const RvBannerDefaultComponent = (props: BannerTemplateProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">SAy hello</div>
  </div>
);

export const HomePageBanner = (props: BannerTemplateProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.Image} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText field={props.fields.Description} />
              </div>
            </div>
            <div className="field-promolink">
              <JssLink field={props.fields.Link} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <RvBannerDefaultComponent {...props} />;
};

export const Default = (): JSX.Element => {
  return <div> Kindly Select the Varaint </div>;
};
