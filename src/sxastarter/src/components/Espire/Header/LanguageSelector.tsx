import GoogleTranslate from 'components/GoogleTranslate';
import { ComponentProps } from 'lib/component-props';
import Form from 'react-bootstrap/Form';

const LanguageSelector = (props: ComponentProps): JSX.Element => {
  return (
    <div className={`${props.params.styles}`}>
      <div className="language-selector">
        <GoogleTranslate pageLanguage="en" languageList="en,ms,ta,zh-CN,fr,hi" />
        {/* <Form.Select aria-label="Default select example">
          <option>Select Language</option>
          <option value="1">English</option>
          <option value="2">French</option>
          <option value="3">German</option>
        </Form.Select> */}
      </div>
    </div>
  );
};

export default LanguageSelector;
