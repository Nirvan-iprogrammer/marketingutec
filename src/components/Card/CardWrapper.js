import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';

const CardWrapper = ({title, children, actions}) => {
    return (
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              {(title || actions) && (
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col lg={12}>
                      <div className=" d-flex justify-content-between">
                        <div>
                          <h3 className="mb-0">{title}</h3>
                        </div>
                        <div>{actions}</div>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
              )}
              <CardBody>{children}</CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
}

export default CardWrapper