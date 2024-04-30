from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import pandas as pd



service = Service(ChromeDriverManager().install())
options = webdriver.ChromeOptions()
driver = webdriver.Chrome(service=service, options=options)
jobs = {
    "Role": [],
    "Company": [],
    "Location": [],
    "Start Date": [],
    "Duration": [],
    "Stipend": [],
    "Posted": []
}
for i in range(5):
        driver.get("https://internshala.com/internships/".format(i))
        time.sleep(3)
        lst=driver.find_elements(By.ID, 'internship_list_container_1')
        for job in lst:
            print(job.text)
#             try:
#                 driver.implicitly_wait(3)
#                 role=job.find_element(By.CSS_SELECTOR,"a.title").text
#                 company=job.find_element(By.CSS_SELECTOR, "a.comp-name.mw-25").text
#                 location=job.find_element(By.CSS_SELECTOR, "span.locWdth").text
#                 exp=job.find_element(By.CSS_SELECTOR, "span.expwdth").text
#                 skills=job.find_element(By.CSS_SELECTOR, "div.row5").text
#                 jobs["roles"].append(role)
#                 jobs["companies"].append(company)
# #                 jobs["locations"].append(location)
#                 jobs["experience"].append(exp)
# #                 jobs["skills"].append(skills)

#                 month,day=[],[]
#                 month.append(skills.lower())
#                 day.append(location.lower())

#                 for i in month:
#                     x=(i.split('\n'))
#                     jobs["skills"].append(x)
                    
#                 for j in day:
#                     y=(j.split(','))
#                     jobs["locations"].append(y)

#             except NoSuchElementException:
#                 print("Scraping Done")
#                 break
#             except NameError:
#                 pass
# print("Scraping Done")
# print(jobs)
# #CSV implementation
# # DS_jobs_df=pd.DataFrame(jobs)
# # DS_jobs_df.to_csv("final.csv")