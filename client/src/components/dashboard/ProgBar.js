// import React from "react";
// import styles from "./Milestone.module.css"; // Assuming your SCSS has been compiled to CSS

// const Milestone = ({ progress }) => {
//   // Determine the color of each milestone based on progress
//   const getColor = (milestone) => {
//     if (progress >= milestone) {
//       switch (milestone) {
//         case 10:
//           return styles.milestone10Color;
//         case 25:
//           return styles.milestone25Color;
//         case 50:
//           return styles.milestone50Color;
//         case 80:
//           return styles.milestone80Color;
//         case 100:
//           return styles.milestone100Color;
//         default:
//           return "";
//       }
//     }
//     return "";
//   };

//   return (
//     <div className={styles.vefsMilestoneWrapper}>
//       <div className={styles.milestoneContainer}>
//         {/* ... rest of your HTML structure ... */}
//         {/* Example for one milestone */}
//         <div className={`${styles.milestones} ${styles.milestone__10}`}>
//           <div
//             className={`${styles.dot} ${
//               progress >= 10 ? styles.completed : ""
//             } ${getColor(10)}`}
//           ></div>
//         </div>
//         {/* ... repeat for other milestones ... */}
//       </div>
//     </div>
//   );
// };

// export default Milestone;
