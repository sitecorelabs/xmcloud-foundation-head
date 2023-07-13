import Form from 'react-bootstrap/Form';
const LanguageSelector = (): JSX.Element => {
  return (
    <div className="header">
      <div className="language-selector">
        <Form.Select aria-label="Default select example">
          <option>Select Language</option>
          <option value="1">English</option>
          <option value="2">French</option>
          <option value="3">German</option>
        </Form.Select>
      </div>
    </div>
  );
};

export default LanguageSelector;
