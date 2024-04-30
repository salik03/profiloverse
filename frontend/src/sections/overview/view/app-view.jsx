import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppConversionRates from '../app-conversion-rates';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import AppTasks from '/Users/mansi/Desktop/profiloverse/frontend/src/sections/overview/app-tasks.jsx';

// ----------------------------------------------------------------------

export default function AppView() {
const [internships, setInternships] = useState([]);

  useEffect(() => {
    axios.get('https://profiloverse.onrender.com/api/internships')
      .then(response => {
        setInternships(response.data);  
      })
      .catch(error => console.error('Error fetching internships:', error));
  }, []);



  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋 
      </Typography>

      <Grid container spacing={3}>
        {internships.map((internship, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <div>
              <h3>{internship.Role}</h3>
              <p>{internship.Company} - {internship.Location}</p>
              <p>Start Date: {internship['Start Date']}</p>
              <p>Duration: {internship.Duration}</p>
              <p>Stipend: {internship.Stipend}</p>
              <p>Posted on: {internship.Posted}</p>
            </div>
          </Grid>
        ))}
      </Grid>


      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Companies Hiring"
            total={42000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_companies.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Active Job Seekers"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Opportunities Posted"
            total={700000}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_opportunities.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Students Employed"
            total={488000}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_employed.png" />}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Company Hiring Trend"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2013',
                '01/01/2014',
                '01/01/2015',
                '01/01/2016',
                '01/01/2017',
                '01/01/2018',
                '01/01/2019',
                '01/01/2020',
                '01/01/2021',
                '01/01/2022',
                '01/01/2023',
              ],
              series: [
                {
                  name: 'Google',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Apple',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Microsoft',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
                {
                  name: 'Meta',
                  type: 'line',
                  fill: 'solid',
                  data: [36, 30, 45, 30, 49, 52, 59, 51, 46, 39, 35],
                },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
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
        </Grid> */}

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

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="Recent Job Updates"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.company.name(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
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

        {/* <Grid xs={12} md={6} lg={4}>
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
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Hiring Trends"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid> */}

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Assignment due for YardStick.' },
              { id: '2', name: 'Assignment due for APLTech.' },
              { id: '3', name: 'Complete your application for SteelEye.' },
              // { id: '4', name: 'Continuously improve services based on user feedback.' },
              // { id: '5', name: 'Enhance team expertise and performance as needed.' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}