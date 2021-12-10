import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppProvider, 
  RangeSlider, 
  Button, 
  ColorPicker, 
  Card, 
  Form, 
  FormLayout, 
  Frame, 
  Heading, 
  Label, Layout, 
  Page, 
  Select, 
  TextField, 
  Toast, 
  hsbToRgb,
  rgbToHsb,
  rgbString } from "@shopify/polaris";
import { useCallback, useState } from "react";
import ShopContext from '@app/contexts/ShopContext';

// import SmallBox from '../components/small-box/SmallBox';


const options = [
  { label: 'Falling Snow', value: '*' },
  { label: 'Falling Rain', value: '!' },
  { label: 'Falling Pumpkins', value: '🎃' },
];

const DetailComponent = ({ match }) => {
  const { id } = match.params;
  const [loader, setLoader] = useState(false);
  const [effect, setEffect] = useState('*');
  const [activeToast, setActiveToast] = useState(false);
  const [color, setColor] = useState({
    hue: 120,
    saturation: 1,
    brightness: 1,
  });
  const [speedRangeValue, setSpeedRangeValue] = useState(32);
  const [frequencyRangeValue, setFrequencyRangeValue] = useState(40);
  const [font, setFont] = useState('times');
  const { shop } = useContext(ShopContext);

  const applyClickHandler = async () => {
    const rgbaColor = rgbString(hsbToRgb(color));
    console.log(rgbaColor);
    setLoader(true);
    const applyChanges = await fetch(`http://rdp3.servnet.com.pk/public/api/applyChanges`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        shop: shop,
        sign: effect,
        color: rgbaColor,
        font: font
      })
    });
    const response = applyChanges.json();
    setLoader(false);
    toggleActive();
  }

  const handleEffectChange = useCallback((value) => setEffect(value), []);
  const toggleActive = useCallback(() => setActiveToast((toastactive) => !toastactive), []);

  const handleRangeSpeedSliderChange = useCallback(
    (value) => setSpeedRangeValue(value),
    [],
  );

  const handleRangeFrequencyChange = useCallback(
    (value) => setFrequencyRangeValue(value),
    [],
  );

  const handleFontChange = useCallback(
    (value) => setFont(value),
    [],
  );

  const toastMarkup = activeToast ? (
    <Toast content="Changes saved!" onDismiss={toggleActive} />
  ) : null;

  return <AppProvider>
    <Page fullWidth>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item active">Theme</li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-4" key={1}>
          <Heading>Theme Name</Heading>
          <div className="small-ratings">
            <i className="fa fa-star rating-color"></i>
            <i className="fa fa-star rating-color"></i>
            <i className="fa fa-str rating-color"></i>
            <i className="fa fa-star"></i> 
            <i className="fa fa-star"></i>
            <span> 14 reviews | Number of users: 5</span>
          </div>
        </div>
        <div className="col-8 text-right">
          <Button onClick={applyClickHandler} {...(loader ? { loading: 'loading' } : { primary: 'primary' })} primary>Apply Theme</Button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <Layout>
            <Layout.Section oneThird>
              <Card title="Overview" sectioned>
                <Label><span className="label">1.0</span></Label>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel felis eu massa placerat tempus. Cras lacus leo, varius ut semper at, maximus quis ipsum. Vestibulum pretium erat sit amet risus mollis finibus. In at faucibus metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla lobortis dictum nunc quis ultricies. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam sit amet maximus nunc, nec porta enim. Phasellus dictum, velit non tempus pellentesque, ipsum purus aliquam massa, pellentesque commodo turpis eros quis dui. Sed sollicitudin est est, vitae elementum sapien sodales sed.
                </p>
              </Card>
            </Layout.Section>
            <Layout.Section>
              <Card title="Customize Settings" sectioned>
                <div className="row">
                  <div className="col-4">
                    <FormLayout>
                      <Label key={1}><span className="label">Change Effect</span></Label>
                      <Select key={2} options={options} onChange={handleEffectChange} value={effect} />
                      <Label key={3}><span className="label">Change Color</span></Label>
                      <ColorPicker key={4} onChange={setColor} color={color} />
                      <Label><span className="label">Change Font</span></Label>
                      <Select key={6} options={[
                        { label: 'Times New Roman', value: 'Times New Roman' },
                        { label: 'Arial', value: 'Arial' },
                        { label: 'Comic Sans MS', value: 'Comic Sans MS' },
                      ]} onChange={handleFontChange} value={font}/>
                    </FormLayout>
                  </div>
                  <div className="col-4 offset-1">
                    <FormLayout>
                      <Label><span className="label">Change Speed</span></Label>
                      <RangeSlider
                        value={speedRangeValue}
                        onChange={handleRangeSpeedSliderChange}
                        output
                      />
                      <Label><span className="label">Change Frequency</span></Label>
                      <RangeSlider
                        value={frequencyRangeValue}
                        onChange={handleRangeFrequencyChange}
                        output
                      />
                    </FormLayout>
                  </div>
                </div>

              </Card>
            </Layout.Section>
            <Layout.Section oneHalf>
              <Card title="Reviews" sectioned>
                <div className='row'>
                  <div className='col-12 text-right'>
                    <button className='btn btn-primary size-16'>Write a review</button>
                  </div>
                  <div className='col-12'>
                    <div className='row mt-5'>
                      <div className='col-md-4'>
                        <img src='/img/placeholder.png' className='img-responsive' height={250} width={250} />
                        <div><label>Name:</label> Umer</div>
                        <div><label>Date:</label> 02 December 2021</div>
                        <div className="small-ratings">
                          <i className="fa fa-star rating-color"></i>
                          <i className="fa fa-star rating-color"></i>
                          <i className="fa fa-star rating-color"></i>
                          <i className="fa fa-star rating-color"></i> 
                          <i className="fa fa-star"></i>
                        </div>
                        <div><p>
                          Some description about the theme
                          </p></div>
                      </div>
                      <div className='col-md-4'>
                        <img src='/img/placeholder.png' className='img-responsive' height={250} width={250} />
                        <div><label>Name:</label> Sohail</div>
                        <div><label>Date:</label> 03 December 2021</div>
                        <div className="small-ratings">
                          <i className="fa fa-star rating-color"></i>
                          <i className="fa fa-star rating-color"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i> 
                          <i className="fa fa-star"></i>
                        </div>
                        <div><p>
                          Some description about the theme
                          </p></div>
                      </div>
                      <div className='col-md-4'>
                        <img src='/img/placeholder.png' className='img-responsive' height={250} width={250} />
                        <div><label>Name:</label> Ali</div>
                        <div><label>Date:</label> 04 December 2021</div>
                        <div className="small-ratings">
                          <i className="fa fa-star rating-color"></i>
                          <i className="fa fa-star rating-color"></i>
                          <i className="fa fa-star rating-color"></i>
                          <i className="fa fa-star rating-color"></i> 
                          <i className="fa fa-star rating-color"></i>
                        </div>
                        <div><p>
                          Some description about the theme
                          </p></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Layout.Section>
          </Layout>
        </div>
      </div>
      <Frame>{toastMarkup}</Frame>
    </Page>
    
  </AppProvider >
}

export default DetailComponent;