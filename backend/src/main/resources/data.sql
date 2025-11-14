-- Sample data for BloodLinkAI

-- Insert sample donors
INSERT INTO donors (name, blood_group, location, last_donation_date, streak, phone, email) VALUES
('John Smith', 'O+', 'New York, NY', '2024-01-15', 3, '+1-555-0101', 'john.smith@email.com'),
('Sarah Johnson', 'A+', 'Los Angeles, CA', '2024-02-20', 2, '+1-555-0102', 'sarah.j@email.com'),
('Michael Brown', 'B+', 'Chicago, IL', '2024-01-10', 5, '+1-555-0103', 'michael.brown@email.com'),
('Emily Davis', 'AB+', 'Houston, TX', '2024-03-01', 1, '+1-555-0104', 'emily.davis@email.com'),
('David Wilson', 'O-', 'Phoenix, AZ', '2024-02-05', 4, '+1-555-0105', 'david.wilson@email.com'),
('Jessica Miller', 'A-', 'Philadelphia, PA', '2024-01-25', 2, '+1-555-0106', 'jessica.m@email.com'),
('Christopher Taylor', 'B-', 'San Antonio, TX', '2024-02-15', 3, '+1-555-0107', 'chris.taylor@email.com'),
('Amanda Anderson', 'AB-', 'San Diego, CA', '2024-01-30', 1, '+1-555-0108', 'amanda.a@email.com'),
('Matthew Thomas', 'O+', 'Dallas, TX', '2024-02-10', 2, '+1-555-0109', 'matthew.thomas@email.com'),
('Jennifer Garcia', 'A+', 'San Jose, CA', '2024-01-20', 4, '+1-555-0110', 'jennifer.garcia@email.com'),
('James Rodriguez', 'B+', 'Austin, TX', '2024-02-25', 1, '+1-555-0111', 'james.rodriguez@email.com'),
('Lisa Martinez', 'O-', 'Jacksonville, FL', '2024-01-05', 6, '+1-555-0112', 'lisa.martinez@email.com'),
('Robert Lee', 'A-', 'San Francisco, CA', '2024-03-05', 2, '+1-555-0113', 'robert.lee@email.com'),
('Mary White', 'AB+', 'Columbus, OH', '2024-01-12', 3, '+1-555-0114', 'mary.white@email.com'),
('William Harris', 'B-', 'Fort Worth, TX', '2024-02-08', 1, '+1-555-0115', 'william.harris@email.com');

-- Insert sample patients
INSERT INTO patients (name, blood_group, location, units_needed, urgency_level, hospital, contact_phone) VALUES
('Alice Cooper', 'O+', 'New York, NY', 2, 'HIGH', 'NYC General Hospital', '+1-555-0201'),
('Bob Martin', 'A-', 'Los Angeles, CA', 1, 'MEDIUM', 'LA Medical Center', '+1-555-0202'),
('Carol Peterson', 'B+', 'Chicago, IL', 3, 'CRITICAL', 'Chicago Medical', '+1-555-0203'),
('Daniel Clark', 'AB-', 'Houston, TX', 1, 'LOW', 'Houston General', '+1-555-0204'),
('Eva Adams', 'O-', 'Phoenix, AZ', 2, 'HIGH', 'Phoenix Healthcare', '+1-555-0205'),
('Frank Baker', 'A+', 'Philadelphia, PA', 1, 'MEDIUM', 'Philly Medical', '+1-555-0206'),
('Grace Turner', 'B-', 'San Antonio, TX', 2, 'HIGH', 'San Antonio Hospital', '+1-555-0207'),
('Henry Parker', 'AB+', 'San Diego, CA', 1, 'LOW', 'SD Medical Center', '+1-555-0208');

-- Insert sample requests
INSERT INTO requests (patient_id, blood_group, units, location, status, priority_score) VALUES
(1, 'O+', 2, 'New York, NY', 'PENDING', 0.8500),
(2, 'A-', 1, 'Los Angeles, CA', 'PENDING', 0.7200),
(3, 'B+', 3, 'Chicago, IL', 'PENDING', 0.9500),
(4, 'AB-', 1, 'Houston, TX', 'PENDING', 0.6500),
(5, 'O-', 2, 'Phoenix, AZ', 'FULFILLED', 0.8800),
(6, 'A+', 1, 'Philadelphia, PA', 'PENDING', 0.7000),
(7, 'B-', 2, 'San Antonio, TX', 'PENDING', 0.8200),
(8, 'AB+', 1, 'San Diego, CA', 'PENDING', 0.6800);