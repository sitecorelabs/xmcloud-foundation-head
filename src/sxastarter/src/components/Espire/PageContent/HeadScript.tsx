import React from 'react';
import { Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps, EditMode } from 'lib/component-props';
import Script from 'next/script';

export type HeadScriptTemplateProps = ComponentProps & {
  params: { [key: string]: string };
  fields: {
    script: Field<string>;
    function: Field<string>;
  };
};

export const HeadScript = (props: HeadScriptTemplateProps): JSX.Element => {
  const isEdit = EditMode();
  return (
    <>
      {isEdit ? (
        <div>Add Script here</div>
      ) : (
        <Script
          id="scripts"
          src={props?.fields?.script?.value}
          dangerouslySetInnerHTML={{ __html: props?.fields?.function?.value }}
          strategy={'beforeInteractive'}
        ></Script>
      )}
    </>
  );
};

export default withDatasourceCheck()<HeadScriptTemplateProps>(HeadScript);
