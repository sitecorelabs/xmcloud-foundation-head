import React from 'react';
import { PlainHTMLResuableTemplateProps } from 'lib/component-props/EspireTemplateProps/PageContent/PlainHTMLResuableTemplateProps';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';

export const PlainHTMLResuable = (props: PlainHTMLResuableTemplateProps): JSX.Element => {
  return (
    <div className={`plain-text-reusable ${props.params.styles}`}>
      <div dangerouslySetInnerHTML={{ __html: props?.fields?.PlainHTML?.value }} />
    </div>
  );
};

export default withDatasourceCheck()<PlainHTMLResuableTemplateProps>(PlainHTMLResuable);
