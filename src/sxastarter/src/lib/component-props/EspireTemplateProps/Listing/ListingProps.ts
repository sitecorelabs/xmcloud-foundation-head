import { ImageField, LinkField, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type ListingProps = ComponentProps & {
  ListingData: {
    children: {
      results: list[];
      pageInfo: {
        endCursor: string;
        hasNext: boolean;
      };
    };
  };
};

export type list = {
  fields: {
    [key: string]: result[];
  };
};

export type result = {
  [key: string]: {
    [key: string]: {
      [key: string]: string | LinkField | ImageField | RichTextField;
    };
  };
};

export type State = {
  finalData: [];
};
