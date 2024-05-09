// seedResults.js
import { db } from "./firebase-config-seed.js";
import { doc, setDoc } from "firebase/firestore";

// Define some constants for the fake data
const COUNTRIES = ["Lebanon", "USA", "France", "KSA"];
const GENDERS = ["F", "M"];
const NUM_USERS = 30;

async function addFakeUsersAndResults() {
  for (let i = 11; i <= NUM_USERS; i++) {
    const fakeUserId = `fakeUser${i}`;
    const fakeDisplayName = fakeUserId;
    const fakeAge = getRandomNumber(15, 80);
    const fakeCountry = getRandomArrayElement(COUNTRIES);
    const fakeGender = getRandomArrayElement(GENDERS);

    // Add to users collections
    const userData = {
      Displayname: fakeDisplayName,
      age: fakeAge,
      Country: fakeCountry,
      gender: fakeGender
    };

    await setDoc(doc(db, "users", fakeUserId), userData);
    console.log(`Added user ${fakeUserId}:`, userData);

    // Generate random scores for the tests
    const tests = ["OcdQuiz", "DepressionQuiz", "AnxietyQuiz", "AdhdQuiz"];
    const scores = {};
    tests.forEach(test => {
      scores[test] = getRandomNumber(1, 50);
    });

    // Add to Results collection
    await setDoc(doc(db, "Results", fakeUserId), scores);
    console.log(`Added data for ${fakeUserId} in Results:`, scores);
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Call the function
addFakeUsersAndResults();
