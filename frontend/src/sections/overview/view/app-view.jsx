import axios from 'axios';
import { faker } from '@faker-js/faker';
import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Card, Button, CardActions, CardContent } from '@mui/material';

import AppTasks from '../app-tasks';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppConversionRates from '../app-conversion-rates';

export default function AppView() {
  const [displayedInternships, setDisplayedInternships] = useState([]);
  const [loadCount, setLoadCount] = useState(5);

  useEffect(() => {
    const fetchInternships = () => {
      axios.get('https://profiloverse.onrender.com/api/internships')
        .then(response => {
          setDisplayedInternships(prevDisplayed => [...prevDisplayed, ...response.data.slice(0, loadCount)]);
        })
        .catch(error => console.error('Error fetching internships:', error));
    };

    fetchInternships();
    const intervalId = setInterval(fetchInternships, 3000); 

    return () => clearInterval(intervalId);  
  }, [loadCount]);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      setLoadCount(prevCount => prevCount + 5); 
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋 
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Companies Hiring"
            total={42000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_companies.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Active Job Seekers"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Opportunities Posted"
            total={700000}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_opportunities.png" />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Students Employed"
            total={488000}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_employed.png" />}
          />
        </Grid>

      <Grid container spacing={3} onScroll={handleScroll} style={{ overflow: 'auto', height: '400px' }}>
        {displayedInternships.map((internship, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card raised sx={{ minHeight: 180, m: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {internship.Role}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {internship.Company} - {internship.Location}
                </Typography>
                <Typography variant="body2">
                  Start Date: {internship['Start Date']}
                </Typography>
                <Typography variant="body2">
                  Duration: {internship.Duration}
                </Typography>
                <Typography variant="body2">
                  Stipend: {internship.Stipend}
                </Typography>
                <Typography variant="body2">
                  Posted on: {internship.Posted}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Add Job</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Employee Hiring Rate"
            subheader="(+33%) than last year"
            chart={{
              series: [
                { label: 'Apple', value: 400 },
                { label: 'Meta', value: 460 },
                { label: 'Scaler', value: 548 },
                { label: 'Adobe', value: 690 },
                { label: 'Amazon', value: 810 },
                { label: 'Google', value: 900 },
                { label: 'Microsoft', value: 950 },
                { label: 'Amazon', value: 1100 },
                { label: 'Deloitte', value: 1200 },
                { label: 'TCS', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Internship Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                'Applied at Microsoft for Software Developer Position',
                'Resume has been noticed',
                'Resume in review',
                'Interview to be scheduled',
                'Confirmation Pending',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppCurrentVisits
            title="Skills in demand"
            chart={{
              series: [
                { label: 'Project Management', value: 4044 },
                { label: 'Generative AI', value: 5435 },
                { label: 'Machine Learning', value: 3443 },
                { label: 'Communication', value: 4643 },
                { label: 'Cybersecurity', value: 2857 },
                { label: 'Sustainability', value: 1832 },
                // { label: 'Computing', value: 1409 },
              ],
            }}
          />
        </Grid>


        <Grid xs={12} md={6} lg={4}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Assignment due for YardStick.' },
              { id: '2', name: 'Assignment due for APLTech.' },
              { id: '3', name: 'Complete your application for SteelEye.' },
              { id: '4', name: 'Complete your application for SteelEye.' },
              { id: '5', name: 'Complete your application for SteelEye.' },
              { id: '6', name: 'Complete your application for SteelEye.' },
              { id: '7', name: 'Complete your application for SteelEye.' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}