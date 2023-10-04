interface CookieConfig {
  name: string;
  label: string;
  description: string;
  cookies: string[];
  onAccept: () => void;
  onRevoke: () => void;
}

interface Config {
  apiKey: string;
  product: string;
  optionalCookies: CookieConfig[];
  position: 'LEFT' | 'RIGHT';
  theme: 'LIGHT' | 'DARK';
}

declare global {
  interface Window {
    CookieControl: {
      load: (config: Config) => void;
    };
  }
}
const Cookie = () => {
  const config: Config = {
    apiKey: '1b61fa3d5212eb369497b28bb5372d02f23597b0',
    product: 'community',
    optionalCookies: [
      {
        name: 'analytics',
        label: 'Analytics',
        description: 'Analylitcs Cookie',
        cookies: [],
        onAccept: () => {
          ('');
        },
        onRevoke: () => {
          ('');
        },
      },
      {
        name: 'marketing',
        label: 'Marketing',
        description: '',
        cookies: [],
        onAccept: () => {
          ('');
        },
        onRevoke: () => {
          ('');
        },
      },
      {
        name: 'preferences',
        label: 'Preferences',
        description: '',
        cookies: [],
        onAccept: () => {
          ('');
        },
        onRevoke: () => {
          ('');
        },
      },
    ],
    position: 'RIGHT',
    theme: 'DARK',
  };

  return <>{typeof window !== 'undefined' && window?.CookieControl?.load(config)}</>;
};

export default Cookie;
