import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './model/User.js';
import Opportunity from './model/Opportunity.js';
import connectDB from './database/database.js';

connectDB();

const hashPassword = (password) => bcrypt.hashSync(password, 10); // Hash with saltRounds = 10

const seed = async () => {
  await User.deleteMany();
  await Opportunity.deleteMany();

  // Admin
  const admin = await User.create({
    name: 'John Doe',
    email: 'admin@arcevents.com',
    password: hashPassword('admin123'),
    role: 'admin',
  });

  // Organizers (10 total)
  const organizers = await User.insertMany([
    { name: 'Alice Johnson', email: 'alice.johnson@arcevents.com', password: hashPassword('12345678'), role: 'organizer' },
    { name: 'Bob Smith', email: 'bob.smith@arcevents.com', password: hashPassword('12345678'), role: 'organizer' },
    { name: 'Charlie Brown', email: 'charlie.brown@arcevents.com', password: hashPassword('12345678'), role: 'organizer' },
    { name: 'Diana Prince', email: 'diana.prince@arcevents.com', password: hashPassword('12345678'), role: 'organizer' },
    { name: 'Edward Blake', email: 'edward.blake@arcevents.com', password: hashPassword('12345678'), role: 'organizer' },
    { name: 'Freya Lewis', email: 'freya.lewis@arcevents.com', password: hashPassword('12345678'), role: 'organizer' },
    { name: 'Gabriel Stone', email: 'gabriel.stone@arcevents.com', password: hashPassword('12345678'), role: 'organizer' },
    { name: 'Helena Ward', email: 'helena.ward@arcevents.com', password: hashPassword('12345678'), role: 'organizer' },
    { name: 'Isaac Moore', email: 'isaac.moore@arcevents.com', password: hashPassword('12345678'), role: 'organizer' },
    { name: 'Judy Rivers', email: 'judy.rivers@arcevents.com', password: hashPassword('12345678'), role: 'organizer' },
  ]);

  // Players (17 total)
  await User.insertMany([
    { name: 'Ethan Hunt', email: 'ethan.hunt@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Fiona Gallagher', email: 'fiona.gallagher@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'George Miller', email: 'george.miller@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Hannah Davis', email: 'hannah.davis@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Ivan Pavlov', email: 'ivan.pavlov@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Jasmine Lee', email: 'jasmine.lee@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Kevin Brooks', email: 'kevin.brooks@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Lily Carter', email: 'lily.carter@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Marcus Wright', email: 'marcus.wright@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Nina Patel', email: 'nina.patel@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Oscar Flynn', email: 'oscar.flynn@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Paula Bennett', email: 'paula.bennett@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Quinn Walker', email: 'quinn.walker@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Ryan Grant', email: 'ryan.grant@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Sophia Adams', email: 'sophia.adams@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Thomas Beck', email: 'thomas.beck@arcevents.com', password: hashPassword('12345678'), role: 'player' },
    { name: 'Uma Nelson', email: 'uma.nelson@arcevents.com', password: hashPassword('12345678'), role: 'player' },
  ]);

  // Opportunities (keep using first few organizers for now)
  await Opportunity.insertMany([
    { title: 'Chess Championship', description: 'A thrilling chess competition for enthusiasts.', status: 'pending', createdBy: organizers[0]._id },
    { title: 'Annual Hackathon', description: 'A 24-hour coding marathon to solve real-world problems.', status: 'approved', createdBy: organizers[1]._id },
    { title: 'Global Gaming Expo', description: 'An event showcasing the latest in gaming technology and trends.', status: 'closed', createdBy: organizers[0]._id },
  ]);

  console.log('✅ Seed data created with 1 admin, 10 organizers, and 17 players');
  process.exit();
};

seed();
