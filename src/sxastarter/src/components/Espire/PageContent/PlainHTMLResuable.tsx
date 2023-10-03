import React from 'react';
import { PlainHTMLResuableTemplateProps } from 'lib/component-props/EspireTemplateProps/PageContent/PlainHTMLResuableTemplateProps';
import { withDatasourceCheck, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { EditMode } from 'lib/component-props';

export const PlainHTMLResuable = (props: PlainHTMLResuableTemplateProps): JSX.Element => {
  const editMode = EditMode();
  return (
    <>
      {editMode ? (
        <Text field={props?.fields?.PlainHTML} />
      ) : (
        <div className={`plain-text-reusable ${props.params.styles}`}>
          <div dangerouslySetInnerHTML={{ __html: props?.fields?.PlainHTML?.value }} />
        </div>
      )}
    </>
  );
};

export default withDatasourceCheck()<PlainHTMLResuableTemplateProps>(PlainHTMLResuable);
