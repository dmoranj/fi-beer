import hiver
import datetime

client = hiver.connect("130.206.80.46", 10000)
fibeerTable = "fibeerdata"

def listTables():
  client.execute('SHOW TABLES')
  rows = client.fetchAll()
  return rows

def printTables(rows):
  print "The tables: " + str(rows) 

def existTable(tableName):
  tables = listTables()  
  return len(filter(lambda x: x == tableName, tables)) > 0

def initTables():
  if not existTable("fibeerdata"):
    print "Creating table 'fibeerdata'"
    client.execute("CREATE TABLE IF NOT EXISTS fibeerdata (creationDate STRING, id INT, contextName STRING, contextType STRING, measure STRING, measureType STRING, value DOUBLE) ROW FORMAT DELIMITED FIELDS TERMINATED BY '|' LINES TERMINATED BY '\n' STORED AS TEXTFILE LOCATION 'hdfs:///user/dmoran'")
  else:
    print "Tables created. Using existing tables"

def cosmosToObj(list):
  listResult = []
  for record in list:
    listResult.append(record.rsplit("\t"))
  return listResult

def showLast(dMin):
  start = datetime.datetime.now()
  end = start - datetime.timedelta(minutes=dMin)
  startStr = start.strftime("%Y-%m-%dT%H:%M:%S.000000")
  endStr = end.strftime("%Y-%m-%dT%H:%M:%S.000000")

  print "Retrieving from [" + startStr + "] to [" + endStr + "]"
  client.execute("SELECT a.creationDate, a.contextName, a.measure, a.value FROM " + fibeerTable + " a WHERE a.creationDate > '" + endStr + "'")
  rows = client.fetchAll()
  return cosmosToObj(rows)

def loadContents(path, table):
  print "Loading contents from [" + path + "] into table [" + table + "]"
  client.execute("LOAD DATA LOCAL INPATH '" + path + "' OVERWRITE INTO TABLE " + table)
  

