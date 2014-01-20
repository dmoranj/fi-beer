#!/usr/bin/env python
# LED with 560 Ohm resistor on Pin 10 to GND
# Tony Goodhew - 10 May 2013
from nanpy import Arduino
from nanpy import serial_manager
serial_manager.connect('/dev/ttyACM0')        # serial connection to Arduino
from time import sleep
import NGSIClient

pins = [0, 1]

for pin in pins:
  Arduino.pinMode(pin, Arduino.INPUT)

while 4 < 5:
  temperaturesList = []

  for pin in pins:
    print "Reading"
    value = Arduino.analogRead(pin)
    degreesC = (value * 0.004882814)*100
    print "The voltage in pin " + str(pin) + " is "  + str(degreesC)
    temperaturesList.append(degreesC)

  NGSIClient.createContext("Cuba", "CubaDani", NGSIClient.createMeasureArray("centrigrade", "temperature", temperaturesList))
  sleep(5)

print "Finished reading"

