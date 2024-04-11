import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import '../styles/Footer.css';
import PropTypes from 'prop-types';


const Footer = ()=> {
  const names = ['Chris', 'Ellis', 'Logan', 'Sean', 'Stephen'];
  const urls = [
    'https://github.com/chrisr0892',
    'https://github.com/elsong86',
    'https://github.com/ljn16',
    'https://github.com/sfryan95',
    'https://github.com/stephenhyang',
  ];
  const res = [];

  for (let i = 0; i < names.length; i++) {
    res.push(<Box key={uuidv4()} name={names[i]} url={urls[i]} />);
  }
  return (
    <div id="footer">
      <h2>AxoGroup</h2>
      <h4>Design Team: </h4>
      {res}
    </div>
  );
}

const Box = ({ name, url }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ marginRight: '10px' }}>{name} </p>
      <a href={url}>
        <GithubOutlined style={{ color: 'white', fontSize: '24px' }} />
      </a>
    </div>
  );
};

//Enforce prop types
Box.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Footer;