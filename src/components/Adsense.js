import React, { Component } from 'react'


export default class Ad extends Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render () {
    return (
      <div className='ad'>
        <ins className='adsbygoogle'
          style={{ display: 'block' }}
          data-ad-client='ca-pub-1817062237129003'
          data-ad-slot='1234567890'
          data-ad-format='auto' />
      </div>
    );
  }
}

