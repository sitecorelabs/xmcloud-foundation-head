import React from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

type SecondaryNavProps = {
  componentName: string;
  params: { [key: string]: string };
};
const Test = (): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const data = sitecoreContext?.route?.placeholders;
  const NavData: Record<string, unknown>[] = [];
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (key == 'headless-main') {
        data[key]?.forEach((item: SecondaryNavProps) => {
          if (item?.params?.IncludeInSecNav) {
            NavData.push(item?.params);
          }
        });
      }
    }
  }

  return (
    <section className="scroll-nav d-none d-md-block">
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              Hey this is test component to check
              {NavData?.map((value: { Title: string; 'nav-id': string }, index: number) => (
                <li className="nav-item" key={index}>
                  <a className="nav-link text-white px-lg-3" href={`#${value['nav-id']}`}>
                    {value.Title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Test;
