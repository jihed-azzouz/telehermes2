import { Card, CardText, CardTitle, Button, Row, Col } from "reactstrap";

const Rewards = () => {
  return (
    <div>
      <h5 className="mb-3">Rewards</h5>
      <Row>
        <Col md="6" lg="4">
          <Card body>
            <CardTitle tag="h5">Fitness points</CardTitle>
            <CardText>counter</CardText>
            <div>
              <Button color="light-warning">Go somewhere</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body className="text-center">
            <CardTitle tag="h5">Knowledge points</CardTitle>
            <CardText>counter</CardText>
            <div>
              <Button color="light-danger" href="http://localhost:3000/#/quiz">
                Take Quiz{" "}
              </Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body className="text-end">
            <CardTitle tag="h5">Guess my number</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button color="light-success" href="http://localhost:3000/#/gmn">
                Play the game
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Rewards;
