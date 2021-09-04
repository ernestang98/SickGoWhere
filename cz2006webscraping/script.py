from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import os
import csv
import pandas as pd

dir_path = os.path.dirname(os.path.realpath(__file__))
csv_file = "archive/Clinics & PolyclinicsUncleanGeo.csv"
csv_path = dir_path + "/archive/" + csv_file
df = pd.read_csv(csv_path)
column = "postalCode"
saved_column = df[column]
test = df[column].head()

driverGeocode = webdriver.Chrome(dir_path + '/chromedriver')
driverGeocode.get('https://geocode.xyz/')

nameCSV = "Clinics & Polyclinics"

file_csv = open(nameCSV + ".csv", mode='w')

writer = csv.writer(file_csv, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
writer.writerow(["geocodingData"])

# Last Count was 1330
counter = 1331

for i in saved_column:
    inputElement = driverGeocode.find_elements_by_class_name("input-lg")
    inputElement[0].clear()
    inputElement[0].send_keys(i)
    inputElement[0].send_keys(Keys.ENTER)
    notActiveButtons = driverGeocode.find_elements_by_class_name("notActive")
    try:
        notActiveButtons[1].click()
        objectData = driverGeocode.find_element_by_tag_name("pre").get_attribute("innerHTML")
        driverGeocode.back()
        driverGeocode.back()
        writer.writerow([objectData])
        print(counter)
    except:
        driverGeocode.back()
        print(counter, "passed")
        writer.writerow(["NA"])
        pass
    counter += 1
