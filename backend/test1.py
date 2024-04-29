import google.generativeai as genai
import os
import docx2txt
import PyPDF2 as pdf
import magic

# Set up environment variables
credential_path = "D:\\Summer Projects\\Translate\\social media analysis-2a59d94ba22d.json"
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path

# Configure generative AI API
genai.configure(api_key=os.getenv("AIzaSyAx9ssmVrhw0uLCh_Qt2Wp3qo7ZDrkAfHc"))

# Generation configuration
generation_config = {
    "temperature": 0.4,
    "top_p": 1,
    "top_k": 32,
    "max_output_tokens": 4096,
}

# Safety settings
safety_settings = [
    {"category": f"HARM_CATEGORY_{category}", "threshold": "BLOCK_MEDIUM_AND_ABOVE"}
    for category in ["HARASSMENT", "HATE_SPEECH", "SEXUALLY_EXPLICIT", "DANGEROUS_CONTENT"]
]

# Function to generate response from Gemini
def generate_response_from_gemini(input_text):
    llm = genai.GenerativeModel(
        model_name="gemini-pro",
        generation_config=generation_config,
        safety_settings=safety_settings,
    )
    output = llm.generate_content(input_text)
    return output.text

# Function to extract text from PDF file
def extract_text_from_pdf_file(uploaded_file):
    pdf_reader = pdf.PdfReader(uploaded_file)
    text_content = ""
    for page in pdf_reader.pages:
        text_content += str(page.extract_text())
    return text_content

# Function to extract text from DOCX file
def extract_text_from_docx_file(uploaded_file):
    return docx2txt.process(uploaded_file)

# Function to check file type for extraction
def check_file_type(uploaded_file):
    mime = magic.Magic(mime=True)
    file_type = mime.from_file(uploaded_file)
    return file_type

# Prompt Template
input_prompt_template = """
As an experienced Applicant Tracking System (ATS) analyst,
with profound knowledge in technology, software engineering, data science, 
and big data engineering, your role involves evaluating resumes against job descriptions.
Recognizing the competitive job market, provide top-notch assistance for resume improvement.
Your goal is to analyze the resume against the given job description, 
assign a percentage match based on key criteria, and pinpoint missing keywords accurately.
resume:{text}
description:{job_description}
I want the response in one single string having the structure
{{"Job Description Match":"%","Missing Keywords":"","Candidate Summary":"","Experience":""}}
"""
job_description = "Backend Developer"  #Enter job description here
uploaded_file = "Resume.pdf" 

if uploaded_file is not None:
    if check_file_type(uploaded_file) == "application/pdf":
        resume_text = extract_text_from_pdf_file(uploaded_file)
    elif check_file_type(uploaded_file) == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        resume_text = extract_text_from_docx_file(uploaded_file)

    response_text = generate_response_from_gemini(input_prompt_template.format(text=resume_text, job_description=job_description))
    match_percentage_str = response_text.split('"Job Description Match":"')[1].split('"')[0]
    match_percentage = float(match_percentage_str.rstrip('%'))

    print("ATS Evaluation Result:")
    print(response_text)

    if match_percentage >= 80:
        print("Move forward with hiring")
    else:
        print("Not a Match")
