Fi-Beer
=======

# Overview
FI-Beer is a [FI-Ware](http://edu.fi-ware.eu/course/index.php) software prototype to manage the beer fermentation of a homebrewing process with a group of sensors controlled with a Debian Linux PC and an [Arduino One board](http://arduino.cc/en/Main/arduinoBoardUno). Below you can find a diagram of all the system components and a brief explanation of their functions. The following sections will detail how the components were connected and all the software and hardware installed, bottom-up.

# Detailed description

## Fermentation instrumentation and hardware connection

In the first iteration of the prototype, the system will only manage one magnitude of the fermentation process: the temperature. Five [LM35 temperature sensors](http://www.ti.com/lit/ds/symlink/lm35.pdf) were connected to the fermentation cube to track its evolution. In order to enable the system to lower or raise the temperature, a device composed of peltier cells and fans was built around the cube (this part of the system is still under development).

All the sensors data pins were connected to the analogical data inputs of an Arduino One board, that was plugged to the Linux PC via USB. 

## Linux and NGSI Client

All the sensor reading is done in a Python script that reads the sensor data from the Arduino and sends it to the Context Broker using the [NGSI Protocol](http://forge.fi-ware.eu/plugins/mediawiki/wiki/fiware/index.php/OMA_NGSI_10). The Python-to-Arduino connection is created using [Nanpy](https://github.com/nanpy). 

## The Context Broker

The [Orion Context Broker](https://forge.fi-ware.eu/plugins/mediawiki/wiki/fiware/index.php/Publish/Subscribe_Broker_-_Orion_Context_Broker_-_User_and_Programmers_Guide#Query_Context_operation) was used as the central data node of the system. All the data of the sensors is sent to Orion who, in turn, send it to all its suscribers and can be queried from the frontend systems to get up-to-date information of any of the measures.

For the prototype, we used a dedicated cloud instance in [FI-Lab](http://lab.fi-ware.eu/), that has a preinstalled Context Broker service. 

## Wirecloud Management Widget
The Front End of the system was designed as a series of widgets deployed in FI-Ware's Mashup Platform: [Wirecloud](http://conwet.fi.upm.es/wirecloud/). The widgets were deployed in the FI-Lab's marketplace and composed in a new workspace.

Two widgets were designed:
* Temperature control widget: that consumes data from the Context Broker, showing a graph of the cube with realtime information on the temperature, signaling what parts are too cool or too warm.
* Historical data widget: depicting the evolution of the temperature over the last minutes.

## Connection to Cosmos (HDFS and Hive)

In order to consume the historical data from the widgets, it has to be first stored somewhere. FI-Ware sensor data is stored in the HDFS system of its Big Data GE: [Cosmos](http://catalogue.fi-ware.eu/enablers/bigdata-analysis-cosmos). The data is stored in Cosmos through the use of a script in the Context Broker machine, that is subscribed to the measure update.
