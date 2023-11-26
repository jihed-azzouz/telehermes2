import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";

const Referrals = () => {
  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-link me-2"> </i>
            Referrals details
          </CardTitle>
          <CardBody>
            <div className="referral-item">
              <div className="btn btn-secondary">Your Referral ID</div>
              <div>HY67E</div>
            </div>
            <div className="referral-item">
              <div className="btn btn-warning">Referred by</div>
              <input type="text" />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Referrals;
