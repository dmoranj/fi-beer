import requests
import json

defaultPath = "/user/dmoran"
defaultUser = "dmoran"

def updateContextHandler(result):
  print result

def contextCallError(error):
  print "There was an error invoking a HDFS operation: " + error

def listStatus(handler, errorHandler):
  print "Printing url: " + "http://130.206.80.46:14000/webhdfs/v1" + defaultPath + "?op=liststatus&user.name=" + defaultUser
  r = requests.post("http://130.206.80.46:14000/webhdfs/v1" + defaultPath + "?op=liststatus&user.name=" + defaultUser)
  
  if r.status_code == 200:
    handler("Message sent succesfully")

  else:
    errorHandler("Error with code " + r.status_code)


listStatus(updateContextHandler, contextCallError)
