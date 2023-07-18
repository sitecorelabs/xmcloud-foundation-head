import { ComponentProps } from 'lib/component-props';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBox = (props: ComponentProps): JSX.Element => {
  return (
    <div className={`search-bar-default ${props.params.styles}`}>
      <div className="search-bar">
        <InputGroup className="mb-3">
          <Button variant="outline-secondary" id="search-btn">
            <i className="fa fa-search"></i>
          </Button>
          <Form.Control
            aria-label="search bar"
            aria-describedby="seacrh-bar"
            placeholder="Search by case and more"
          />
        </InputGroup>
      </div>
    </div>
  );
};

export const SearchIcon = (props: ComponentProps): JSX.Element => {
  return (
    <div className={`footer-search-bar ${props.params.styles}`}>
      <div className="search-bar">
        <InputGroup>
          <Button variant="outline-secondary" id="search-btn">
            <i className="fa fa-search"></i>
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default SearchBox;
