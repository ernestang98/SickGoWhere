from selenium import webdriver
import random
import os
import csv
from bs4 import BeautifulSoup

dir_path = os.path.dirname(os.path.realpath(__file__))
driver = webdriver.Chrome(dir_path + '/chromedriver')

# data = driver.find_element_by_id('accordion_browse_map')


def hospital_data_scraping(file):

    hospital_dataset = driver.find_elements_by_class_name('app_ment')

    for hospital_data in hospital_dataset:
        extracted_data = hospital_data.get_attribute('innerHTML')
        extracted_stripped_data = extracted_data.strip()
        index = extracted_stripped_data.find("<br>")
        hospital_name = extracted_stripped_data[:index]
        remaining_data = extracted_stripped_data[index + 5:].strip()
        index = remaining_data.find("</span>")
        hospital_address = remaining_data[23:index]
        hospital_postal_code = hospital_address[-6:]
        hospital_waiting_time = random.randint(0, 120)

        hospital_writer = csv.writer(file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        hospital_writer.writerow([hospital_name, hospital_address, hospital_postal_code, hospital_waiting_time])


if __name__ == "__main__":

    tab_to_scrape = input("What would you like to scrape?\n"
                          "1. Bloodbanks\n"
                          "2. Clinics & Polyclinics\n"
                          "3. Dementia Go-To Clinics\n"
                          "4. Eldercare Services\n"
                          "5. Healthcare Professionals\n"
                          "6. Hospitals\n"
                          "7. Laboratories\n"
                          "8. Nursing Homes\n"
                          "9. Retail Pharmacies\n"
                          "10. Screening Centres\n"
                          "11. Healthier Eateries\n"
                          "12. Quit Centres\n")

    if tab_to_scrape not in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]:
        print("Error... Exiting...")
    else:
        tab_to_scrap = int(tab_to_scrape)

        all_tab = ["Bloodbanks", "Clinics & Polyclinics",
                   "Dementia Go-To Clinics", "Eldercare Services",
                   "Healthcare Professionals", "Hospitals",
                   "Laboratories", "Nursing Homes",
                   "Retail Pharmacies", "Screening Centres",
                   "Healthier Eateries", "Quit Centres"]

        type_to_scrape = all_tab[tab_to_scrap - 1]

        file_to_create = type_to_scrape + ".csv"

        if os.path.exists(file_to_create):
            os.remove(file_to_create)

        file_csv = open(dir_path + '/' + file_to_create, mode='w')
        driver.get('https://www.healthhub.sg/directory/hospitals')
        all_tabs = driver.find_elements_by_class_name("accordion_browse")
        all_tabs[tab_to_scrap - 1].click()

        pagination = driver.find_elements_by_class_name("page-item")
        pagination_strip = str(pagination[-2].get_attribute("innerHTML")).strip()
        soup = BeautifulSoup(pagination_strip, features="html.parser")
        tag = soup.a.string

        number_of_pages = int(tag[2:])

        # number_of_pages = driver.find_element_by_id("ctl00_ctl36_g_84636298_d168_440e_a62b_60630a3ac746_ctl00_"
        #                                             "PaginationMain_RepeaterPaging_ctl06_Pagingbtn")

        print("Starting web scraping for " + type_to_scrape + " data...")

        writer = csv.writer(file_csv, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(["Name", "Address", "postalCode", "waitingTime", "geocodingData"])

        for i in range(0, number_of_pages):
            nextButton = driver.find_element_by_id("ctl00_ctl36_g_84636298_d168_440e_a62b_60630a3ac74"
                                                   "6_ctl00_PaginationMain_lnkNext")
            hospital_data_scraping(file_csv)
            nextButton.click()

        print("Ending web scraping for " + type_to_scrape + " data...")

        file_csv.close()
