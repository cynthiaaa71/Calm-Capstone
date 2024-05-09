import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../components/firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; //bootstrap: https://mdbootstrap.com
import userpic from '../images/user1.jpg'
import { useDropzone } from "react-dropzone"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { calculatePercentiles, getAllResults, getAgeGroup } from '../components/UsersData.jsx';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [Country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState(userpic);
  const formattedAge = age ? age.toString() : '';
  const [percentiles, setPercentiles] = useState(null);
  const barChartData = {
  labels: ['ADHD', 'Anxiety', 'OCD', 'Depression'],
  datasets: [
    {
      label: 'Severity Score',
      data: [percentiles?.AdhdQuiz?.gender, percentiles?.AnxietyQuiz?.gender, percentiles?.OcdQuiz?.gender, percentiles?.DepressionQuiz?.gender],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }
  ]
};

const barChartOptions = {
  scales: {
    y: {
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: true
    }
  }
};


 useEffect(() => {
  const auth = getAuth();

  const fetchData = async (user) => {
    if (user) {
      const userId = user.uid;

      const userData = await getUserData(userId); // Retrieve user's data
      if (userData) {
        const allResults = await getAllResults(); // Retrieve all results
        const calculatedPercentiles = calculatePercentiles(userData, allResults); // Calculate percentiles
        setPercentiles(calculatedPercentiles); // Store the calculated percentiles
      }
    }
  };

  const unsubscribe = onAuthStateChanged(auth, fetchData);

  return () => unsubscribe(); // Clean up on component unmount
}, []);

  const getUserData = async (userId) => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists) {
      const userData = docSnap.data();
      console.log(userData);
      setDisplayName(userData.firstName || ''); // Assuming 'firstName' field
      setAge(userData.age || 0);
      setCountry(userData.Country || '');
      setGender(userData.gender || ''); 
      setEmail(userData.email || ''); // Assuming 'email' field
      setPhone(userData.phone || ''); // Assuming 'phone' field
      return userData;
    } else {
      // Handle case where user data doesn't exist
      return null;
    }
  };
  const updateUserProfile = async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const updateData = {
      displayName: displayName || '', // Update or create 'displayName' field
      age: age,
      gender:gender,
      Country: Country,
      phone: phone,
    };
    await updateDoc(userRef, updateData);
  };

const handleSaveProfile = async () => {
    await updateUserProfile();
    // Handle success or error after saving
  };
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow className="MDB-toprow">
          <MDBCol className="MDB-topcolumn">
            <MDBBreadcrumb className=" rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem id="user-profile-title" className="breadcrumb-title">User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow className='MDB-Content'>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                {/* <MDBCardImage
                    {...getRootProps()} // Spread root props for dropzone area
                    src={profilePictureUrl} // Display uploaded or default image
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px', cursor: 'pointer'}} // Allow clicking
                  /> */}
                  {/* <input {...getInputProps()} /> Hidden input for file selection */}
                <p className="text-muted mb-1">{displayName}</p>
                <p className="text-muted mb-4">{email}</p>
                <p className="text-muted mb-4">{phone}</p>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4">
            <MDBCardBody>
              <Bar data={barChartData} options={barChartOptions} />
            </MDBCardBody>
          </MDBCard>

            <MDBCard className="mb-4 mb-md-0">
              <MDBCardBody>
                <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Gender</span>{gender}</MDBCardText>
                <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Adhd Severity</MDBCardText>
                <MDBProgress className="rounded">
                  {console.log("Calculated Percentiles:", percentiles)};
                  <MDBProgressBar width={percentiles?.AdhdQuiz?.gender || 0} valuemin={0} valuemax={100} bg={(percentiles?.AdhdQuiz?.gender > 75) ? "danger" : "success"} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Anxiety Severity</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={percentiles?.AnxietyQuiz?.gender || 0} valuemin={0} valuemax={100} bg={(percentiles?.AnxietyQuiz?.gender > 75) ? "danger" : "success"}/>
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>OCD Severity</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={percentiles?.OcdQuiz?.gender || 0} valuemin={0} valuemax={100} bg={(percentiles?.OcdQuiz?.gender > 75) ? "danger" : "success"} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Depression Severity</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={percentiles?.DepressionQuiz?.gender || 0} valuemin={0} valuemax={100} />
                </MDBProgress>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Name</MDBCardText>
                    
                  </MDBCol>
                  <MDBCol sm="9" style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="form-control"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Age</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                   <input
                      type="number"
                      className="form-control"
                      value={formattedAge} // Display formatted version
                      onChange={(e) => setAge(parseInt(e.target.value))} // Parse to number
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <input
                      type="text"
                      className="form-control"
                      value={gender}
                      placeholder="Enter F for female and M for Male"
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <input
                      type="text"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Country</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <input
                      type="text"
                      className="form-control"
                      value={Country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>
            <MDBBtn onClick={handleSaveProfile}>Save Profile</MDBBtn>
             <MDBRow>
              <MDBCol md="6">
            <MDBCard className="mb-4 mb-md-0">
              <MDBCardBody>
                <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Age</span>{getAgeGroup(age)}</MDBCardText>
                <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Adhd Severity</MDBCardText>
                <MDBProgress className="rounded">
                  {console.log("Calculated Percentiles:", percentiles)};
                  <MDBProgressBar width={percentiles?.AdhdQuiz?.age || 0} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Anxiety Severity</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={percentiles?.AnxietyQuiz?.age || 0} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>OCD Severity</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={percentiles?.OcdQuiz?.age || 0} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Depression Severity</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={percentiles?.DepressionQuiz?.age || 0} valuemin={0} valuemax={100} />
                </MDBProgress>

              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          

          <MDBCol md="6">
            <MDBCard className="mb-4 mb-md-0">
              <MDBCardBody>
                <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Country</span>{Country}</MDBCardText>
                <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Adhd Severity</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={percentiles?.AdhdQuiz?.country || 0} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Anxiety Severity</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={percentiles?.AnxietyQuiz?.country || 0} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>OCD Severity</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={percentiles?.OcdQuiz?.country || 0} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Depression Severity</MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={percentiles?.DepressionQuiz?.country || 0} valuemin={0} valuemax={100} />
                </MDBProgress>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
            </MDBRow>
            
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}