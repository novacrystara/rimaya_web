export type Testimonial = {
  /** Reviewer's display name — also supplies the initials for the avatar tile. */
  name: string;
  /** The review body, verbatim. */
  quote: string;
  /** Review headline. Omitted where Trustpilot auto-generated a truncated one. */
  title?: string;
  /** ISO `YYYY-MM-DD`. Rendered as "Reviewed 3 March 2025"; hidden when absent. */
  date?: string;
  /** 1–5. Defaults to 5 when omitted. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Reviewer's country, spelled out. */
  country?: string;
  /** How many reviews they've written on Trustpilot — Trustpilot shows this too. */
  reviewCount?: number;
  /** Path in `public/images/reviews/`. Falls back to the initials tile. */
  avatar?: string;
  /** Set on genuine Trustpilot reviews — adds the Trustpilot attribution line. */
  source?: "trustpilot";
};

/**
 * The real Trustpilot reviews for rimaya.co.uk, imported from
 * `docs/rimaya_trustpilot_reviews.csv` (12 reviews, all 5★).
 *
 * Three deliberate transformations from the raw CSV, none of which change what
 * a reviewer actually said:
 *
 * 1. **Titles ending in "…" are dropped.** Trustpilot auto-generates a headline
 *    by truncating the first line of the review when the author didn't write
 *    one. Those fragments ("me to…", "Very nice services…") read as broken
 *    headings above the very text they were cut from. Author-written titles
 *    ("Happy Client", "Excellent F&A Outsourcing") are kept as-is.
 * 2. **Names are title-cased** for display consistency. Trustpilot renders
 *    whatever casing the account used, so the CSV carries "kapil kathiriya"
 *    and "sunil kumar veeravalli" verbatim.
 * 3. **Avatars.** Only three reviewers have real photographs. The other two
 *    "profile image" URLs in the CSV are Trustpilot's own generated initial
 *    tiles, so they're treated as no-photo and get the brand initials tile —
 *    the site's version of the same idea.
 *
 * `date` is Date Published (what Trustpilot shows on the review card), not
 * Date of Experience.
 *
 * ⚠️ This is a snapshot. New reviews do NOT appear here on their own — either
 * add them by hand or switch on the live TrustBox (set `businessUnitId` +
 * `templateId` in lib/site.ts and this section swaps automatically).
 *
 * One shared list drives the homepage carousel and the About page.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Shradha Harlalka",
    title: "Happy Client",
    quote:
      "Rimaya team was of great support to my recruitment process as they always kept me posted and assisted me with my interview process and smooth joining arrangements. I'm grateful for the services provided by Rimaya.",
    date: "2024-05-25",
    rating: 5,
    country: "United Kingdom",
    reviewCount: 1,
    avatar: "/images/reviews/shradha.webp",
    source: "trustpilot",
  },
  {
    name: "Mitali Agrawal",
    quote:
      "Rimaya Recruiting went beyond to assist me throughout the entire job search process. They took the time to understand my skills, experiences, and career goals, and then worked to find opportunities that aligned with what I was looking for. Their guidance and advice were invaluable, providing me with valuable insights and information about potential employers and job roles. They were always available to answer any questions I had, provide updates on my job applications, and offer support and encouragement every step of the way. Their professionalism and expertise instilled confidence in me throughout the process, and I am grateful for their unwavering support. Thank you, Rimaya, for your assistance and for helping me secure the best job possible.",
    date: "2024-03-05",
    rating: 5,
    country: "United Kingdom",
    reviewCount: 1,
    source: "trustpilot",
  },
  {
    name: "Hirok",
    quote:
      "RIMAYA Consultancy exemplifies excellence in every aspect. Their unparalleled dedication to client satisfaction is evident from the moment you engage with their services. The team's professionalism and expertise are truly commendable, ensuring a seamless experience throughout. From insightful consultations to tailored solutions, RIMAYA goes above and beyond to meet individual needs effectively. Their commitment to quality and attention to detail are unmatched, fostering trust and confidence in their capabilities. With RIMAYA Consultancy, you can expect not just a service, but a partnership dedicated to your success. I highly recommend RIMAYA for anyone seeking exceptional services.",
    date: "2024-03-04",
    rating: 5,
    country: "United Kingdom",
    reviewCount: 36,
    source: "trustpilot",
  },
  {
    name: "Ravi Bosamya",
    title: "Excellent F&A Outsourcing",
    quote:
      "Rimaya Ltd exceeded my expectations as a recent graduate looking for an accounting role. They took the time to understand my skills and interests, and guided me through the recruitment process with quick responses and valuable advice. Promptly, they had matched me with a position that was a perfect fit. As a growing company, Rimaya Ltd has proven their ability to keep pace with employer needs and rapidly match talented candidates like myself with the right opportunities. I would highly recommend their services.",
    date: "2024-03-02",
    rating: 5,
    country: "United Kingdom",
    reviewCount: 1,
    avatar: "/images/reviews/ravi-bosamya.webp",
    source: "trustpilot",
  },
  {
    name: "Kapil Kathiriya",
    title: "Best work placement experience",
    quote:
      "Great team, quick response, good service. I had a wonderful experience with Rimaya Ltd. They are really supportive and always ready to help you with your questions via email as well as WhatsApp. Highly recommended.",
    date: "2023-12-10",
    rating: 5,
    country: "India",
    reviewCount: 4,
    source: "trustpilot",
  },
  {
    name: "Sejal Singal",
    title: "Superb consultancy service!",
    quote:
      "I used their job consultancy service. I found their onboarding to be quick and easy compared to other recruitment agencies out there. They provided me with a mock interview practice whose feedback proved to be very useful for real interview to secure me the job. Would highly recommend their service!!",
    date: "2023-11-27",
    rating: 5,
    country: "United Kingdom",
    reviewCount: 1,
    source: "trustpilot",
  },
  {
    name: "Jaydeep Bansal",
    quote:
      "Continuous feedback really helped me to improve my skills for the organization. Providing right training and guidance ensured that I get the right job as per my skills and qualifications. It helps in overall improvement both for clients and its employees.",
    date: "2023-11-26",
    rating: 5,
    country: "United Kingdom",
    reviewCount: 1,
    avatar: "/images/reviews/jaydeep.webp",
    source: "trustpilot",
  },
  {
    name: "Sunil Kumar Veeravalli",
    quote:
      "I recently used a job consultancy service, and I must say that my experience was quite positive. The consultants were highly professional and knowledgeable about the job market. They took the time to understand my skills and career goals, which helped them match me with relevant job opportunities. The communication throughout the process was excellent, and they kept me updated on potential job openings. One thing that stood out was their dedication to finding the right fit for me, rather than just pushing any available job. They provided valuable advice on improving my resume and interview skills, which ultimately helped me secure a job that aligns perfectly with my career aspirations. Overall, I would highly recommend this job consultancy to anyone seeking employment assistance. Their expertise, personalized approach, and commitment to client success make them a valuable resource in the job search process.",
    date: "2023-09-28",
    rating: 5,
    country: "United Kingdom",
    reviewCount: 1,
    source: "trustpilot",
  },
  {
    name: "Narsinh Ramtirthe",
    quote:
      "Very nice services provided from Rimaya. I like the treatment in Rimaya.",
    date: "2023-08-23",
    rating: 5,
    country: "India",
    reviewCount: 1,
    source: "trustpilot",
  },
  {
    name: "Harish",
    title: "Best recruitment consultants ever",
    quote:
      "I've had the best experience working with Mrs and Mr Kalra. She's super efficient and fast in responding to all enquiries from email to WhatsApp. They are honest, reliable, organised and delivers the best recruitment service I've ever experienced. I feel genuinely cared for and confident in Rimaya's Services as they are trustworthy and very professional. I definitely hold Mrs and Mr Kalra in high regard as their extensive knowledge, experience and patience in me changed my perspective and experience with the recruitment process.",
    date: "2023-08-20",
    rating: 5,
    country: "United Kingdom",
    reviewCount: 1,
    source: "trustpilot",
  },
  {
    name: "Joseph Doyl",
    title: "Excellent",
    quote:
      "Rimaya provided a very good service, before, during, and after my placement. The team was very responsive to my queries and supportive all the way long.",
    date: "2023-08-20",
    rating: 5,
    country: "United Kingdom",
    reviewCount: 9,
    source: "trustpilot",
  },
  {
    name: "Sagar Uprety",
    quote:
      "It's very good hiring and onboarding process for me. Mansi is thorough professional and assist me from all the process for interview to onboarding.",
    date: "2023-08-16",
    rating: 5,
    country: "United Kingdom",
    reviewCount: 2,
    source: "trustpilot",
  },
];
