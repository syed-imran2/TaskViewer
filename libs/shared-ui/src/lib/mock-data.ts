export const USERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-202-555-0191',
    gender: 'Male',
    dateOfBirth: '1990-04-12',
    address: {
      street: '123 Maple Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zip: '10001',
    },
  },
  {
    id: 2,
    name: 'Jane Martin',
    email: 'jane@example.com',
    phone: '+1-303-555-0142',
    gender: 'Female',
    dateOfBirth: '1993-08-25',
    address: {
      street: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      zip: '90001',
    },
  },
  {
    id: 3,
    name: 'Carlos Rivera',
    email: 'carlos@example.com',
    phone: '+1-512-555-0178',
    gender: 'Male',
    dateOfBirth: '1988-01-30',
    address: {
      street: '789 Pine Road',
      city: 'Austin',
      state: 'TX',
      country: 'USA',
      zip: '73301',
    },
  },
  {
    id: 4,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91-98765-43210',
    gender: 'Female',
    dateOfBirth: '1995-11-14',
    address: {
      street: '12 MG Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
      zip: '560001',
    },
  },
  {
    id: 5,
    name: "Liam O'Brien",
    email: 'liam@example.com',
    phone: '+353-87-555-0163',
    gender: 'Male',
    dateOfBirth: '1991-06-03',
    address: {
      street: '8 Grafton Street',
      city: 'Dublin',
      state: 'Leinster',
      country: 'Ireland',
      zip: 'D02 Y754',
    },
  },
  {
    id: 6,
    name: 'Amara Okafor',
    email: 'amara@example.com',
    phone: '+234-812-555-0137',
    gender: 'Female',
    dateOfBirth: '1997-03-19',
    address: {
      street: '45 Victoria Island',
      city: 'Lagos',
      state: 'Lagos',
      country: 'Nigeria',
      zip: '101001',
    },
  },
  {
    id: 7,
    name: 'Noah Fischer',
    email: 'noah@example.com',
    phone: '+49-30-555-0155',
    gender: 'Male',
    dateOfBirth: '1986-09-07',
    address: {
      street: '22 Unter den Linden',
      city: 'Berlin',
      state: 'Berlin',
      country: 'Germany',
      zip: '10117',
    },
  },
  {
    id: 8,
    name: 'Sofia Rossi',
    email: 'sofia@example.com',
    phone: '+39-06-555-0129',
    gender: 'Female',
    dateOfBirth: '1994-12-22',
    address: {
      street: '3 Via Condotti',
      city: 'Rome',
      state: 'Lazio',
      country: 'Italy',
      zip: '00187',
    },
  },
  {
    id: 9,
    name: 'Ethan Park',
    email: 'ethan@example.com',
    phone: '+82-2-555-0184',
    gender: 'Male',
    dateOfBirth: '1992-07-16',
    address: {
      street: '10 Gangnam-daero',
      city: 'Seoul',
      state: 'Seoul',
      country: 'South Korea',
      zip: '06000',
    },
  },
  {
    id: 10,
    name: 'Isabelle Dupont',
    email: 'isabelle@example.com',
    phone: '+33-1-555-0116',
    gender: 'Female',
    dateOfBirth: '1989-05-09',
    address: {
      street: '17 Rue de Rivoli',
      city: 'Paris',
      state: 'Île-de-France',
      country: 'France',
      zip: '75001',
    },
  },
];

export type Priority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
  priority: Priority;
}

export const TASKS: Task[] = [
  { id: 1,  userId: 1,  title: 'Set up CI/CD pipeline',          description: 'Configure GitHub Actions for automated testing and deployment.',       priority: 'High'   },
  { id: 2,  userId: 2,  title: 'Design onboarding flow',         description: 'Create wireframes and prototypes for the new user onboarding screens.', priority: 'High'   },
  { id: 3,  userId: 3,  title: 'Migrate database to PostgreSQL', description: 'Move existing MySQL tables to PostgreSQL and validate data integrity.', priority: 'High'   },
  { id: 4,  userId: 4,  title: 'Conduct user interviews',        description: 'Schedule and run 5 user interviews to gather product feedback.',        priority: 'Medium' },
  { id: 5,  userId: 5,  title: 'Fix payment gateway bug',        description: 'Resolve the intermittent 402 error occurring on Stripe checkout.',      priority: 'High'   },
  { id: 6,  userId: 6,  title: 'Write API documentation',        description: 'Document all REST endpoints using OpenAPI 3.0 spec.',                   priority: 'Medium' },
  { id: 7,  userId: 7,  title: 'Set up monitoring dashboard',    description: 'Integrate Grafana with Prometheus for real-time server metrics.',        priority: 'High'   },
  { id: 8,  userId: 8,  title: 'Localise app to Italian',        description: 'Translate all UI strings and validate formatting for Italian locale.',   priority: 'Medium' },
  { id: 9,  userId: 9,  title: 'Implement dark mode',            description: 'Add system-aware dark mode support using CSS variables and context.',    priority: 'Medium' },
  { id: 10, userId: 10, title: 'Prepare Q2 roadmap',             description: 'Outline feature priorities and milestones for the next quarter.',        priority: 'High'   },
];