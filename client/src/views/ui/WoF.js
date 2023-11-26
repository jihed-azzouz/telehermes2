import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import WheelComponent from "react-wheel-of-prizes";

const WoF = () => {
  const segments = [
    "2000XP",
    "mobile",
    "try next week",
    "K",
    "AoN",
    "P3",
    "P4",
    "EJ",
    "EM",
    "PB",
    "MM",
    "L",
  ];
  const segColors = [
    "#cd4548",
    "#1691d4",
    "#62b48c",
    "#ffa20f",
    "#7b6bb7",
    "#909a8c",
    "#7a1f1f",
    "#d1a365",
    "#114a96",
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
  ];
  const onFinished = (winner) => {
    console.log(winner);
  };
  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bullseye "> </i>
            Wheel of Fortune
          </CardTitle>
          <CardBody>
            <Form>
              <div className="wheel-of-fortune">
                <WheelComponent
                  segments={segments}
                  segColors={segColors}
                  // winningSegment="MM"
                  onFinished={(winner) => onFinished(winner)}
                  primaryColor="black"
                  contrastColor="white"
                  buttonText="Spin"
                  isOnlyOnce={false}
                  size={190}
                  upDuration={400}
                  // downDuration={600}
                  fontFamily="Helvetica"
                />
              </div>
              <div className="wheel-of-fortune">
                Do you feel lucky enough this week
              </div>
              {/* <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="with a placeholder"
                  type="email"
                />
              </FormGroup> */}
              {/* <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="password placeholder"
                  type="password"
                />
              </FormGroup> */}
              {/* <FormGroup>
                <Label for="exampleSelect">Select</Label>
                <Input id="exampleSelect" name="select" type="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup> */}
              {/* <FormGroup>
                <Label for="exampleSelectMulti">Select Multiple</Label>
                <Input
                  id="exampleSelectMulti"
                  multiple
                  name="selectMulti"
                  type="select"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup> */}

              {/* <FormGroup tag="fieldset">
                <legend>Radio Buttons</legend>
                <FormGroup check>
                  <Input name="radio1" type="radio" />{" "}
                  <Label check className="form-label">
                    Option one is this and that—be sure to include why it's
                    great
                  </Label> */}
              {/* </FormGroup> */}
              {/* <FormGroup check>
                  <Input name="radio1" type="radio" />{" "}
                  <Label check className="form-label">
                    Option two can be something else and selecting it will
                    deselect option one
                  </Label>
                </FormGroup> */}
              {/* <FormGroup check disabled>
                  <Input disabled name="radio1" type="radio" />{" "}
                  <Label check>Option three is disabled</Label>
                </FormGroup> */}
              {/* </FormGroup> */}
              {/* <FormGroup check className="form-label">
                <Input type="checkbox" /> <Label check>Check me out</Label>
              </FormGroup> */}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default WoF;

// for adding feedback later
{
  /* <FormGroup>
<Label for="exampleText">Text Area</Label>
<Input id="exampleText" name="text" type="textarea" />
</FormGroup> */
}
