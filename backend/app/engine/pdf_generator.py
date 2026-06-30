import re
from typing import Dict, Any

def clean_html_tags(text: str) -> str:
    if not text:
        return ""
    return re.sub(r'</?[a-zA-Z]+(?:\s+[^>]*)?>', '', text)

def generate_styled_resume_html(data: Dict[str, Any], include_highlights: bool = False) -> str:
    """
    Renders the optimized or original resume data structure into a clean,
    single-page print-ready HTML template.
    """
    skills_list = []
    for s in data.get("skills", []):
        if not include_highlights:
            s = clean_html_tags(s)
        skills_list.append(s)
        
    skills_html = " • ".join(skills_list)

    exp_html_runs = []
    for exp in data.get("experience", []):
        bullets_html = ""
        for b in exp.get("bullets", []):
            if not include_highlights:
                b = clean_html_tags(b)
            bullets_html += f"<li>{b}</li>"
            
        role = exp.get("role", "")
        if not include_highlights:
            role = clean_html_tags(role)
            
        exp_html_runs.append(f"""
        <div class="experience-item">
            <div class="item-header">
                <span class="bold-text">{role}</span>
                <span>{exp.get("duration", "")}</span>
            </div>
            <div class="item-sub">
                <span>{exp.get("company", "")}</span>
            </div>
            <ul>{bullets_html}</ul>
        </div>
        """)
    
    exp_html = "\n".join(exp_html_runs)

    proj_html_runs = []
    for proj in data.get("projects", []):
        bullets_html = ""
        for b in proj.get("bullets", []):
            if not include_highlights:
                b = clean_html_tags(b)
            bullets_html += f"<li>{b}</li>"
            
        proj_html_runs.append(f"""
        <div class="project-item">
            <div class="item-header">
                <span class="bold-text">{proj.get("name", "")}</span>
            </div>
            <div class="item-sub">
                <span>{proj.get("description", "")}</span>
            </div>
            <ul>{bullets_html}</ul>
        </div>
        """)
        
    proj_html = "\n".join(proj_html_runs)

    edu_html_runs = []
    for edu in data.get("education", []):
        edu_html_runs.append(f"""
        <div class="experience-item">
            <div class="item-header">
                <span class="bold-text">{edu.get("degree", "")}</span>
                <span>{edu.get("year", "")}</span>
            </div>
            <div class="item-sub">
                <span>{edu.get("school", "")}</span>
            </div>
        </div>
        """)
        
    edu_html = "\n".join(edu_html_runs)

    cert_html_runs = []
    for cert in data.get("certifications", []):
        if not include_highlights:
            cert = clean_html_tags(cert)
        cert_html_runs.append(f"<li>{cert}</li>")
    cert_html = "\n".join(cert_html_runs)
    
    personal = data.get("personalInfo", {})
    name = personal.get("name", "Applicant Name")
    email = personal.get("email", "")
    phone = personal.get("phone", "")
    linkedin = personal.get("linkedin", "")
    github = personal.get("github", "")
    
    contacts = [email, phone]
    if linkedin: contacts.append(linkedin)
    if github: contacts.append(github)
    contacts_str = " | ".join(contacts)

    summary = data.get("summary", "")
    if not include_highlights:
        summary = clean_html_tags(summary)

    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>{name} - Optimized Resume</title>
        <style>
            body {{
                font-family: 'Arial', sans-serif;
                line-height: 1.5;
                color: #2D3748;
                margin: 0;
                padding: 40px;
                background-color: #FFFFFF;
                font-size: 11pt;
            }}
            h2 {{
                font-size: 18pt;
                font-weight: bold;
                text-align: center;
                color: #1A202C;
                margin-top: 0;
                margin-bottom: 4px;
            }}
            .personal-info {{
                text-align: center;
                font-size: 9pt;
                color: #718096;
                margin-bottom: 20px;
                border-bottom: 1px solid #E2E8F0;
                padding-bottom: 8px;
            }}
            h3 {{
                font-size: 11pt;
                font-weight: bold;
                text-transform: uppercase;
                border-bottom: 1px solid #A0AEC0;
                padding-bottom: 3px;
                margin-top: 18px;
                margin-bottom: 8px;
                color: #1A202C;
            }}
            .section-summary p {{
                color: #4A5568;
                text-align: justify;
                margin: 0;
            }}
            .skills-list {{
                color: #4A5568;
            }}
            .experience-item, .project-item {{
                margin-bottom: 12px;
            }}
            .item-header {{
                display: flex;
                justify-content: space-between;
                font-weight: bold;
                color: #1A202C;
                font-size: 11pt;
            }}
            .item-sub {{
                display: flex;
                justify-content: space-between;
                color: #718096;
                font-style: italic;
                font-size: 9pt;
                margin-bottom: 4px;
            }}
            .bold-text {{
                font-weight: bold;
            }}
            ul {{
                margin-top: 2px;
                margin-bottom: 0;
                padding-left: 20px;
                color: #4A5568;
            }}
            li {{
                margin-bottom: 3px;
            }}
            mark.add {{
                background-color: rgba(16, 185, 129, 0.2);
                color: #047857;
                border-radius: 2px;
            }}
            mark.mod {{
                background-color: rgba(245, 158, 11, 0.2);
                color: #B45309;
                border-radius: 2px;
            }}
            @media print {{
                body {{
                    padding: 0;
                }}
            }}
        </style>
    </head>
    <body>
        <h2>{name}</h2>
        <div class="personal-info">
            {contacts_str}
        </div>
        
        <h3>Professional Summary</h3>
        <div class="section-summary">
            <p>{summary}</p>
        </div>
        
        <h3>Technical Skills</h3>
        <div class="skills-list">
            {skills_html}
        </div>
        
        <h3>Work Experience</h3>
        {exp_html}
        
        {f"<h3>Technical Projects</h3>{proj_html}" if proj_html.strip() else ""}
        
        <h3>Education</h3>
        {edu_html}
        
        {f"<h3>Certifications</h3><ul>{cert_html}</ul>" if cert_html.strip() else ""}
        
        <script>
            window.onload = function() {{
                window.print();
            }};
        </script>
    </body>
    </html>
    """
