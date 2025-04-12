import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";
import BabysitterDetail from "./BabysitterDetail";
import Signup from "./Signup";
import BabysittingAnnouncement from "./BabysittingAnnouncement";
import Home from "./Home";
import SignIn from "./SignIn";
import ParentPage from "./ParentPage";
import MessageSection from "./MessageSection";
import NotificationSection from "./NotificationSection";
import ProfileParent from "./ProfileParent";
import AnnoucementSection from "./AnnoucementSection";
import WelcomeSection from "./WelcomeSection";
import BabysitterProfile from "./BabysitterProfile";
import CandidatureResponses from "./CandidatureResponses";
import BabysitterPage from "./BabysitterPage";
import AdminDashboard from "./AdminDashboard"; 
import 'leaflet/dist/leaflet.css';
import AdminHome from "./AdminHome";
import AdminProfile from "./AdminProfile";
import ParentList from "./ParentList";
import BabysitterList from "./BabysitterList";
import AnnouncementList from "./AnnouncementList";
import ApplicationList from "./ApplicationList";
import RequestList from "./RequestList";
import DocumentList from "./DocumentList";
import AvailabilitySection from "./AvailabilitySection";
import BabysitterProfileSection from "./BabysitterProfileSection";
import BookingRequestsSection from "./BookingRequestsSection";
import JobApplicationsSection from "./JobApplicationsSection";
function App() {
  return (
    <div id="App">
      <Header />

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/babysitting-announcement" element={<BabysittingAnnouncement />} />
        <Route path="/babysitter/:name" element={<BabysitterDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/parent-page" element={<ParentPage />} />
        <Route path="/messages" element={<MessageSection />} />
        <Route path="/notifications" element={<NotificationSection />} />
        <Route path="/profile-parent" element={<ProfileParent />} />
        <Route path="/announcements" element={<AnnoucementSection />} />
        <Route path="/welcome" element={<WelcomeSection />} />
        <Route path="/babysitter-profile" element={<BabysitterProfile />} />
        <Route path="/candidature-responses" element={<CandidatureResponses />} />
        <Route path="/babysitter-page" element={<BabysitterPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-home" element={<AdminHome/>} />
        <Route path="/admin-profile" element={<AdminProfile/>} />
        <Route path="/parent-list" element={<ParentList/>} />
        <Route path="/babysitter-list" element={<BabysitterList/>} />
        <Route Path="/announcement-list" element={<AnnouncementList/>}/>
        <Route Path="/application-list" element={<ApplicationList/>}/>
        <Route Path="/request-list" element={<RequestList/>}/>
        <Route Path="/document-list" element={<DocumentList/>}/>
        <Route Path="/availability" element={<AvailabilitySection/>}/>
        <Route Path="/babysitter-profile" element={<BabysitterProfileSection/>}/>
        <Route Path="/booking-requests" element={<BookingRequestsSection/>}/>
        <Route Path="/job-applications" element={<JobApplicationsSection/>}/>

      </Routes>

      <Footer />
    </div>
  );
}

export default App;


