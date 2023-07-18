import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
export type RichTextReusableTemplateProps = ComponentProps & {
  params: { [key: string]: string };
  fields: {
    RichText: Field<string>;
  };
};
