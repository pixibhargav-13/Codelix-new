/* Shared client logos — kept in one place so the homepage and services page
   can't drift apart (same reasoning as techStack.js). */
import client1 from "../Images/homepage-client-one.png";
import client2 from "../Images/homepage-client-two.png";
import client3 from "../Images/homepage-client-three.webp";
import client4 from "../Images/homepage-client-four.webp";
import client5 from "../Images/homepage-client-five.png";
import client6 from "../Images/homepage-client-six.png";
import client7 from "../Images/homepage-client-seven.png";
import client8 from "../Images/homepage-client-eight.png";
import client9 from "../Images/homepage-client-nine.webp";
import client10 from "../Images/homepage-client-ten.png";
import client11 from "../Images/homepage-client-eleven.png";
import client12 from "../Images/homepage-client-twelve.png";
import client13 from "../Images/homepage-client-thirteen.png";
import clientAbc from "../Images/client-abc-brass.webp";
import clientVedora from "../Images/client-vedora.webp";
import clientHiTech from "../Images/client-hi-tech-construction.webp";
import clientJupiter from "../Images/client-jupiter-brass.webp";
import clientIshita from "../Images/client-ishita-industries.webp";
import clientShipping from "../Images/client-shipping.webp";

/* name is the client as written on its logo — used for the image's alt text.
   width/height are each file's pixel size, so the strip reserves the right
   space before the logos load (ClientStrip.css sets the rendered height). */
export const CLIENT_LOGOS = [
  { src: clientHiTech, name: "Hi-Tech Construction", width: 113, height: 84 },
  { src: clientIshita, name: "Ishita Industries", width: 408, height: 84 },
  { src: clientVedora, name: "Vedora", width: 282, height: 84 },
  { src: client13, name: "Cavier", width: 364, height: 84 },
  { src: clientAbc, name: "ABC Brass", width: 84, height: 84 },
  { src: clientJupiter, name: "Jupiter Brass Industries", width: 235, height: 84 },
  { src: client11, name: "AanganOne", width: 470, height: 84 },
  { src: client2, name: "Parmeshwari Brass Industries", width: 417, height: 61 },
  { src: client1, name: "Delight Auto Forge", width: 453, height: 84 },
  { src: client3, name: "Everson", width: 638, height: 113 },
  { src: client4, name: "Aimerz Advisors", width: 535, height: 113 },
  { src: client5, name: "Wild Crunch", width: 134, height: 84 },
  { src: client6, name: "Royale Touché", width: 500, height: 60 },
  { src: client7, name: "The Library of Alexandria", width: 164, height: 84 },
  { src: client8, name: "Rooted by ASD", width: 183, height: 50 },
  { src: client9, name: "Amara", width: 448, height: 112 },
  { src: client10, name: "PackPro Flexipack", width: 252, height: 84 },
  { src: client12, name: "Natraj Fashions", width: 118, height: 84 },
  { src: clientShipping, name: "Shipping and logistics client", width: 128, height: 84 },
];
