import csv

students = {}

with open('Nelisa Sales History.csv', 'rb') as scoressource:
    reader = csv.reader(scoressource)
    for name, score in reader:
        if score < students.get(name, 'Z'):
            students[name] = score

with open('Nelisa Sales History.csv', 'wb') as scoresdest:
    writer = csv.writer(scoresdest)
    for name, score in students.iteritems():
        writer.writerow([name, score])

print students
