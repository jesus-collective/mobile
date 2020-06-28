import json

with open('./kidsandyouth.json') as file:
    data = json.load(file)

out = {}

titles = []
links = []

for i in data['rss']['channel']['item']:
    if ("preschool"  in i['link'] and "series" in i['link']):

        for item in i['postmeta']:
            test = item['meta_value']['__cdata']
            if "img" in test:
                titles.append(i['title'])
                links.append(test.split('src="')[1].split('" alt')[0])

for i in range(0,len(titles)):
    out[titles[i]] = links[i]

print(out)
