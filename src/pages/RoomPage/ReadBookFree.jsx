import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import backgroundBody from '../../assets/img/pray/thanh.jpg';
import backgroundMaria from '../../assets/img/pray/mancoi1.jpeg';
import backgroundThanhGia from '../../assets/img/pray/thanhgia.jpeg';
import taize from '../../assets/audio/taize.mp3';
import { useLocation, useParams } from 'react-router-dom';
import * as ProductService from '../../services/ProductService'
import {Helmet} from "react-helmet";

const ReadBookFree = () => {
  const location = useLocation();
  const { id } = useParams();

  const [pdfUrl, setPdfUrl] = useState('');
  const [background, setBackground] = useState('');

  useEffect(() => {
    const fetchPdf = async () => {
      const response = await ProductService.getPdfBookProduct(id);

        const blob = new Blob([response], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
    };

    fetchPdf();


    // Set the background based on the state
    if (location.state.state === '/phong-cau-nguyen/maria') {
      setBackground(backgroundMaria);
    } else if (location.state.state === '/phong-cau-nguyen/Thanh_gia') {
      setBackground(backgroundThanhGia);
    } else if (location.state.state === '/phong-cau-nguyen/body_of_Chirst') {
      setBackground(backgroundBody);
    }
    
  }, [id, location.state.state]);

  return (
    <div style={{ background: '#000', display: 'flex' }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{location.state.name}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div style={{ position: 'relative' }}>
        <Image src={background} alt="background" preview={false} style={{ objectFit:'cover', height: '618px', width:'618px'}} />
        <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <audio controls>
            <source src={taize} type="audio/mpeg" />
          </audio>
        </div>
      </div>
      <div style={{ color: '#fff' }}>
        {pdfUrl ? (
          <iframe src={pdfUrl} type="application/pdf" width="725px" height="618" allow="autoplay"></iframe>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ReadBookFree;
