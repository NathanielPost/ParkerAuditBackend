-- Create scores table
CREATE TABLE IF NOT EXISTS scores (
  id SERIAL PRIMARY KEY,
  player VARCHAR(255) NOT NULL,
  score INTEGER NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on score for faster sorting
CREATE INDEX IF NOT EXISTS idx_scores_score ON scores(score DESC);

-- Create index on date for faster date-based queries
CREATE INDEX IF NOT EXISTS idx_scores_date ON scores(date DESC);

-- Insert sample data (optional)
INSERT INTO scores (player, score, date) VALUES 
  ('Alice Johnson', 1250, '2024-01-15 10:30:00'),
  ('Bob Smith', 980, '2024-01-15 14:20:00'),
  ('Charlie Brown', 1100, '2024-01-16 09:15:00'),
  ('Diana Prince', 1350, '2024-01-16 16:45:00')
ON CONFLICT DO NOTHING;
