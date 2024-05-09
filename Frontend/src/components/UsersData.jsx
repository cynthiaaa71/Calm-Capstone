import { db } from './firebase-config'; 
import { collection, getDocs } from 'firebase/firestore';

export async function getUserData(userid) {
  const userDoc = await db.collection('users').doc(userid).get();
  console.log("User Data:", userDoc.data()); // Log user data
  return userDoc.exists ? userDoc.data() : null;
}

export async function getAllUsers() {
  const usersCollection = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCollection);
  const users = {};
  usersSnapshot.forEach(doc => {
    users[doc.id] = doc.data(); // Map user data with user id as key
  });
  return users;
}
export async function getAllResults() {
  const resultsCollection = collection(db, 'Results');
  const resultsSnapshot = await getDocs(resultsCollection);
  const users = await getAllUsers(); // Get all users' data
  const results = [];
  resultsSnapshot.forEach(doc => {
    const resultData = doc.data();
    const userData = users[resultData.userid]; // Get user data using the userid
    if (userData) {
      results.push({
        userid: resultData.userid,
        ...resultData,
        age: userData.age, // Enrich results with user data
        gender: userData.gender,
        country: userData.country
      });
    }
  });
  return results;
}

export function getAgeGroup(age) {
  if (age >= 15 && age <= 25) return '15-25';
  if (age >= 26 && age <= 36) return '26-36';
  if (age >= 37 && age <= 47) return '37-47';
  if (age >= 48 && age <= 58) return '48-58';
  if (age >= 60 && age <= 80) return '60-80';
  return null; // If age is outside the defined ranges
}

export function calculatePercentiles(userData, allResults) {

  // Find the specific user's results in the 'Results' collection.
  const userResults = allResults.find(result => result.userid === userData.uid);

  console.log("User Results:", userResults);
  if (!userResults) {
    console.error(`No test results found for user ${userData.displayName}`);
    return {};
  }
  
  const percentiles = {};
  const userAgeGroup = getAgeGroup(userData.age);
  const userGender = userData.gender;
  const userCountry = userData.country; // Updated to use lowercase 'country'
  const tests = ['OcdQuiz', 'DepressionQuiz', 'AnxietyQuiz', 'AdhdQuiz'];

  tests.forEach(test => {
    if (userResults[test] !== undefined) {
      // Filter results based on user's age group, gender, and country
      const ageGroupResults = allResults.filter(result => {
        const resultAgeGroup = getAgeGroup(result.age);
        return resultAgeGroup === userAgeGroup;
      });
      const countryResults = allResults.filter(result => result.country === userCountry); // Updated to use lowercase 'country'
      const genderResults = allResults.filter(result => result.gender === userGender); // Updated to use lowercase 'gender'
      console.log("AGEEE",ageGroupResults);
      console.log("Countryyyy",countryResults);
      console.log("GENDERRR",genderResults);
      percentiles[test] = {
        age: calculatePercentile(userResults[test], ageGroupResults.map(r => r[test])),
        country: calculatePercentile(userResults[test], countryResults.map(r => r[test])),
        gender: calculatePercentile(userResults[test], genderResults.map(r => r[test]))
      };
    }
  });

  console.log("Calculated Percentiles:", percentiles); // Log calculated percentiles
  return percentiles;
}

function calculatePercentile(score, scores) {
  const sortedScores = scores.filter(Boolean).sort((a, b) => a - b);

  if (sortedScores.length === 0) return 0; // Handle edge case of no scores

  const index = sortedScores.findIndex(s => s >= score);
  if (index === -1) return 100; // Score is the highest

  return (index / sortedScores.length) * 100;
}
