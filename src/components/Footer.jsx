import React from 'react';
import { Card } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import '../styles/Footer.css';

export default function Footer() {
  const names = ['Sofia', 'Aiden', 'Austin', 'Sean', 'Dylan'];
  const urls = [
    'https://github.com/orgs/AxoGroup/people/sarhiri',
    'https://github.com/orgs/AxoGroup/people/AidenCarere',
    'https://github.com/orgs/AxoGroup/people/InvectivusTaco',
    'https://github.com/orgs/AxoGroup/people/sfryan95',
    'https://github.com/orgs/AxoGroup/people/dsterling7',
  ];
  const res = [];

  for (let i = 0; i < names.length; i++) {
    res.push(<Box key={crypto.randomUUID()} name={names[i]} url={urls[i]} />);
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
