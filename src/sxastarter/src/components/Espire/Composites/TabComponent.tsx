import {
  Field,
  withDatasourceCheck,
  Placeholder,
  RichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { EditMode } from 'lib/component-props';
import React from 'react';

type TabsProps = ComponentProps & {
  fields: {
    items: data[];
    Title: Field<string>;
    Content: Field<string>;
  };
};
type data = {
  fields: {
    Heading: Field<string>;
    Content: Field<string>;
  };
};
const TabComponent = (props: TabsProps): JSX.Element => {
  const isEdit = EditMode();
  return (
    <div className={`tabs`}>
      {isEdit ? (
        props?.fields?.items?.map((item, index) => {
          return (
            <div key={index}>
              <div className="heading">
                <RichText field={item?.fields?.Heading} />
              </div>
              <div className="content">
                <RichText field={item?.fields?.Content} />
                <Placeholder
                  key={index}
                  name={`tabcontainer-${index + 1}`}
                  rendering={props?.rendering}
                />
              </div>
            </div>
          );
        })
      ) : (
        <Tab.Container id="left-tabs-example" defaultActiveKey="0">
          <Row>
            <Col sm={12}>
              <Nav variant="tabs" className="">
                {props?.fields?.items?.map((item, index) => {
                  return (
                    <Nav.Item key={index}>
                      <Nav.Link eventKey={index}>
                        <RichText field={item?.fields?.Heading} />
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>
            </Col>

            <Col sm={12}>
              <Tab.Content>
                {props?.fields?.items?.map((item, index) => {
                  return (
                    <Tab.Pane eventKey={index} key={index}>
                      <RichText field={item?.fields?.Content} />
                      <Placeholder
                        key={index}
                        name={`tabcontainer-${index + 1}`}
                        rendering={props?.rendering}
                      />
                    </Tab.Pane>
                  );
                })}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </div>
  );
};

export default withDatasourceCheck()<TabsProps>(TabComponent);
