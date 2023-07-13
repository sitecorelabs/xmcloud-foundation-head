import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
export type LinkTemplateProps = ComponentProps & {
  params: { [key: string]: string };
  fields: {
    Link: LinkField;
  };
};
