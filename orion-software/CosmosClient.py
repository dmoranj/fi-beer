import requests
import json

defaultPath = "/user/dmoran"
defaultUser = "dmoran"

def listStatusHandler(files):
  for file in files:
    # print "File: " + file["pathSuffix"]
    print "File: " + json.dumps(file, indent=4)

def contextCallError(error):
  print "There was an error invoking a HDFS operation: " + error

def listStatus(handler, errorHandler):
  r = requests.get("http://130.206.80.46:14000/webhdfs/v1" + defaultPath + "?op=liststatus&user.name=" + defaultUser)

  if r.status_code == 200:
    handler(json.loads(r.text)["FileStatuses"]["FileStatus"])
  else:
    errorHandler("Error with [" + str(r.status_code) + "]: " + r.text)

def readFileHandle(result):
  print "Result: " + result

def readFile(file, handler, errorHandler):
  # CubaDani-Cuba-temperature0-centrigrade.txt
  r = requests.get("http://130.206.80.46:14000/webhdfs/v1" + defaultPath + "/" + file + "?op=open&user.name=" + defaultUser)

  if r.status_code == 200:
    handler(r.text)
  else:
    errorHandler("Error with [" + str(r.status_code) + "]: " + r.text)

