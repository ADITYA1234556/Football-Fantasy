from time import sleep
from bs4 import BeautifulSoup
import pandas as pd
import requests

all_teams = []

html = requests.get("https://fbref.com/en/comps/9/Premier-League-Stats").text
soup = BeautifulSoup(html, 'lxml')
sleep(10)
table = soup.find_all('table', class_= 'stats_table')[0]

links = table.find_all('a')
# url_link = []
# for l in links:
#     url_link.append(l.get('href'))
url_link = [l.get('href') for l in links]
print(url_link)


teams_url_link = []
# /en/squads/18bb7c10/Arsenal-Stats
for l in url_link:
    if '/squads/' in l:
        teams_url_link.append(f"https://fbref.com{l}")
print(teams_url_link)

for l in teams_url_link:
    data = requests.get(l).text
    soup = BeautifulSoup(data, 'lxml')
    stats = soup.find_all('table', class_= 'stats_table')[0]
    if stats and stats.columns: stats.columns = stats.coumns.droplevel()

    team_name = l.split('/')[-1].replace("-Stats", "")
    print(team_name)


    team_data = pd.read_html(str(stats))[0]
    team_data["Team"] = team_name
    all_teams.append(team_data)
    sleep(5)

state_df = pd.concat(all_teams)
state_df.to_csv("players.csv")

