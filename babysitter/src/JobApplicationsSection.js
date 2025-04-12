import React, { useState, useEffect } from "react";
import "./JobApplicationsSection.css";

function JobApplicationsSection() {
  const [jobApplications, setJobApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch job applications from backend
    const fetchJobApplications = async () => {
      const response = await fetch("/api/babysitter/job-applications", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setJobApplications(data);
      setIsLoading(false);
    };

    fetchJobApplications();
  }, []);

  const handleApplyForJob = async (jobId) => {
    const response = await fetch(`/api/babysitter/job-applications/${jobId}/apply`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      alert("Application sent successfully!");
      setJobApplications(
        jobApplications.filter((job) => job._id !== jobId) // Remove the job from the list after applying
      );
    } else {
      alert("Failed to send application.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-applications-section">
      <h2>Job Applications</h2>
      {jobApplications.length === 0 ? (
        <p>No available jobs to apply for.</p>
      ) : (
        <div className="job-applications-list">
          {jobApplications.map((job) => (
            <div key={job._id} className="job-application-item">
              <p>
                <strong>{job.parentName}</strong> is looking for a babysitter
                for <strong>{job.date}</strong> from {job.startTime} to{" "}
                {job.endTime}.
              </p>
              <div className="job-application-actions">
                <button
                  className="apply-button"
                  onClick={() => handleApplyForJob(job._id)}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobApplicationsSection;
