import {
  ComponentParams,
  ComponentRendering,
  Field,
  SitecoreContextValue,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Shared component props
 */
export type ComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams;
};

/**
 * Component props with context
 * You can access `sitecoreContext` by withSitecoreContext/useSitecoreContext
 * @example withSitecoreContext()(ContentBlock)
 * @example const { sitecoreContext } = useSitecoreContext()
 */
export type ComponentWithContextProps = ComponentProps & {
  sitecoreContext: SitecoreContextValue;
};

export const EditMode = () => {
  const { sitecoreContext } = useSitecoreContext();
  return sitecoreContext?.pageEditing;
};

export type DropLinkField = ComponentProps & {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    Text: Field<string>;
  };
};
