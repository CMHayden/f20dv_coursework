# F20DV Coursework

## Members:
 
* Ridwan Mukhtar - RM109

* Mark Schmieg - MS147

* Callum M Hayden - CMH1

## Project Overview

This is a group student project to produce an interactive internet application for analysis & visualisation of REF 2014 & associated data. REF is the research excellence framework. It is the system used for assessing the quality of research in UK higher education institutes.

### Assessment 

**Group Assessment** *55%)*:

* **D1**: Zip of the working project.

* **D2**: A completed 'Requirements Assessment' spreadsheet.

* **D3**: A 'Requirements Evidence Document'.

**Individual Assessment** *15%*:

* **D4**: An individual reflective document written by each student.

**Exam** *30%*:

* One hour exam in which the student will asked to answer questions by referring and referencing printouts of D1. 

### Development Stategy

* Group members should discuss and develop their development strategy, roles, and elect a member of the group to be the project contact point.

* This should be documented in the project’s DevelopmentStrategy.md file which must be included in the project’s remote repository.


* It is recommended that the MVP pattern be used.

## CI/CD

Currently this repository is hosted on [f20dv.site](https://www.f20dv.site "Page where public folder is shown to the world"), and is updated with every change to the repository. Meaning that everytime there is anything pushed to this repository, the website will update. This is helpful to ensure we can test on different platforms, and check eachothers work even from our phones, tablets, or other computers without having to clone the repository.

This is done by mirroring the gitlab repository to github (cmhayden/f20dv_coursework). Whenever a commit is made in this repository, it gets copied to the repository on github. Once this happens, and github recieves the updated repository, it then tells a second github account that it has the up to date version. This repository is CMHayden/f20dv_live. When this recieves an update, it triggers a buddy pipeline. The buddy pipeline can be used to create unit tests, a feature we may look to implement, but currently only sends a get request to laravel forge which in turn pulls the new code from the repository and deploys it as a static page on our live URL.

## Requirements

A client side internet application written in D3.js is required. No php or serverside code should be used. The layout and user interaction should be intuitive to the user. In particular, transitions should be used to let the viewer know what data are new, changing, or exiting. The application must run in the version of Chrome installed on MS Windows in the GRID. The student should show evidence of having detailed and critical knowledge of design patterns presented in the course and applied in the project. You must use the d3.js version 4 library.

The user is expected to be a Director of Research (DoR) of a Unit of Assessment (UoA) within a university. Examples of different UoA include “General Engineering”, “History”, “Law”, “Business and Management Studies” etc. *See lab4-ex2*. The task of DoR is to examine other REF 5 submissions to see if he/she can gain any insights as to the best way to write their next REF 5 submission in order to maximise their REF Environment Assessment.

The source code must be modular i.e. divided into appropriate files to allow for easy development and reuse, a module will normally be represented by a single source file and use information hiding techniques.

You may use other publicly available data, but you must clearly identify the source and quote the usage rights Examples could include other tables from the REF 2014 site and data from Gateway To Research.

### Requirements Assessment Spreadsheet:

| Number | Requirement                                      | Marks | Achieved? |
|:------:|:-------------------------------------------------|:-----:|:---------:|
| G1     | Evidense of use of GitLab by group showing incremental development through regular commits and commit messages | REQ |   X   |
| G2     | Use of D3 hierarchical display to illustrate agglomerative clustering of topicto-topic similarity | REQ |   X   |
| R1     | Use of three different D3 layouts in a single dashboard | 6 |   X   |
| R2     | Use of automatic scaling of all axes in a single layout during data update. | 2 |   X   |
| R3     | Use of datum highlighting in which hovering over a datum provides additional information via a tooltip | 2 |   X   |
| R4     | Use of D3 transitions to highlight new (entering) data | 2 |   X   |
| R5     | Use of D3 transitions to highlight updating data  | 2 |   X   |
| R6     | Use of D3 transitions to highlight exiting data | 3 |   X   |
| R7     | Use of cross-layout brushing in which moussing over a data point in one chart highlights associated data in another chart | 2 |   X   |
| R8     | Use of cross-layout brushing in which moussing over one data point in one chart highlights multiple associated data points in another chart. Note: you must use a different combination of layouts than the ones provided in lab examples. | 3 |   X   |
| R9     | Significant use of data (> 100 data items) not provided by the course | 2 |   X   |
| R10    | Use of a scatter plot, a stacked barchart or, a linechart | 4 |   X   |
| R11    | Use of bidirectional interaction between three charts | 3 |    X   |
| R12    | Use of automatic scaling of all axes of a further two layouts during data update. | 2 |   X   |
| R13    | Use D3 hierarchical layout e.g. cluster, pack, partition, treemap, sunburst, or bundle, but a not tree layout | 2 |   X   |
| R14    | Use of selective reveal in a hierarchical layout display (e.g. revealing/concealing lower nodes in a dendrogram) | 2 |   X   |
| R15    | Faceted selection interaction between two layouts (in which mouseover or click in one layout results in data being filtered in a second  layout). Note: you must use a different combination of layouts than the ones provided in lab examples. | 2 |   X   |
| R16    | Use of a map layout that has interaction with another layout | 2 |    X   |
| R17    | Use of scalar data on a map (e.g. circles of different sizes to indicate the percentage of 4* outputs) | 3 |   X   |
| R18    | Use of cross-layout brushing in which dragging a rectangle over several data points in one chart highlights multiple associated data points in another chart | 2 |   X   |
| R19    | Use of the correlation between university/UOA star ratings and other data | 2 |   X   |
| R20    | Use of a custom (student written) shape generator | 3 |   X   |
| R21    | Use of a custom (student written) layout generator) | 2 |    X   |
| R22    | Use of a clustering analysis, other than than provided in the assignment dataset | 2 |    X   |

### Requirements Evidence Document

This document will be provided in addition to the Requirements Assessment Document. It will provide evidence that each of the requirements marked as ‘achieved’, has indeed, been achieved. It will comprise one section for each of requirements G1,G2 and R1 to R22 inclusive. The evidence for G1 will comprise the project’s commit history (including commit messages). The evidence for G2, R1 to R22 will comprise screen shots of your application (or GitLab) marked up with highlighting, arrows and narrative sufficient to make it clear that the corresponding requirement has been met. If insufficient evidence is provided in this document, the corresponding requirement will be changed to notachieved. If insufficient evidence is provided during a requested project demo, the corresponding requirement will be changed to not-achieved. A proforma will be supplied for this document together instructions for capturing the Git history. Both must be used to generate and present the evidence required here.

Evidence goes here:

###  Individual Reflective Document

The document cannot exceed one and a half sides of A4 written in 11pt Arial type font with no less than 1.08 line spacing. Section headings should be numbered and be in 14pt Arial type font.

This document should reflect on the use of design patterns presented in the course.

* Each design pattern discussed must be presented in a separate section of the document.

* The section heading should be the name of the pattern being discussed.

Each section should summarise the pattern’s perceived advantages and disadvantages both as it was used in the project, and as it might be used to improve the project


# TODOS:

## Sun burst chart

Sunbusrt chart which shows countries, cities and universities. Click on element, display pie chart of all ratings for that element. IE: user clicks scotland pie chart shows 0-5 stars of all ratings for all unis in scotland.