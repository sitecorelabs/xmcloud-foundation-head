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
  url: urlData;
};

export type result = {
  value: unknown;
  __typename: string;
  name: string;
  jsonValue: {
    value: valueObject;
  };
};

type valueObject = (string | LinkField | ImageField | RichTextField) & {
  src: string;
  alt: string;
};

export type urlData = {
  path: string;
  siteName: string;
  url: string;
};

export type ActualData = {
  [key: string]: {
    [key: string]: string & {
      [key: string]: string;
    };
  };
};
