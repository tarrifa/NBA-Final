import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import './App.css';
import logo from './nba.png';

function App() {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState('');
  const [message, setMessage] = useState(" ");
  const heights = [];

  useEffect(() => {
    axios.get('https://mach-eight.uc.r.appspot.com/').then((res) =>{
      setData(res.data.values);
  });
  }, [])

  const handleChange = (e) => {
    e.preventDefault();
    for(var i = 0; i<data.length;i++){
      var val = info - parseInt(data[i].h_in);
      if(val>0){
        for(var j = i+1; j< data.length;j++){
          if(val === parseInt( data[j].h_in) && i !== j){
            heights.push([data[i].first_name.concat( ' ',data[i].last_name ), data[j].first_name.concat( ' ',data[j].last_name )]);
          } 
        }
      }
    }

    if(heights.length === 0){
      setMessage("No matches found")
    }else{
      let players = '';
      for(var k = 0; k< heights.length;k++){
        players = players.concat(heights[k].toString(), '\n')
      }
     console.log(players)
      setMessage(players)
    }
    
  };

  return (
  <Container fluid className="content">
    <Row>
    <Col xs={6} md={4}>
      <Image src={logo} rounded height="100px"/>
    </Col>
    </Row>
      <Row>
      <form onSubmit={handleChange}>
      <label>
        PLEASE ENTER THE DESIRED SUM OF HEIGHTS
        <br/>
        <input
          value={info}
          onChange={event => setInfo(event.target.value)}
          name="info"
          type="number"
        />
      </label>
      <br/>
      <Button type="submit" className= "button">SUBMIT</Button>
    </form>
    
      </Row>
      <Row className="answer">
      {message.length >0 && <div>{message}</div>}
      </Row>
  </Container>
);
  
}

export default App;
