BEGIN;

INSERT INTO blogful_articles
    (title, date_published, content)

VALUES
    ('My Blog', now() - '26 days'::INTERVAL, 'This is my amazing blog'),
    ('My Blog 2', now() - '22 days'::INTERVAL, 'This is my next blog'),
    ('Cat Blog', now() - '20 days'::INTERVAL, 'All about cats'),
    ('Dog Blog', now() - '20 days'::INTERVAL, 'All about dogs'),
    ('Tech Blog', now() - '19 days'::INTERVAL, 'All about new tech'),
    ('Football Blog', now() - '13 days'::INTERVAL, 'All about football'),
    ('The Newest Blog', now() - '12 days'::INTERVAL, 'This blog is new'),
    ('Blog', now() - '12 days'::INTERVAL, 'Just an ordinary blog'),
    ('School', now() - '12 days'::INTERVAL, 'Blog about school'),
    ('Baseball Blog',  now() - '5 days'::INTERVAL,  'All about baseball'),