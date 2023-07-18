import React from 'react';
import { PlainHTMLResuableTemplateProps } from 'lib/component-props/EspireTemplateProps/PageContent/PlainHTMLResuableTemplateProps';
import { Text, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { EditMode } from 'lib/component-props';

export const PlainHTMLResuable = (props: PlainHTMLResuableTemplateProps): JSX.Element => {
  const isEdit = EditMode();
  return (
    <div className={`plain-text-reusable ${props.params.styles}`}>
      {isEdit ? (
        <Text field={props?.fields?.PlainHTML} />
      ) : (
        <>
          <div dangerouslySetInnerHTML={{ __html: props?.fields?.PlainHTML?.value }} />
        </>
      )}
    </div>
  );
};

export default withDatasourceCheck()<PlainHTMLResuableTemplateProps>(PlainHTMLResuable);
