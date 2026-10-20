-- Mock projects for local development. Images point at real Cloudinary
-- uploads, since next.config.ts only allows that host.

INSERT INTO projects (title, subtitle, description, slug, lessons_learned, created_at, live_url, repo)
VALUES
    ('Sample Dashboard', 'Local seed data', 'A project with a live site, a repo, a cover and an extra image.', 'sample-dashboard', 'Lessons learned show up behind a button on the card.', '2025-03-01', 'https://example.com', 'https://github.com/bjorntirsen/portfolio'),
    ('Sample API', 'Local seed data', 'A project with only a repo link.', 'sample-api', NULL, '2024-06-15', NULL, 'https://github.com/bjorntirsen/portfolio'),
    ('Sample Landing Page', 'Local seed data', 'A project with only a live site.', 'sample-landing-page', 'Short lessons.', '2023-09-10', 'https://example.com', NULL),
    ('Sample Without Images', 'Local seed data', 'A project with no cover image.', 'sample-without-images', NULL, '2022-01-20', NULL, NULL);

INSERT INTO images (project_id, image_url, alt, type)
SELECT projects.id, v.image_url, v.alt, v.type
FROM (
    VALUES
        ('sample-dashboard', 'https://res.cloudinary.com/bjorntirsen/image/upload/v1750593803/portfolio_zcp6ph.jpg', 'Sample Dashboard cover', 'cover'),
        ('sample-dashboard', 'https://res.cloudinary.com/bjorntirsen/image/upload/v1668284550/bjorns-portfolio-images/project-61a9c383dd5bef0016321950-1668284548598.jpg', NULL, 'regular'),
        ('sample-api', 'https://res.cloudinary.com/bjorntirsen/image/upload/v1638515607/bjorns-portfolio/project-61a9c383dd5bef0016321950-1638515605285.jpg', NULL, 'cover'),
        ('sample-landing-page', 'https://res.cloudinary.com/bjorntirsen/image/upload/v1635852059/bjorns-portfolio/project-61811f0220a18900165d63e9-1635852056050.jpg', NULL, 'cover')
) AS v (slug, image_url, alt, type)
JOIN projects USING (slug);
