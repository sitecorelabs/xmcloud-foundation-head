import React from 'react';
import { LinkTemplateProps } from 'lib/component-props/EspireTemplateProps/PageContent/LinkTemplateProps';
import { Link as JssLink, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { EditMode } from 'lib/component-props';

export const Link = (props: LinkTemplateProps): JSX.Element => {
  return <JssLink field={props?.fields?.Link} />;
};

// This is rendering variant of link
export const SkipToMainContent = (props: LinkTemplateProps): JSX.Element => {
  const isEditMode = EditMode();
  return isEditMode ? (
    <JssLink field={props?.fields?.Link} className="skip-content" />
  ) : (
    <a href={props?.fields?.Link?.value?.href} className="skip-content sr-only sr-only-focusable">
      {props?.fields?.Link?.value?.text}
    </a>
  );
};
export default withDatasourceCheck()<LinkTemplateProps>(Link);
