-- subscribers 테이블
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  subscribed_blog_ids TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- blogs 테이블
CREATE TABLE blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  rss_url TEXT NOT NULL UNIQUE,
  website_url TEXT,
  description TEXT,
  category VARCHAR(100),
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- articles 테이블
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id),
  title VARCHAR(500) NOT NULL,
  url TEXT NOT NULL UNIQUE,
  description TEXT,
  author VARCHAR(255),
  published_at TIMESTAMP NOT NULL,
  crawled_at TIMESTAMP DEFAULT NOW()
); 