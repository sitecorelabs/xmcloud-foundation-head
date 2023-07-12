import { ImageField, LinkField, Field, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
export type BannerTemplateProps = ComponentProps & {
  params: { [key: string]: string };
  fields: {
    Image: ImageField;
    Title: Field<string>;
    Description: RichTextField;
    Link: LinkField;
  };
};
