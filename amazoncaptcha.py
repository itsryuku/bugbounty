### example script that uses AmazonCaptcha to solve _amazon captcha_...
###
from selenium import webdriver
from amazoncaptcha import AmazonCaptcha
from selenium.webdriver.common.by import By

driver = webdriver.Chrome(executable_path="/usr/bin/chromedriver")
driver.get("https://www.amazon.com/errors/validateCaptcha")

link = driver.find_element(By.XPATH, "//*[@class='a-row a-text-center']//img").get_attribute("src")
captcha = AmazonCaptcha.fromlink(link)

captcha_value = AmazonCaptcha.solve(captcha)

input_field = driver.find_element(By.ID, "captchacharacters").send_keys(captcha_value)

button = driver.find_element(By.CLASS_NAME, "a-button-text").click()
