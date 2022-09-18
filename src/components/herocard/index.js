import { Card, Row, Col, CardBody, CardImg, CardTitle,
  FormGroup, Label, Input, Button }
   from "reactstrap";

const HeroCard = ({ hero, index, collection, 
  onAdd, onRemove, handleChange, onSave}) => {

  return (
    <>
      <div>
        <Card >
          <CardBody >
            <Row className="hero-card">
              <Col className="hero-img-col">
                <CardImg 
                  src={hero&&hero.image&&hero.image.url}
                  className="hero-img"
                />
              </Col>

              <Col className="hero-stats" >
                <CardTitle tag="h4"
                  className="hero-name">
                  {hero&&hero.name}
                </CardTitle>

                <FormGroup className="stats-form">
                  <Label className="stat-label">Intelligence</Label>
                  <Input className="stat-input"
                    type="number"
                    name="int"
                    onChange={(e) => handleChange(e,hero.id,"intelligence",collection)}
                    value={hero&&hero.powerstats&&
                      hero.powerstats.intelligence}
                  />
                  <Label className="stat-label">Strength</Label>
                  <Input className="stat-input"
                    type="number"
                    name="str"
                    onChange={(e) => handleChange(e,hero.id,"strength",collection)}
                    value={hero&&hero.powerstats&&
                      hero.powerstats.strength}
                  />
                  <Label className="stat-label">Speed</Label>
                  <Input className="stat-input"
                    type="number"
                    name="spe"
                    onChange={(e) => handleChange(e,hero.id,"speed",collection)}
                    value={hero&&hero.powerstats&&
                      hero.powerstats.speed}
                  />
                  <Label className="stat-label">Durability</Label>
                  <Input className="stat-input"
                    type="number"
                    name="dur"
                    onChange={(e) => handleChange(e,hero.id,"durability",collection)}
                    value={hero&&hero.powerstats&&
                      hero.powerstats.durability}
                  />
                  <Label className="stat-label">Power</Label>
                  <Input className="stat-input"
                    type="number"
                    name="pow"
                    onChange={(e) => handleChange(e,hero.id,"power",collection)}
                    value={hero&&hero.powerstats&&
                      hero.powerstats.power}
                  />
                  <Label className="stat-label">Combat</Label>
                  <Input className="stat-input"
                    type="number"
                    name="com"
                    onChange={(e) => handleChange(e,hero.id,"combat",collection)}
                    value={hero&&hero.powerstats&&
                      hero.powerstats.combat}
                  />
                </FormGroup>
                {collection ? 
                <>
                  <Button className="button"
                  onClick={() => onSave(hero.id)}>
                    Save
                  </Button>
                  <Button className="button"
                  onClick={() => onRemove(hero.id)}>
                    Remove
                  </Button>
                </>
                :
                  <Button className="button"
                  onClick={() => onAdd(hero.id)}>
                    Add
                  </Button>}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
export default HeroCard;
