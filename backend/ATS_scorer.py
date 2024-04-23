import google.generativeai as genai
import os
import docx2txt
import PyPDF2 as pdf
from dotenv import load_dotenv
import magic

load_dotenv()
genai.configure(api_key=os.getenv("auth")) #enter API key here

generation_config = {
    "temperature": 0.4,
    "top_p": 1,
    "top_k": 32,
    "max_output_tokens": 4096,
}

safety_settings = [
    {"category": f"HARM_CATEGORY_{category}", "threshold": "BLOCK_MEDIUM_AND_ABOVE"}
    for category in ["HARASSMENT", "HATE_SPEECH", "SEXUALLY_EXPLICIT", "DANGEROUS_CONTENT"]
]

#get response
def generate_response_from_gemini(input_text):
     
    llm = genai.GenerativeModel(
    model_name="gemini-pro",
    generation_config=generation_config,
    safety_settings=safety_settings,
    )
    
    output = llm.generate_content(input_text)
    
    return output.text

#get resume content (pdf)
def extract_text_from_pdf_file(uploaded_file):
   
    pdf_reader = pdf.PdfReader(uploaded_file)
    text_content = ""
    for page in pdf_reader.pages:
        text_content += str(page.extract_text())
    return text_content

#get resume content (docx)
def extract_text_from_docx_file(uploaded_file):
    
    return docx2txt.process(uploaded_file)

#check filetype for extraction
def check_file_type(uploaded_file):
    # Create a magic.Magic object
    mime = magic.Magic(mime=True)
    
    # Get the MIME type of the file
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
job_description = "Desc"  #Enter job description here
uploaded_file = "/content/AkashGoel.docx" 

if uploaded_file is not None:
    if check_file_type(uploaded_file) == "application/pdf":
        resume_text = extract_text_from_pdf_file(uploaded_file)
    elif check_file_type(uploaded_file) == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        resume_text = extract_text_from_docx_file(uploaded_file)

    #Colab doesn't support API calling, so this is line for you to test out 
    response_text = generate_response_from_gemini(input_prompt_template.format(text=resume_text, job_description=job_description))

    # Extract Job Description Match percentage from the response
    match_percentage_str = response_text.split('"Job Description Match":"')[1].split('"')[0]

    # Remove percentage symbol and convert to float
    match_percentage = float(match_percentage_str.rstrip('%'))

    print("ATS Evaluation Result:")
    print(response_text)
    #st.write(f'{{\n"Job Description Match": "{match_percentage}%",\n"Missing Keywords": "",\n"Candidate Summary": "",\n"Experience": ""\n}}')

    # Display message based on Job Description Match percentage
    if match_percentage >= 80:
        print("Move forward with hiring")
    else:
        print("Not a Match")
