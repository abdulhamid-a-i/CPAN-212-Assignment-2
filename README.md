## CPAN-212-Assignment-2

Team: Abdulhamid Weheliye (n01756626, Section A), Mbaye Fall (n01764121, Section A), Cheyenne Hunsley (N01747035, Section A), Bandanpreet Kaur Malhi (n01726650, Section A), Laura Sofia Santana Acosta (N01737339,Section B)

### Project Overview

This application is full-stack web application based on the approved Buisness Requirements Documrnt form the Neighbourhood Service Market Place.

This application allows for 
residents to:
    - Place and manage service requests
    - Create Service request categories

Providers to:
    - View service requests
    - Place quotes on service requests
    - Create Service request categories


### System Architechture
This application was built using the MEAN technology Stack

### Setup Instructions

Run start-nsm.bat

### Database Schema Explanation



### Index Justification

#### User's email Index:
set to unique to ensure duplicate emails are not accepted into database

#### Categories's name Index:
set to unique to ensure duplicate categories cannot be created.

#### Service Request's Text Index on title + description:
A compound index to allow for effecient full-text search over both title and description.

#### Quotes Indexes:

##### requestId index:
This index improves query performance by preventing a full collection scan when loading quotes

##### compound requestId + providerId:
Ensures a provider can only place one quote per request.


### Api Endpoint List:


### Role Distribution:




