from flask import Flask, render_template
import json
import math

app = Flask(__name__)

routes = json.load(open("static/services.json"))
dtoe = [a for a in routes['data']['allServiceYaml']['nodes'] if a['serviceId']=='dundee-to-edinburgh'][-1]

dtoe['routes'] = dtoe['routes'][-1] # The current route
#Distance from Dundee
#We calculate how far each stop is from Dundee
#All prices and times are calculate from this
#Total distance is 100km
#Total time is 100 minutes
#Cost is £1 per 10 miles
dfd = {}
distanceSoFar = 0
currentPostion = dtoe['routes']['outbound']['stopPattern'][0]
def between(a,b):
     [[x0,y0],[x1,y1]] = [x['stop']['coordinate'] for x in [a,b]]
     return math.sqrt((x0-x1)**2+((y0-y1)*math.cos(math.radians(y0)))**2)*10000/90

for s in dtoe['routes']['outbound']['stopPattern']:
    dist = between(currentPostion,s)
    distanceSoFar += dist
    dfd[s['stop']['stopId']] = distanceSoFar
    currentPostion = s

leaveEdinburgh = ['01:00','03:00','06:00','07:00','09:00','10:00','11:00','12:00',
                  '13:00','14:00','15:00','16:00','17:00','18:00','19:00','23:00']

leaveDundee =    ['01:00','03:00','06:00','07:00','09:00','10:00','11:00','12:00',
                  '13:00','14:00','15:00','16:00','17:00','18:00','19:00','23:00']

#This is hard coded for testing purposes
alreadyBooked = {
    "09:00-bicycle": 1,
    "10:00-bicycle": 2,
    "11:00-bicycle": 2,
    "11:00-wheelchair": 1,
    "07:00-seat": 34,
    "09:00-seat": 33,
    "10:00-seat": 32,
    "11:00-seat": 31,
    "12:00-seat": 30,
    "13:00-seat": 29,
    "14:00-seat": 28,

}
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/routes")
def origins():
    return {"stops":[s['stop'] 
                     for s in dtoe['routes']['outbound']['stopPattern']]}

def addTime(start,km):
    #The bus travels at 1km per minute
    [h,m] = [int(s) for s in start.split(':')]
    tm = int(60*h+m + km)
    return f"{tm // 60:02}:{tm % 60:02}"

@app.route("/api/quote/<int:origin>/<int:destination>/<whn>")
def quote(origin,destination,whn):
    distance = dfd[origin] - dfd[destination]
    startAt = "Dundee"
    leaveTimes = leaveDundee
    if distance < 0:
        startAt = "Edinburgh"
        leaveTimes = leaveEdinburgh
        distance = -distance
    return {"distance":distance,"services":[
        {
            "depart":addTime(lt,dfd[origin]),
            "arrive":addTime(lt,dfd[destination]),
            "prices":{
                "adult":math.ceil(distance/10),
                "child":math.ceil(distance/20),
                "bicycle":0,
                "wheelchair":0,
                "concession":0,
            },
            "availability":{
                "seat": 34 - alreadyBooked.get(f"{lt}-seat",0),
                "bicycle": 2 - alreadyBooked.get(f"{lt}-bicycle",0),
                "wheelchair": 1 - alreadyBooked.get(f"{lt}-wheelchair",0)
            }
        } for lt in leaveTimes
    ]}

app.run(debug=True)
