import React from 'react';
import { RichTextReusableTemplateProps } from 'lib/component-props/EspireTemplateProps/PageContent/RichTextReusableTemplateProps';
import { RichText, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';

export const RichTextReusable = (props: RichTextReusableTemplateProps): JSX.Element => {
  return (
    <div className={`richtext-reusable ${props.params.styles}`}>
      <RichText field={props?.fields?.RichText} />
    </div>
  );
};

export default withDatasourceCheck()<RichTextReusableTemplateProps>(RichTextReusable);
