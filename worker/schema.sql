-- Bookings table in D1 database detailing-bookings-remoticojobs.
-- Uses IF NOT EXISTS so it's safe to run again for a
-- new site — do NOT drop or redefine this table per-site.
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  service TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  vehicle TEXT,
  address TEXT NOT NULL,
  notes TEXT,
  source TEXT NOT NULL,
  created_at TEXT NOT NULL,
  status TEXT DEFAULT 'Confirmed',
  reschedule_date TEXT,
  reschedule_time TEXT,
  notes2 TEXT,
  original_date TEXT,
  original_time TEXT,
  payment_status TEXT DEFAULT 'Pay Later',
  subtotal INTEGER,
  coupon TEXT,
  total INTEGER,
  payment_intent_id TEXT
);

CREATE INDEX IF NOT EXISTS idx_bookings_source_date ON bookings (source, date);
