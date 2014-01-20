import requests
import json

def createContext(type, id, attributes):
  body =  {
        "contextElements" : {
                "contextElement": {
                        "type": type,
                        "isPattern": "false",
                        "id": id,
			"attributes": attributes
                }
        },
	"updateAction": "APPEND"
  }
  headers = {
        "Accept": "application/json",
        "Content-type": "application/json"
  }
  r = requests.post("http://130.206.82.80:1026/NGSI10/updateContext", data=json.dumps(body), headers=headers)
  print "The response code is " + str(r.status_code)

  if r.status_code == 200:
    print "Message sent succesfully"

  elif r.status_code == 405:
    print "There was an error"

  else:
    print "Unknown result"


def getContext(type, id):
  body =  { 
	"entities" : [ 
		{
  			"type": type,
			"isPattern": "false",
			"id": id
		}
	] 
  }
  headers = {
	"Accept": "application/json",
	"Content-type": "application/json"
  }
  r = requests.post("http://130.206.82.80:1026/NGSI10/queryContext", data=json.dumps(body), headers=headers)
  print "The response code is " + str(r.status_code)

  if r.status_code == 200:
    print "The body is: " + r.text

  elif r.status_code == 405:
    print "There was an error"

  else:
    print "Unknown result"


def createMeasureArray(measureType, measureName, arrayValues):
  values = []
  for i in range(len(arrayValues)):
    valueJson = {
	"name": measureName + str(i),
	"type": measureType,
	"value": arrayValues[i]
    }
    values.append(valueJson)

  return values

