import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DisplayText, AppProvider, Button, Card, Form, FormLayout, Frame, Heading, Label, Layout, Page, Select, TextField, Toast, Icon } from "@shopify/polaris";
import { SearchMinor } from '@shopify/polaris-icons';


const Dashboard = () => {

  return <AppProvider>
      <Page fullWidth>
        <Layout>
          <Layout.Section>
            <Card title="" sectioned>
              <div className='row mt-2'>
                <div className='col-md-4'>
                  <TextField
                    prefix={<Icon source={SearchMinor} />}
                  />
                </div>
                <div className='col-md-8'>
                  <div className='text-right'><Button primary>View All</Button></div>
                </div>
              </div>
              <div className='row mt-5 text-center'>
                <div className='col-md-4'>
                  <Link to="/themedetails/1">
                    <img className='img-responsive' src="/img/christmas.jpg" width={290} height={270} />
                  </Link>
                  <div className="thumbTitle"><span>Christmas</span></div>
                  <div className="small-ratings">
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                  </div>
                  <span>14 reviews</span>
                </div>
                <div className='col-md-4'>
                  <Link to="/themedetails/2">
                    <img className='img-responsive' src="/img/eid.jpg" width={290} height={270} />
                  </Link>
                  <div className="thumbTitle"><span>Eid</span></div>
                  <div className="small-ratings">
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                  </div>
                  <span>14 reviews</span>
                </div>
                <div className='col-md-4'>
                  <Link to="/themedetails/3">
                    <img className='img-responsive' src="/img/haloween.jpg" width={290} height={270} />
                  </Link>
                  <div className="thumbTitle"><span>Haloween</span></div>
                  <div className="small-ratings">
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                  </div>
                  <span>14 reviews</span>
                </div>
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center mt-5">
                  <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
              </nav>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
}

export default Dashboard;