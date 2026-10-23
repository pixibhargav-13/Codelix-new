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

/* name is the client as written on its logo — used for the image's alt text.
   width/height are each file's pixel size, so the strip reserves the right
   space before the logos load (ClientStrip.css sets the rendered height). */
export const CLIENT_LOGOS = [
  { src: client1, name: "Delight Auto Forge", width: 453, height: 84 },
  { src: client2, name: "Parmeshwari Brass Industries", width: 471, height: 84 },
  { src: client3, name: "Everson", width: 638, height: 113 },
  { src: client4, name: "Aimerz Advisors", width: 535, height: 113 },
  { src: client5, name: "Wild Crunch", width: 134, height: 84 },
  { src: client6, name: "Royale Touché", width: 672, height: 84 },
  { src: client7, name: "The Library of Alexandria", width: 164, height: 84 },
  { src: client8, name: "Rooted by ASD", width: 221, height: 84 },
  { src: client9, name: "Amara", width: 448, height: 112 },
  { src: client10, name: "PackPro Flexipack", width: 252, height: 84 },
  { src: client11, name: "AanganOne", width: 470, height: 84 },
  { src: client12, name: "Natraj Fashions", width: 118, height: 84 },
  { src: client13, name: "Cavier", width: 364, height: 84 },
];
