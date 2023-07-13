import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchBar = (): JSX.Element => {
  return (
    <div className="search-bar">
      <InputGroup className="mb-3">
        <Button variant="outline-secondary" id="button-addon1">
          <i className="fa fa-search"></i>
        </Button>
        <Form.Control
          aria-label="search bar"
          aria-describedby="basic-addon1"
          placeholder="Search by case and more"
        />
      </InputGroup>
    </div>
  );
};

export default SearchBar;
