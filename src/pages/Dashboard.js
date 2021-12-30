import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DisplayText, AppProvider, Button, Card, Form, FormLayout, Frame, Heading, Label, Layout, Page, Select, TextField, Toast, Icon } from "@shopify/polaris";
import { SearchMinor } from '@shopify/polaris-icons';
import ShopContext from '@app/contexts/ShopContext';
import { PageLoading } from '@app/components/index';
import APISettings from '@app/extras/APISettings';


const Dashboard = () => {

  const { shop } = useContext(ShopContext);
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getThemes = async () => {
      setLoading(true);
      const themesData = await fetch(`${APISettings.api_url}/api/getThemes?shop=${shop}`);
      const response = await themesData.json();
      setThemes(response.data);
      setLoading(false);
    }
    getThemes();
  }, []);

  return loading ? <PageLoading /> : <AppProvider>
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
              {themes.map((item) => (
                <div className='col-md-4'>
                  <Link to={`/themedetails/${item.id}`}>
                    <img className='img-responsive' src={item.theme_image} width={290} height={270} />
                  </Link>
                  <div className="thumbTitle"><span>{item.theme_name}</span></div>
                  <div className="small-ratings">
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star rating-color"></i>
                    <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                  </div>
                  <span>14 reviews</span>
                </div>
              ))}
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