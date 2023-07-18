import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
export type PlainHTMLResuableTemplateProps = ComponentProps & {
  params: { [key: string]: string };
  fields: {
    PlainHTML: Field<string>;
  };
};
