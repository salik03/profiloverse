from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import pandas as pd



service = Service(ChromeDriverManager().install())
options = webdriver.ChromeOptions()
# options.add_argument('--headless') 
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
for i in range(2):
        driver.get("https://internshala.com/internships/".format(i))
        time.sleep(3)
        lst=driver.find_elements(By.ID, 'internship_list_container_1')
        for job in lst:
            # role = job.find_element(By.CLASS_NAME,'company')
            print(job.text)
