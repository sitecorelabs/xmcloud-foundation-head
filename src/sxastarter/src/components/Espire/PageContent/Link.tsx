import React from 'react';
import { LinkTemplateProps } from 'lib/component-props/EspireTemplateProps/PageContent/LinkTemplateProps';
import { Link as JssLink, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { EditMode } from 'lib/component-props';

export const Link = (props: LinkTemplateProps): JSX.Element => {
  return (
    <div className={`link ${props.params.styles}`}>
      <JssLink field={props?.fields?.Link} />
    </div>
  );
};

// This is rendering variant of link
export const SkipToMainContent = (props: LinkTemplateProps): JSX.Element => {
  const isEdit = EditMode();
  return (
    <div className={`link ${props.params.styles} skip-to-content`}>
      {isEdit ? (
        <JssLink field={props?.fields?.Link} className="skip-content" />
      ) : (
        <a
          href={props?.fields?.Link?.value?.href}
          className="skip-content sr-only sr-only-focusable"
        >
          {props?.fields?.Link?.value?.text}
        </a>
      )}
    </div>
  );
};

export default withDatasourceCheck()<LinkTemplateProps>(Link);
