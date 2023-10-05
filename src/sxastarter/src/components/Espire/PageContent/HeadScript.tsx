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
    <div className={`head-script ${props.params.styles}`}>
      {isEdit ? (
        <div>Add Script here</div>
      ) : (
        <Script id="abc" src={props?.fields?.script?.value}>
          {props?.fields?.function?.value}
        </Script>
      )}
    </div>
  );
};

export default withDatasourceCheck()<HeadScriptTemplateProps>(HeadScript);
