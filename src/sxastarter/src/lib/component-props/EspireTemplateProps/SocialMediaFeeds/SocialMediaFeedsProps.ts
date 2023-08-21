import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type SocialMediaFeedsProps = ComponentProps & {
  params: { [key: string]: string };
  fields: {
    URL: Field<string>;
    ClassName: Field<string>;
    ID: Field<string>;
  };
};
