import requests
import json

base_url = "https://resumatch-backend-22e5.onrender.com/api/v1"

# 1. Upload mock resume
print("Uploading resume...")
mock_resume = {
    "personalInfo": {"name": "Test User", "email": "test@example.com", "phone": "1234567890"},
    "summary": "Experienced software engineer.",
    "skills": ["Python", "React"],
    "experience": [{"role": "Developer", "company": "Tech", "duration": "1 year", "bullets": ["Did stuff"]}],
    "education": [{"degree": "BSc", "school": "Uni", "year": "2020"}],
    "projects": [],
    "certifications": []
}
files = {'file': ('resume.json', json.dumps(mock_resume), 'application/json')}
try:
    r1 = requests.post(f"{base_url}/resume/upload", files=files)
    print(r1.status_code, r1.text)
    if r1.status_code == 200:
        resume_id = r1.json().get('resume_id')
    else:
        resume_id = None
except Exception as e:
    print("Error uploading resume:", e)
    resume_id = None

# 2. Upload JD
print("Uploading JD...")
jd_text = "Looking for a Python and React developer with 1 year experience."
try:
    r2 = requests.post(f"{base_url}/jd/analyze", data={'raw_text': jd_text})
    print(r2.status_code, r2.text)
    if r2.status_code == 200:
        jd_id = r2.json().get('jd_id')
    else:
        jd_id = None
except Exception as e:
    print("Error uploading JD:", e)
    jd_id = None

# 3. Optimize
if resume_id and jd_id:
    print(f"Optimizing with resume_id={resume_id} and jd_id={jd_id}...")
    try:
        r3 = requests.post(f"{base_url}/optimize", data={'resume_id': resume_id, 'jd_id': jd_id})
        print(r3.status_code, r3.text)
    except Exception as e:
        print("Error optimizing:", e)
