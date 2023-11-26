import { Card, CardText, CardTitle, Button, Row, Col } from "reactstrap";
import Blog from "../../components/dashboard/Blog";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";

const BlogData = [
  {
    image: bg1,
    title: "REDEEM 5000 HUF",
    description:
      "Redeem your points for a 5000 credit transaction into your Telehermes account.",
    btnbg: "secondary",
  },
  {
    image: bg2,
    title: " REDEEM 2500 HUF",
    description:
      "Redeem your points for a 2500 credit transaction into your Telehermes account.",
    btnbg: "secondary",
  },
  {
    image: bg3,
    title: "REDEEM 1000 HUF",
    description:
      "Redeem your points for a 1000 credit transaction into your Telehermes account.",
    btnbg: "secondary",
  },
  {
    image: bg4,
    title: "REDEEM VOUCHER",
    description:
      "Got sensitive hair? Only shower once a week? This week's sponsor is perfect for you. Head and Shoulders is offering a 15% discount on select items.",
    btnbg: "secondary",
  },
];
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
            <CardTitle tag="h5">Total Points</CardTitle>
            <CardText>Enjoy spending your total points</CardText>
            <div>Total points:</div>
          </Card>
        </Col>
      </Row>
      <Row>
        <div>
          <h5 className="mb-3">Basic Card</h5>
          <Row>
            {BlogData.map((blg, index) => (
              <Col sm="6" lg="6" xl="3" key={index}>
                <Blog
                  image={blg.image}
                  title={blg.title}
                  subtitle={blg.subtitle}
                  text={blg.description}
                  color={blg.btnbg}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Row>
    </div>
  );
};
export default Rewards;
