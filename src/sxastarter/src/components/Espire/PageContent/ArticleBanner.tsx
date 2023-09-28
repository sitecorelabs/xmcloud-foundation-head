import { Field, ImageField, RichTextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps, DropLinkField } from 'lib/component-props';
type ArticleBannerProps = ComponentProps & {
  params: { [key: string]: string };
  fields: {
    Image: ImageField;
    Title: Field<string>;
    Content: RichTextField;
    ArticleType: DropLinkField;
    PublishDate: Field<string>;
    Author: DropLinkField;
  };
};
const ArticleBanner = (props: ArticleBannerProps): JSX.Element => {
  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    // Function to add "th", "st", "nd", or "rd" to the day
    function getDayWithSuffix(day: number) {
      if (day >= 11 && day <= 13) {
        return day + 'th';
      } else {
        switch (day % 10) {
          case 1:
            return day + 'st';
          case 2:
            return day + 'nd';
          case 3:
            return day + 'rd';
          default:
            return day + 'th';
        }
      }
    }

    const formattedDate = `${getDayWithSuffix(day)} ${month} ${year}`;
    return formattedDate;
  }

  const inputDate = props?.fields?.PublishDate?.value;
  const formattedDate = formatDate(inputDate);

  return (
    <div className={`${props?.params?.styles} separator`}>
      <div className="banner-third-version">
        <img
          src={props?.fields?.Image?.value?.src}
          alt={props?.fields?.Image?.value?.alt as string}
        />
        <div className="banner-content">
          <h1>{props?.fields?.Title?.value}</h1>
          <p>
            By : {props?.fields?.Author?.fields?.Text?.value} | {formattedDate}
          </p>
          <a href="#" role="button" aria-label="press" className="tertiary-btn">
            {props?.fields?.ArticleType?.fields?.Text?.value}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleBanner;
