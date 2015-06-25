import csv

f = open('558ba7f86373761020010000.csv')
csv_f = csv.reader(f)
new_text = csv_f.replace(','.'\t') 

for row in new_text:
  print row[1]

