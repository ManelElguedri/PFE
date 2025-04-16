import React, { useState, useEffect } from "react";
import api from "./api";
import "./JobApplicationsSection.css";

const JobApplicationsSection = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/babysitter/job-applications");
        setJobs(res.data);
      } catch {
        setError("Jobs yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const apply = async (id) => {
    try {
      await api.post(`/babysitter/job-applications/${id}/apply`);
      setJobs((j) => j.filter((x) => x._id !== id));
    } catch {
      setError("Başvuru gönderilemedi.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="job-applications-section">
      <h2>Job Applications</h2>
      {jobs.length === 0 ? (
        <p>No available jobs.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="job-application-item">
            <p>
              {job.parentName} on {job.date}
            </p>
            <button onClick={() => apply(job._id)}>Apply</button>
          </div>
        ))
      )}
    </div>
  );
};
export default JobApplicationsSection;
