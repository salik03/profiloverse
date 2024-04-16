import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const JOB_TITLES = [
  'Software Engineering Intern at Tech Innovations Inc.',
  'Marketing Internship at Digital Growth Agency',
  'Graphic Design Intern at Creative Solutions Studio',
  'Data Science Intern at Analytics Plus',
  'Business Development Internship at Global Ventures Ltd.',
  'Finance Intern at Capital Investments Group',
  'Human Resources Internship at Talent Solutions Co.',
  'Product Management Intern at Product Launchpad LLC',
  'UX/UI Design Intern at DesignLab',
  'Content Writing Internship at Content Creators Inc.',
  'Social Media Marketing Intern at Social Buzz Agency',
  'Research Intern at Innovation Labs',
  'Web Development Internship at Web Solutions Firm',
  'Public Relations Intern at PR Connections',
  'Sales Internship at Sales Solutions Inc.',
  'Event Planning Intern at Event Management Group',
  'Customer Support Internship at Support Solutions Co.',
  'Digital Marketing Intern at Digital Impact Agency',
  'Accounting Internship at Finance Solutions Ltd.',
  'Software Quality Assurance Intern at QA Tech Solutions',
  'Supply Chain Internship at Supply Chain Solutions Inc.',
  'Artificial Intelligence Intern at AI Innovations Lab',
  'Environmental Sustainability Internship at Green Solutions Group',
];

export const jobs = [...Array(23)].map((_, index) => ({
  id: faker.string.uuid(),
  title: JOB_TITLES[index],
  company: faker.company.companyName(),
  location: faker.address.city(),
  duration: faker.random.arrayElement(['3 months', '6 months', '1 year']),
  startDate: faker.date.future(),
  description: faker.lorem.paragraph(),
  requirements: faker.lorem.sentences(faker.random.number({ min: 3, max: 5 })),
  skills: faker.lorem.words(faker.random.number({ min: 3, max: 7 })),
  perks: faker.lorem.sentences(faker.random.number({ min: 3, max: 5 })),
  applyLink: faker.internet.url(),
}));
